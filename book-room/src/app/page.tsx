"use client";

import Image from "next/image";
import VuLogo from "../../public/logo.png";
import Card from "./components/Card";
import './styles.css';
import BackgroundImg from "./components/Background";
import Link from "next/link";

export default function Home() {
  const images: string[] = ['bg1.jpeg', 'bg2.jpeg', 'bg3.jpeg'];
  return (
    <>
    <BackgroundImg images={images} />
    <main className="flex min-h-screen flex-col items-center justify-between">

      <Card>
      <a href="https://www.omniabuildings.nl/" target="_blank">
        <Image className="vuLogo" src={VuLogo} alt="VU Logo" />
        </a>
        <h1 className="text-4xl font-bold title-h1 ">Book a Room</h1>
        <p className="text-lg">Book a room for your next quiet study</p>
        <Link href="/reservation">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8" >Book Now</button>
        </Link>
       




      </Card>
    </main>
    </>
  );
}
