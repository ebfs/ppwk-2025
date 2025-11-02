import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from './components/Login';
import EventFeed from './components/EventFeed';
import CreateEvent from './components/CreateEvent';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import socialButterfly from './assets/socialButterfly.png';
import easterEggImg from './assets/easterEgg.jfif';
import './App.css';

function App() {
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleLogoClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount + 1 >= 50) {
      setShowEasterEgg(true);
      setClickCount(0);
      setTimeout(() => setShowEasterEgg(false), 1500); // fade out after 1.5s
    }
  };

  return (
    <Router>
      <header>
        <div className="logo-row">
          <img
            src={socialButterfly}
            className="logo social"
            alt="Social Butterfly Logo"
            onClick={handleLogoClick}
          />
        </div>
        <h1>Social Butterfly</h1>

        <nav className="nav-bar">
          <Link to="/" className="nav-button">Home</Link>
          <Link to="/create" className="nav-button">Create Event</Link>
          <Link to="/login" className="nav-button">Login/Profile</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<EventFeed />} />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateEvent />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      {showEasterEgg && (
        <div className="easter-egg-overlay">
          <img src={easterEggImg} alt="Easter Egg" />
        </div>
      )}
    </Router>
  );
}

export default App;