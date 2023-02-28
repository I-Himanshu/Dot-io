import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import EventCard from "../components/EventCard";
import { getEvents } from "@/components/firebase/firebase";
export default function Home() {
    // const EVENTS = {
    //     "event1": {
    //         "name": "Solution Challenge Event",
    //         "image": "https://th.bing.com/th/id/OIP.lbNwtS5QHxECLgBVO2ZLzAHaEK?pid=ImgDet&rs=1",
    //         "description": "Build a solution to a local problem using Google technologies in accordance with one or more of the United Nations 17 Sustainable Development Goals.",
    //         "date": "Fri, Mar 6, 7:00 AM",
    //         "location": "Raj Park, New Delhi",
    //         "charge": 200,
    //         "sponsors":"Bing",
    //         "coordinator1":"Cname, Cnumber",
    //         "coordinator2":"Cname, Cnumber"
    //     },
    //     "event2": {
    //         "name": "Google for Startups Accelerator Canada",
    //         "image": "https://th.bing.com/th/id/OIP.lbNwtS5QHxECLgBVO2ZLzAHaEK?pid=ImgDet&rs=1",
    //         "description": "Applications are now closed for the fourth cohort of high potential Canadian startups. Learn more about the program.",
    //         "date": "Fri, Mar 6, 7:00 AM",
    //         "location": "Raj Park, New Delhi",
    //         "charge": 200,
    //         "sponsors":"Bing",
    //         "coordinator1":"Cname, Cnumber",
    //         "coordinator2":"Cname, Cnumber"
    //     }
    // }
    const Events = getEvents();
  const [loading, setloading] = useState(true);
  setTimeout(() => {
    setloading(false);
  }, 100);
  return (
    <>
      <Head>
        <title>Eventify</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {Events.length == 0 ? (
          <section className="bg-[#F3F4F6] min-h-screen bg-[url(https://thumbs.gfycat.com/ActiveLinedDevilfish-size_restricted.gif)] bg-no-repeat bg-cover flex justify-center items-center">
            <div className="flex justify-center items-center top-0 left-0 bottom-0 right-0 bg-[#0004] absolute transition-all">
              <div className="text-white text-3xl text-center">
                Welcome To
                <h1 className="font-extrabold text-8xl tracking-wider">
                  Eventify
                </h1>
                All your events are here
              </div>
            </div>
          </section>
        ) : (
          <>
            <nav>
              <div className="container mx-auto px-0">
                <div className="flex justify-between items-center py-4">
                  <div className="flex items-center">
                    <a className="text-2xl font-bold text-dark">Eventify</a>
                  </div>
                  <div className="flex items-center">
                    <Link href="/" className="text-base font-medium text-dark mr-6 hover:text-primary">
                      Home
                    </Link>
                    <Link href={"/createEvent"} className="text-base font-medium text-dark mr-6 hover:text-primary">
                      Create Event
                    </Link>
                    <Link href="/login" className="text-base font-medium text-dark mr-6 hover:text-primary">
                      Login
                    </Link>
                    <Link href="/signup" className="text-base font-medium text-dark mr-6 hover:text-primary">
                      Signup
                    </Link>
                  </div>
                </div>
              </div>
            </nav>
            <section className="bg-[#F3F4F6] min-h-screen flex flex-row flex-wrap justify-evenly">
                {Events && Events.map((Event) => (
                    <EventCard
                        name={Event.name}
                        description={Event.description}
                        date={Event.date}
                        location={Event.location}
                        image={Event.image} 
                        id={Event.id}
                        key={Event.id}/>
                ))}

            </section>
          </>
        )}
      </main>
    </>
  );
}
