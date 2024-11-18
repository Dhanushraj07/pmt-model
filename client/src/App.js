import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import Dashboard from "./components/pages/Dashboard";

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    
                </Routes>
            </div>
        </Router>
    );
}

export default App;
