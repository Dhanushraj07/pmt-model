import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signin.css";

function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/auth/signin", { email, password });

            toast.success(response.data?.message || "Sign in successful");
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("userId", response.data.userId);

            console.log("Token stored:", localStorage.getItem("token"));
            setTimeout(() => navigate("/dashboard"), 2000);
        } catch (err) {
            toast.error("Error: " + err.response?.data?.message || "Sign in failed");
        }
    };

    const handleNewUser = () => {
        navigate("/signup"); 
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSignin}>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Sign In</button>
            </form>
            <br />
            <button type="button" onClick={handleNewUser}>New User</button>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </div>
    );
}

export default Signin;
