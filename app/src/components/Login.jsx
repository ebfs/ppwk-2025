import { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignup = async () => {
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogin = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    setError("");
    try {
      await signOut(auth);
    } catch (err) {
      setError(err.message);
    }
  };

  if (user) {
    return (
      <div className="login-status">
        <p>Logged in as: {user.email}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div className="login-container">
      {/* Render error message in component */}
      {error && <div className="login-error">{error}</div>}

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="login-buttons">
        <button onClick={handleSignup}>Sign Up</button>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}