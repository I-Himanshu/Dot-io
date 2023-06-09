import { EventRef, userRef ,db} from "@/firebaseConfig";
import {
  addDoc,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const GetEvents = () => {
  const [Events, setEvents] = useState([]);
  useEffect(() => {
    onSnapshot(EventRef, (snapshot) => {
      let allEvent = [];
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          allEvent.push({ ...change.doc.data(), id: change.doc.id });
        }
        if (change.type === "modified"){
          allEvent = allEvent.map((Event) => {
            if (Event.id === change.doc.id) {
              return { ...change.doc.data(), id: change.doc.id };
            }
            return Event;
          });
        }
        if (change.type === "removed") {
          allEvent = allEvent.filter((Event) => Event.id !== change.doc.id);
        }
        setEvents(allEvent);
      });
    });
  }, []);
  
  return Events;
};
export const DeleteEvent = async (eventId)=>{
  await deleteDoc(doc(db, "events", eventId));
  location.href = "./eventPage"
}
// export const getSingleEvent(eventId){
//     const Events = getEvents();
//     if(Events){

//     }
    
// }
export const SendEvent = (Event) => {
  addDoc(EventRef, Event)
    .then((docRef) => {
      location.href = './eventPage';
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

export const AddUser = async (data, userId) => {
  const docRef = await setDoc(doc(userRef, userId), data);
  console.log("Document written with ID: ", docRef);
};
