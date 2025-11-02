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
        {events.map(event => (
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>{event.date ? new Date(event.date.seconds * 1000).toLocaleString() : ""}</p>
            {/* Link to Event Detail page will go here later */}
          </div>
        ))}
      </div>
    </div>
  );
}