import { useState } from 'react';
import socialButterfly from './assets/socialButterfly.png';
import './App.css';
import Login from './components/Login'; // Firebase login component

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="logo-row">
        <img src={socialButterfly} className="logo social" alt="Social Butterfly Logo" />
      </div>

      <h1>Social Butterfly</h1>

      {/* Login component for Firebase Authentication */}
      <Login />

    </>
  );
}

export default App;