import { useEffect, useState } from "react";
import { db } from "./../firebase";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";

// Import the EventCard CSS
import "../styles/EventCard.css";

export default function EventFeed() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const now = new Date(); // current date/time

      // Query: only events with date >= now, sorted ascending (soonest first)
      const q = query(
        collection(db, "events"),
        where("date", ">=", now),
        orderBy("date", "asc")
      );

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
    <div className="event-feed-container">
      <h2>Upcoming Events</h2>
      {events.length === 0 && <p>No events yet</p>}
      <div className="event-list">
        {events.map(event => {
          const eventDate = event.date ? new Date(event.date.seconds * 1000) : null;
          const formattedDate = eventDate
            ? eventDate.toLocaleString(undefined, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
            : "";

          return (
            <div key={event.id} className="event-card">
              <div className="event-card-header">
                <h3 className="event-title">{event.title}</h3>
                <span className="event-date">{formattedDate}</span>
              </div>
              <p className="event-description">{event.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}