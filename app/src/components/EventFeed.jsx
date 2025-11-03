import { useEffect, useState } from "react";
import { db } from "./../firebase";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import "../styles/EventCard.css";

export default function EventFeed() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loadingText, setLoadingText] = useState("Loading");
  const [loadingTimeoutPassed, setLoadingTimeoutPassed] = useState(false);

  // Fetch events from Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      const now = new Date();
      const q = query(
        collection(db, "events"),
        where("datetime", ">=", now), // FIXED: use 'datetime'
        orderBy("datetime", "asc")   // FIXED: order by 'datetime'
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

  // Filter events whenever searchTerm, categoryFilter, dateFilter, or events change
  useEffect(() => {
    let tempEvents = [...events];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      tempEvents = tempEvents.filter(
        e =>
          e.title.toLowerCase().includes(term) ||
          e.description.toLowerCase().includes(term)
      );
    }

    if (categoryFilter) {
      tempEvents = tempEvents.filter(e => e.category === categoryFilter);
    }

    if (dateFilter) {
      const selected = new Date(dateFilter);
      tempEvents = tempEvents.filter(e => {
        const eventDate = e.datetime ? new Date(e.datetime.seconds * 1000) : null; // FIXED
        return eventDate
          ? eventDate.toDateString() === selected.toDateString()
          : false;
      });
    }

    setFilteredEvents(tempEvents);
  }, [searchTerm, categoryFilter, dateFilter, events]);

  // 5-second timer for no events message
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingTimeoutPassed(true);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  // Animate loading text
  useEffect(() => {
    const dots = ["", ".", "..", "..."];
    let index = 0;
    const interval = setInterval(() => {
      setLoadingText(`Loading${dots[index]}`);
      index = (index + 1) % dots.length;
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="event-feed-container">
      <h2>Upcoming Events</h2>

      {/* Filters */}
      <div
        className="event-filters"
        style={{
          marginBottom: "1rem",
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* Search */}
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "0.75rem",
            borderRadius: "0.25rem",
            border: "1px solid #ccc",
            backgroundColor: "#3b3b3b",
            color: "#fff",
            fontFamily: "inherit",
            fontSize: "1rem",
            flex: "1 1 200px",
          }}
        />

        {/* Category */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{
            padding: "0.75rem",
            borderRadius: "0.25rem",
            border: "1px solid #ccc",
            backgroundColor: "#3b3b3b",
            color: "#fff",
            fontFamily: "inherit",
            fontSize: "1rem",
          }}
        >
          <option value="">All Categories</option>
          <option value="music">Music</option>
          <option value="sports">Sports</option>
          <option value="tech">Tech</option>
        </select>

        {/* Date filter */}
        <input
          type="date"
          className="date-input"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          style={{
            padding: "0.75rem",
            borderRadius: "0.25rem",
            border: "1px solid #ccc",
            backgroundColor: "#3b3b3b",
            color: "#fff",
            fontFamily: "inherit",
            fontSize: "1rem",
          }}
        />
      </div>

      {filteredEvents.length === 0 && (
        <p>{loadingTimeoutPassed ? "Did not find any events :(" : loadingText}</p>
      )}

      <div className="event-list">
        {filteredEvents.map(event => {
          const eventDate = event.datetime ? new Date(event.datetime.seconds * 1000) : null; // FIXED
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