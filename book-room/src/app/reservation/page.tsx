"use client";

import Card from "../components/Card";
import Calendar from "react-calendar";
import { useState, ChangeEvent} from "react";
import "../styles.css";
import VuLogo from "../../../public/logo.png";
import Image from "next/image";


export default function Reservation() {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate : Date | Date[]) => {
    if (Array.isArray(newDate)) {
      throw new Error("You can not select multiple dates.");
    } else {
      setDate(newDate);
    }
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
        onChange={handleDateChange}
        value={date}
      />
    </div>
    <div className="flex flex-col items-center justify-between">
      <h1 className="text-2xl font-bold mb-2">Time</h1>
      <h1 className="text-2xl font-bold mb-2">Time</h1>
      <h1 className="text-2xl font-bold mb-2">Time</h1>
      <h1 className="text-2xl font-bold mb-2">Time</h1>
    </div>
    <div className="flex  flex-col items-center justify-between">
      <h1 className="text-2xl font-bold mb-2">Email</h1>
      <input className="shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="email" placeholder="Email" />
      <p className="text-red-500 text-xs italic">Please provide an email with @vu.nl</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8" >Confirm</button>
    </div>

</Card>
</main>
  </>
  );
}