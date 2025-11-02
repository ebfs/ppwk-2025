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

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}