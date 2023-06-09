import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import EventCard from "../components/EventCard";
import { GetEvents } from "@/components/firebase/firebase";
import { useAuth } from "@/contexts/authContext";
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
  const Events = GetEvents();
  const { user } = useAuth();
  const [eventType, setEventType] = useState("all");
  const [eventLoc, setEventLoc] = useState("all")
  const currentTime = new Date();
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
            <div className="flex justify-center items-center top-0 left-0 bottom-0 right-0 bg-[#0004] absolute transition-all px-4">
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
              <div className=" w-screen px-2 pr-3 sm:px-4 sm:pr-8 bg-gray-200">
                <div className="flex justify-between items-center py-4">
                  <div className="ml-4">
                    <a className="text-xl sm:text-4xl font-bold text-dark">
                      <span className="text-[#408080]">Event</span>ify
                    </a>
                  </div>
                  <div className="flex items-center justify-between gap-5 text-sm sm:gap-10">
                    <Link
                      href="/"
                      className="text-base text-dark hover:text-[#408080] bg-slate-300 p-1 px-4 rounded-full font-bold"
                    >
                      Home
                    </Link>

                    {console.log(user)}
                    {user?.uid ? (
                      <>
                        <Link
                          href={"/createEvent"}
                          className="text-base font-medium text-dark hover:text-[#408080]"
                        >
                          Create Event
                        </Link>
                        <Link
                          href="/logout"
                          className="text-base font-medium text-dark mr-6 hover:text-[#408080]"
                        >
                          Logout({user.displayName})
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          className="text-base font-medium text-dark hover:text-primary"
                        >
                          Login
                        </Link>
                        <Link
                          href="/signup"
                          className="text-base font-medium text-dark mr-6 hover:text-primary"
                        >
                          Signup
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </nav>
            <div className="flex flex-nowrap justify-end gap-10 bg-gray-200 p-2 pr-4">
              <select
                onChange={(e) => setEventType(e.target.value)}
                className='w-28'
              >
                <option value="all">All Events</option>
                <option value="upcoming">Upcoming Events</option>
                <option value="past">Past Events</option>
              </select>

              <select
                name=""
                id=""
                onChange={(e) => setEventLoc(e.target.value)}
                className='w-28'
              >
                <option value="all" disabled selected>Select Location</option>
                <option value="all">All Locations</option>
                <option value="online">Online</option>
                <option value="off">Offline</option>
              </select>

              {/* <input type="search" placeholder="Search..." className="outline-[#408080] shadow-[#408080] shadow-inner rounded-full border-[#408080] w-28 sm:w-fit px-4 py-1"  /> */}
            </div>
            <section className="bg-gray-100 min-h-screen flex flex-row flex-wrap justify-center items-start gap-5">
              {Events &&
                Events.map((Event) => {
                  if (
                    
                    (eventType == "all" ||
                    (eventType=='upcoming' && (currentTime.getTime()-new Date(Event.date).getTime()<=0)) ||
                    (eventType == "past" && (currentTime.getTime()-new Date(Event.date).getTime()>=0)))                    
                    &&
                    (eventLoc=="all"||
                    (eventLoc=="online" && eventLoc==Event.location.toLowerCase())||
                    (eventLoc=="off" && "online"!==Event.location.toLowerCase())
                    )
                    ){
                    return (
                      <EventCard
                        name={Event.name}
                        description={Event.description}
                        date={Event.date}
                        location={Event.location}
                        image={Event.image}
                        id={Event.id}
                        key={Event.id}
                        uid={Event.uid}
                      />
                    );
                    }
                })}
            </section>
          </>
        )}
        <footer className="font-extrabold text-center text-lg font-serif p-4">
                Made With ❤️  By Team .IO
        </footer>
      </main>
    </>
  );
}
