import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase"; // your firebase config
import { collection, addDoc, Timestamp } from "firebase/firestore";

function CreateEvent() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !date) {
      setError("Please fill out title and date.");
      return;
    }

    // Combine date, hour, minute into a Date object
    const [year, month, day] = date.split("-").map(Number);
    const eventDate = new Date(year, month - 1, day, Number(hour), Number(minute));

    try {
      await addDoc(collection(db, "events"), {
        title,
        description,
        datetime: Timestamp.fromDate(eventDate),
        createdAt: Timestamp.now(),
      });
      navigate("/"); // go back to feed
    } catch (err) {
      console.error(err);
      setError("Failed to create event.");
    }
  };

  return (
    <form className="create-event-form" onSubmit={handleSubmit}>
      {error && <div className="login-error">{error}</div>}

      {/* Title */}
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      {/* Date + Time Row */}
      <div className="title-date-row">
        <input
          type="date"
          className="date-input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <select value={hour} onChange={(e) => setHour(e.target.value)}>
          {Array.from({ length: 24 }, (_, i) => (
            <option key={i} value={i.toString().padStart(2, "0")}>
              {i.toString().padStart(2, "0")}
            </option>
          ))}
        </select>

        <select value={minute} onChange={(e) => setMinute(e.target.value)}>
          {[0, 15, 30, 45].map((m) => (
            <option key={m} value={m.toString().padStart(2, "0")}>
              {m.toString().padStart(2, "0")}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <textarea
        className="description-input"
        placeholder="Event Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Create Event</button>
    </form>
  );
}

export default CreateEvent;