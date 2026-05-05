import { useEffect, useState } from "react";
import API from '../Services/api';
import Navbar from "../components/Navbar";

export default function Transactions(){
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        API.get("/payments/history")
        .then((res) => setTransactions(res.data))
        .catch(() => alert("Error loading transaction"));
    }, []);

    return (
        <div style={{ textAlign: "center" }}>
            <Navbar />
            <h2>Transactions</h2>
            <ul style={{
                listStyle: "none",
                padding: 0,
                marginTop: "1rem",
                display: "inline-block",
                textAlign: "left"
            }}>
                {transactions.map((t, i) => (
                    <li key={i} style={{ marginBottom: "0.5rem"}}>
                    To:    {t.recipientAccount} - R{t.amount} on {new Date(t.date).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    )
}