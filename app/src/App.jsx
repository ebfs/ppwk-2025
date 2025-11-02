import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from './components/Login';
import EventFeed from './components/EventFeed';
import CreateEvent from './components/CreateEvent';
import ProtectedRoute from './components/ProtectedRoute.jsx'; // import ProtectedRoute
import socialButterfly from './assets/socialButterfly.png';
import './App.css';

function App() {
  return (
    <Router>
      <header>
        <div className="logo-row">
          <img src={socialButterfly} className="logo social" alt="Social Butterfly Logo" />
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
    </Router>
  );
}

export default App;