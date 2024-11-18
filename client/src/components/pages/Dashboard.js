import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './dashboard.css';

function Dashboard() {
  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState("");
  const [punchInTime, setPunchInTime] = useState(null);
  const [punchOutTime, setPunchOutTime] = useState(null);
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [totalTime, setTotalTime] = useState(null);

  useEffect(() => {
    // Redirect to login if not authenticated
    const storedUsername = localStorage.getItem('username');
    const storedUserid = localStorage.getItem('userid');
    if (!storedUsername) {
      window.location.href = '/';
      return;
    }
    
    setUsername(storedUsername);
    setUserid(storedUserid);
    
    const storedPunchInTime = localStorage.getItem('punchInTime');
    const storedPunchOutTime = localStorage.getItem('punchOutTime');

    if (storedPunchInTime) {
      setPunchInTime(new Date(storedPunchInTime));
      setIsPunchedIn(true);
    }
    if (storedPunchOutTime) {
      setPunchOutTime(new Date(storedPunchOutTime));
    }

    // Calculate total time if both punch-in and punch-out times exist
    if (storedPunchInTime && storedPunchOutTime) {
      calculateTotalTime(new Date(storedPunchInTime), new Date(storedPunchOutTime));
    }
  }, []);

  const handlePunchIn = async () => {
    try {
      const response = await axios.post("http://localhost:5000/auth/punchin", { userId: userid});

      const punchInTime = response.data.punchInTime;
      setPunchInTime(new Date(punchInTime));
      setIsPunchedIn(true);
      localStorage.setItem('punchInTime', punchInTime);

      setPunchOutTime(null);
      setTotalTime(null);
      localStorage.removeItem('punchOutTime');
    } catch (error) {
      console.error("Punch-in failed", error);
    }
  };

  const handlePunchOut = async () => {
    try {
      const response = await axios.post("http://localhost:5000/auth/punchout", { userId: userid });

      const punchOutTime = response.data.punchOutTime;
      setPunchOutTime(new Date(punchOutTime));
      setIsPunchedIn(false);
      localStorage.setItem('punchOutTime', punchOutTime);

      calculateTotalTime(punchInTime, new Date(punchOutTime));
    } catch (error) {
      console.error("Punch-out failed", error);
    }
  };

  const calculateTotalTime = (punchIn, punchOut) => {
    const diff = punchOut - punchIn;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    setTotalTime(`${hours}h ${minutes}m ${seconds}s`);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('punchInTime');
    localStorage.removeItem('punchOutTime');
    setUsername("");
    setPunchInTime(null);
    setPunchOutTime(null);
    setIsPunchedIn(false);
    setTotalTime(null);

    window.location.href = '/';
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          
          <div className="navbar-links">
          <div className="navbar-logo">Hello, {username}</div>
            <button id="log-out" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
      <div className="punchin-container">
        <button onClick={isPunchedIn ? handlePunchOut : handlePunchIn} id="punch-btn">
          {isPunchedIn ? "Punch Out" : "Punch In"}
        </button>
        <div className="total-time-container" id="total-time">
          Total Time: {totalTime ? totalTime : "Not Available"}
        </div>
        <div className="time-display-container">
          <div className="inner-container" id="punchin-time">
            Punch-In Time: {punchInTime ? punchInTime.toLocaleString() : "Not Punched In"}
          </div>
          <div className="inner-container" id="punchout-time">
            Punch-Out Time: {punchOutTime ? punchOutTime.toLocaleString() : "Not Punched Out"}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
