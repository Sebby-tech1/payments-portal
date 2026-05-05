import { useEffect, useState } from "react";
//import api from "../services/Services/api"
import API from '../Services/api';
import Navbar from "../components/Navbar";

export default function Dashboard(){
    const [balance, setBalance] = useState(0);

    useEffect(() => {API.get("/payments/balance")
    .then((res) => setBalance(res.data.balance))
    .catch(() => alert("Error fetching balance"));

}, []);

return (
    <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh"
       }}> 
        <Navbar />
        <h2>Dashboard</h2>
        <h3>Balance: R{balance}</h3>
    </div>
);
}
