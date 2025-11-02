import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "./AuthContext.jsx";

export default function CreateEvent() {
  const { user } = useAuth(); // get logged-in user
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Function to get current datetime in YYYY-MM-DDTHH:MM format
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to create an event.");
      return;
    }

    if (!title || !description || !date) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    try {
      await addDoc(collection(db, "events"), {
        title,
        description,
        date: new Date(date),
        createdBy: user.uid,
        createdAt: serverTimestamp(),
      });

      setTitle("");
      setDescription("");
      setDate("");
      setSuccess("Event created successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="create-event-container">
      <h2>Create New Event</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit} className="create-event-form">
        <div className="title-date-row">
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="title-input"
          />
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            min={getCurrentDateTime()} // dynamic min = current datetime
            max="2100-12-31T23:45"
            step={900} // 15-minute intervals (900 seconds)
            onKeyDown={(e) => e.preventDefault()} // block typing
            className="date-input"
          />
        </div>

        <textarea
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="description-input"
        />

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}