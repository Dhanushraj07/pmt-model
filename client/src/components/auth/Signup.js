import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/auth/signup", {
                username, email, password
            });
            toast.success(response.data?.message || "User Created successfully");

        } catch (err) {
            toast.error("Error: " + err.response.data.message);
        }
    };

    const handleLogin = ()=>{
        navigate('/')
    }

    return (
        <div class="login-container">
            <h2>Sign Up</h2>
                <form onSubmit={handleSignup}>
                    <input type="username" placeholder="name" onChange={(e) => setUsername(e.target.value)} />
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Sign Up</button> 
                </form><br/>
                <button type="button" onClick={handleLogin}>Login</button>
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </div>
    );
}

export default Signup;
