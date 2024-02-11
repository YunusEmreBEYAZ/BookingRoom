"use client";
import Card from "../components/Card";
import Calendar from "react-calendar";
import { useState,useEffect } from "react";
import "../../app/styles.css"
import  fetchAvailability  from "../api/api";
import {sendMail} from "../lib/mail";







interface AvailableHours {
  start_time: string;
  end_time: string;
}

interface DataAvailability {
  date: string;
  available_hours: AvailableHours[];
  start_time: string;
  end_time: string;

}


export default function Reservation() {
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [availability, setAvailability] = useState<DataAvailability[]>([]);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      const DataAvailability = await fetchAvailability();
      setAvailability(DataAvailability); 
    }
    fetchData();
   },[])

   const convertUTCtoLocal = (utcDate: any) => {
    const offset = new Date().getTimezoneOffset();
    const localDate = new Date(utcDate.getTime() - (offset * 60 * 1000));
    return localDate;
  };


  const handleDateChange = (newDate: Date | Date[]) => {
    if (Array.isArray(newDate)) {
      throw new Error("You cannot select multiple dates.");
    } else {
      setDate(newDate);
      setSelectedTime(""); 
    }
  };


  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleSubmit = async() => {
    if(!convertUTCtoLocal(date)) {
      setError("Please select a date");
      return;
    }
    if(!selectedTime) {
      setError("Please select a time slot");
      return;
    }

    if(email.endsWith("@gmail.com")) {
      await sendMail(
      
        {to: email, 
          subject: "Room Reservation", 
          body: `You have successfully booked a room for ${convertUTCtoLocal(date).toISOString().split('T')[0]} at ${selectedTime}`,
        });
        console.log(email);
        console.log(selectedTime);
        console.log(convertUTCtoLocal(date).toISOString().split('T')[0]);
    } else {
      setError("Please provide an email with @gmail.com");
    };

   
  };

  const AvailableHoursForSelectedDate = availability.find(
    (item) => new Date(item.date).toISOString().split('T')[0] === convertUTCtoLocal(date).toISOString().split('T')[0] );



  let timeSlots: string[] = [];

  if (AvailableHoursForSelectedDate && AvailableHoursForSelectedDate.available_hours) {
    AvailableHoursForSelectedDate.available_hours.forEach(hour => {
      const startHour = parseInt(hour.start_time.split(":")[0]);
      const endHour = parseInt(hour.end_time.split(":")[0]);
      for (let hour = startHour; hour < endHour; hour++) {
        timeSlots.push(`${hour}:00-${hour + 1}:00`);
      }
    });
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <Card>
          <div className="flex flex-col items-center justify-between calendar">
            <h1 className="text-2xl font-bold mb-2">Date</h1>
            <Calendar
              className="calendarDays"
              locale="en-EU"
              value={date}
              onClickDay={(value) => handleDateChange(value)}
              activeStartDate={date}
            />
            <p>Selected Date: {convertUTCtoLocal(date).toISOString().split('T')[0]}</p>
            {error === "Please select a date" && <p className="text-red-500 text-sm italic">{error}</p>}
          </div>

            
          <div className="flex flex-col items-center justify-between availableTime ">
           <h1 className="text-2xl font-bold mb-2">Available Times</h1>
           {error === "Please select a time slot" && <p className="text-red-500 text-sm italic">{error}</p>}
         
           {timeSlots.length > 0 ? (
            <div className="grid grid-cols-4 availableTime " >
            {timeSlots.map((timeSlot, index) => (
              <button
                key={index}
                className={`${selectedTime === timeSlot ? "bg-green-400" : "bg-white"} hover:bg-green-400  text-black rounded m-2 p-2 text-s calendarTime`}
                onClick={() => handleTimeSelect(timeSlot)}
                
                
              > 
                <p>{timeSlot}</p>
              </button>
            ))}
            </div>

              ) : ( <p className="text-red-500">Sorry, there are no available time slots for the selected date.</p>
              )}
              
                
          </div>

          <div className="flex flex-col items-center justify-between">
            <h1 className="text-2xl font-bold mb-2">Email</h1>
            <input
              className="shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error === "Please provide an email with @gmail.com" && <p className="text-red-500 text-sm italic">{error}</p>}
            <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8"
            onClick={()=>handleSubmit()}>
              Confirm
            </button>
          </div>
        </Card>
      </main>
    </>
  );
}
