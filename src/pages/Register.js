import { useState} from "react";
import API from '../Services/api';
import { nameRegex, emailRegex, passwordRegex } from "../utils/validators";

export default function Register(){
    const [form, setForm] = useState({userName:"",userEmail:"",passwordHash: ""});

    const register = async () => {
        if (!nameRegex.test(form.userName)) return alert("Invalid name");
        if (!emailRegex.test(form.userEmail)) return alert("Invalid email");
        if (!passwordRegex.test(form.passwordHash)) return alert("Invalid password");

        try{
            await API.post("/auth/register",form);
            alert("Registered successfully");
            window.location.href = "/";
        }catch{
            alert("Registration failed");
        }
    };

    return (
        <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh"
       }}>
            <h2>Register</h2>
            <input placeholder="Name" onChange={(e) => setForm({...form, userName: e.target.value})}/>
            <br></br>
            <input placeholder="Email" onChange={(e) => setForm({...form, userEmail: e.target.value})}/>
            <br></br>
            <input placeholder="password" onChange={(e) => setForm({...form, passwordHash: e.target.value})}/>
            <br></br>
            <button onClick={register}>Register</button>
        </div>
    );
}