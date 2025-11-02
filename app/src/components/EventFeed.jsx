import { useEffect, useState } from "react";
import { db } from "./../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default function EventFeed() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const q = query(collection(db, "events"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const eventsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsData);
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Upcoming Events</h2>
      {events.length === 0 && <p>No events yet</p>}
      <div className="event-list">
        {events.map(event => {
          // Convert Firestore timestamp to JS Date
          const eventDate = event.date ? new Date(event.date.seconds * 1000) : null;

          // Format date without seconds
          const formattedDate = eventDate
            ? eventDate.toLocaleString(undefined, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit", // no seconds
                hour12: true,      // optional: show AM/PM
              })
            : "";

          return (
            <div key={event.id} className="event-card">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>{formattedDate}</p>
              {/* Link to Event Detail page will go here later */}
            </div>
          );
        })}
      </div>
    </div>
  );
}