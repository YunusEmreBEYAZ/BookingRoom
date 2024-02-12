"use client";
import Card from "../components/Card";
import Calendar from "react-calendar";
import { useState,useEffect } from "react";
import "../../app/styles.css"
import  fetchAvailability  from "../api/api";
import {sendMail} from "../lib/mail";
import Image from "next/image";
import VuLogo from "../../../public/logo.png";
import Link from "next/link";
import bookSuccess from "../../../public/bookSuccess.png";
import { send } from "process";







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
  const [showModal, setShowModal] = useState<boolean>(false);

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

    if(email.endsWith("@vu.nl")) {
      try {
        await sendMail(
      
          {to: email, 
            subject: "Room Reservation", 
            body: `<h4>You have successfully booked a room for ${convertUTCtoLocal(date).toISOString().split('T')[0]} at ${selectedTime}</h4>`,
          });
          console.log(email);
          console.log(selectedTime);
          console.log(convertUTCtoLocal(date).toISOString().split('T')[0]);
          setShowModal(true);
      } catch (error) {
        setError("Failed to send email/confirmation. Please try again later.");
      }
      
    } else {
      setError("Please provide an email with @vu.nl");
    };

  };


  const AvailableHoursForSelectedDate = availability.find(
    (item) => new Date(item.date).toISOString().split('T')[0] === convertUTCtoLocal(date).toISOString().split('T')[0] );



  let timeSlots: string[] = [];


    for (let hour = 8; hour < 20; hour++) {
      const formattedHour = hour.toString().padStart(1, '0');
      timeSlots.push(`${formattedHour}:00-${(hour + 1).toString().padStart(2, '0')}:00`);
    }
  

  let availableSlots: string[] = [];
    if (AvailableHoursForSelectedDate && AvailableHoursForSelectedDate.available_hours) {
      AvailableHoursForSelectedDate.available_hours.forEach(hour => {
       const startHour = parseInt(hour.start_time.split(":")[0]);
       const endHour = parseInt(hour.end_time.split(":")[0]);
       for (let hour = startHour; hour < endHour; hour++) {
        availableSlots.push(`${hour}:00-${hour + 1}:00`);
       }
     });
   }



  

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <Card>
          <a href="https://www.omniabuildings.nl/" target="_blank" className="vuLink">
          <Image className="vuLogo" src={VuLogo} alt="VU Logo" />
            </a>
          <div className="flex flex-col items-center justify-between calendar">
            <h1 className="text-2xl font-bold mb-2">Date</h1>
            <Calendar
              className="calendarDays"
              locale="en-EU"
              value={date}
              onClickDay={(value) => handleDateChange(value)}
              activeStartDate={date}
            />
            {error === "Please select a date" && <p className="text-red-500 text-sm italic">{error}</p>}
          </div>

            
          <div className="flex flex-col items-center justify-between availableTime">
          <h1 className="text-2xl font-bold mb-2">Available Times</h1>
          {error === "Please select a time slot" && <p className="text-red-500 text-sm italic">{error}</p>}
          {timeSlots.length > 0 ? (
            <div className="grid grid-cols-4 availableTime">
              {timeSlots.map((timeSlot, index) => {
                const isAvailable = availableSlots.includes(timeSlot);
                return (
                  <button
                    key={index}
                    className={`${
                      selectedTime === timeSlot ? "bg-green-400" : "bg-white"
                    } ${
                      isAvailable ? "text-black hover:bg-green-400 cursor-pointer" : "text-gray-400 cursor-not-allowed"
                    } rounded-full m-2 p-2 text-sm calendarTime`}
                    onClick={() => isAvailable && handleTimeSelect(timeSlot)}
                    disabled={!isAvailable}
                  >
                    <p style={{ fontWeight: isAvailable ? "bold" : "normal" }}>{timeSlot}</p>
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="text-red-500">Sorry, there are no available time slots for the selected date.</p>
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
            {error === "Failed to send email or confirm. Please try again later." && <p className="text-red-500 text-sm italic">{error}</p>}
            <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8"
            onClick={()=>handleSubmit()}>
              Confirm
            </button>
          </div>
        </Card>
      </main>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="text-2xl font-bold mb-2" >Your Booking Details</h2>
            <div className="bookingDetails">
              <div className="text-justify">
              <p><span className="font-bold align-start">Date: </span>{convertUTCtoLocal(date).toISOString().split('T')[0]}</p>
              <p><span className="font-bold">Time: </span> {selectedTime}</p>
              <p><span className="font-bold">Email: </span> {email}</p>
              </div>
              <div>
              <Image src={bookSuccess} alt="bookSuccess" />
              </div>

            </div>
            <p className="text-small m-2">You will receive an email shortly with the booking confirmation</p>
            <Link href="/" className="bg-blue-400 hover:bg-blue-500  text-white rounded-full m-3 p-2 text-xs">Homepage</Link>
          </div>
        </div>
      )}
    </>
  );
}
