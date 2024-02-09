"use client";
import Card from "../components/Card";
import Calendar from "react-calendar";
import { useState,useEffect } from "react";
import "../../app/styles.css"
import  fetchAvailability  from "../api/api";




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

  useEffect(() => {
    async function fetchData() {
      const DataAvailability = await fetchAvailability();
      setAvailability(DataAvailability); 
    }
    fetchData();
   },[])

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

  const AvailableHoursForSelectedDate = availability.find(
    (item) => new Date(item.date).toISOString().split('T')[0] === date.toISOString().split('T')[0] );

    console.log("AvailableHoursForSelectedDate:", AvailableHoursForSelectedDate);


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
              locale="en-US"
              value={date}
              onClickDay={(value) => handleDateChange(value)}
              activeStartDate={date}
            />
            <p>Selected Date: {date.toISOString().split('T')[0]}</p>
          </div>

            
          <div className="flex flex-col items-center justify-between">
            <h1 className="text-2xl font-bold mb-2">Time</h1>
            <div className="grid grid-cols-4 " >
            {timeSlots.map((timeSlot, index) => (
              <button
                key={index}
                className={`${
                  selectedTime === timeSlot ? "bg-blue-500" : "bg-white-300"
                } hover:bg-blue-500 text-black rounded m-2 p-2 text-s calendarTime`}
                onClick={() => handleTimeSelect(timeSlot)}
              >
                <p>{timeSlot}</p>
              </button>
            ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-between">
            <h1 className="text-2xl font-bold mb-2">Email</h1>
            <input
              className="shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Email"
            />
            <p className="text-red-500 text-xs italic">
              Please provide an email with @vu.nl
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8">
              Confirm
            </button>
          </div>
        </Card>
      </main>
    </>
  );
}
