import { useState } from "react";
import API from '../Services/api';
import { emailRegex } from "../utils/validators";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => { 
        console.log(emailRegex.test(email), email);
    if (!emailRegex.test(email)){
        return alert("Invalid email");
    }
    
    try { 
        const res = await API.post("/auth/login", { UserEmail: email, PasswordHash: password});  //makes the login call
        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";}
        catch {
            alert("Login failed");
        }
    };

    return (
       <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh"
       }}>
        <h2>Login</h2>
        <input 
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        />
        <br></br>
        <input 
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        
        <button onClick={handleLogin}>Login</button>
        <br></br>
        <a href="/register">Don't have an account? Register here</a>
       </div>
        
    );
}