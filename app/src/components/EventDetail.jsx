import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";
import { useAuth } from "./AuthContext"; // adjust path if needed
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function EventDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [expandedComments, setExpandedComments] = useState({});
  const commentsRefDiv = useRef(null);

  // Fetch event
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventRef = doc(db, "events", id);
        const eventSnap = await getDoc(eventRef);

        if (eventSnap.exists()) {
          setEvent({ id: eventSnap.id, ...eventSnap.data() });
        } else {
          console.error("Event not found!");
          setEvent(null);
        }
      } catch (err) {
        console.error("Error fetching event:", err);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  // Real-time comments
  useEffect(() => {
    const commentsRef = collection(db, "events", id, "comments");
    const q = query(commentsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setComments(commentsData);
    });

    return () => unsubscribe();
  }, [id]);

  // Auto-scroll to top of comments when they change (newest on top)
  useEffect(() => {
    if (commentsRefDiv.current) {
      commentsRefDiv.current.scrollTop = 0;
    }
  }, [comments]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    try {
      const commentsRef = collection(db, "events", id, "comments");
      await addDoc(commentsRef, {
        text: newComment.slice(0, 256),
        createdAt: serverTimestamp(),
        userId: user.uid,
        userName: user.displayName || "Anonymous"
      });
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const toggleExpand = (commentId) => {
    setExpandedComments(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  if (loading) return <p>Loading event details...</p>;
  if (!event) return <p>Event not found.</p>;

  const eventDate = event.datetime?.seconds
    ? new Date(event.datetime.seconds * 1000)
    : null;
  const formattedDate = eventDate
    ? eventDate.toLocaleString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      })
    : "Date not set";

  return (
    <div style={{ padding: "1rem", maxWidth: "800px", margin: "0 auto" }}>
      <h2>{event.title || "Untitled Event"}</h2>
      <p style={{ fontWeight: "bold" }}>{formattedDate}</p>
      {event.createdBy && <p>Created by: {event.createdBy}</p>}
      <p>{event.description || "No description provided."}</p>

      {/* Event location */}
      {event.location?.lat && event.location?.lng && (
        <div style={{ marginTop: "1rem" }}>
          <p style={{ fontWeight: "bold" }}>Event Location</p>
          <p style={{ fontSize: "0.9rem" }}>
            Coordinates: {event.location.lat.toFixed(4)}, {event.location.lng.toFixed(4)}
          </p>
          <MapContainer
            center={[event.location.lat, event.location.lng]}
            zoom={13}
            scrollWheelZoom={false}
            style={{
              height: "250px",
              width: "100%",
              borderRadius: "0.5rem",
              marginTop: "0.5rem"
            }}
          >
            <TileLayer
              attribution="© OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[event.location.lat, event.location.lng]} />
          </MapContainer>
        </div>
      )}

      {/* Comment input */}
      {user && (
        <div
          style={{
            border: "2px solid #ccc",
            borderRadius: "0.5rem 0.5rem 0 0",
            padding: "0.75rem",
            backgroundColor: "#386c46",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            marginTop: "1rem"
          }}
        >
          <div className="comment-input-row" style={{ display: "flex", gap: "0.5rem" }}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value.slice(0, 256))}
              placeholder="Write a comment..."
              style={{
                flex: 1,
                padding: "0.5rem",
                borderRadius: "0.25rem",
                border: "1px solid #ccc",
                backgroundColor: "#3b3b3b",
                fontSize: "1rem",
                color: "#fff"
              }}
            />
            <button
              type="submit"
              onClick={handleCommentSubmit}
              className="post-button"
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#2d5735",
                color: "#fff",
                border: "1px solid #ccc",
                borderRadius: "0.25rem",
                cursor: "pointer"
              }}
            >
              Post
            </button>
          </div>
          <div className="char-counter" style={{ color: "#fff", fontSize: "0.8rem" }}>
            {256 - newComment.length} characters remaining
          </div>
        </div>
      )}

      {/* Comments container */}
      <div
        style={{
          border: "2px solid #ccc",
          borderTop: "none",
          borderRadius: "0 0 0.5rem 0.5rem",
          padding: "1rem",
          maxHeight: "300px",
          overflowY: "auto",
          backgroundColor: "#386c46",
          marginTop: "0.5rem"
        }}
        ref={commentsRefDiv}
      >
        <h3>Comments</h3>
        {comments.length === 0 && <p>No comments yet. Be the first!</p>}

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {comments.map(comment => {
            const isExpanded = expandedComments[comment.id] || false;
            const showToggle = comment.text.length > 105;
            const displayText = isExpanded || !showToggle
              ? comment.text
              : comment.text.slice(0, 105) + "...";

            return (
              <li
                key={comment.id}
                style={{
                  marginBottom: "0.75rem",
                  padding: "0.5rem",
                  borderBottom: "1px solid #ccc",
                  borderRadius: "0.25rem",
                  backgroundColor: "#3b3b3b",
                  border: "1px solid #ccc",
                  color: "#fff",
                  wordWrap: "break-word",
                  whiteSpace: "pre-wrap",
                  textAlign: "left"
                }}
              >
                <p style={{ margin: 0 }}>
                  <strong>{comment.userName || "Anonymous"}:</strong> {displayText}
                </p>
                {showToggle && (
                  <button
                    onClick={() => toggleExpand(comment.id)}
                    style={{
                      marginTop: "0.25rem",
                      background: "none",
                      border: "none",
                      color: "#aadbaa",
                      cursor: "pointer",
                      textAlign: "left",
                      padding: 0
                    }}
                  >
                    {isExpanded ? "Show less" : "Show more"}
                  </button>
                )}
                <small style={{ color: "#ccc", display: "block" }}>
                  {comment.createdAt?.seconds
                    ? new Date(comment.createdAt.seconds * 1000).toLocaleString()
                    : "Just now"}
                </small>
              </li>
            );
          })}
        </ul>
      </div>

      <style>
        {`
          .char-counter {
            text-align: right; /* Desktop default */
            font-size: 0.8rem;
          }

          @media (max-width: 600px) {
            .comment-input-row {
              flex-direction: column;
            }
            .post-button {
              align-self: flex-start;
            }
            .char-counter {
              text-align: left; /* Override for mobile */
            }
          }
        `}
      </style>
    </div>
  );
}
