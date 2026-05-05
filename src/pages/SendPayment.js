import { useState } from "react";
import API from '../Services/api';
import Navbar from "../components/Navbar";
import { amountRegex, accountRegex} from "../utils/validators";

export default function SendPayment(){
    const [form, setForm] = useState({ recipientAccount: "", amount: 0});

    const send = async () => {
        if (!accountRegex.test(form.recipientAccount)) return alert("Invalid account");
        if (!amountRegex.test(form.amount)) return alert("Invalid amount");

        try{
            await API.post("/payments/send", form);
            alert("Payment successful");
        }catch{
            alert("Payment failed");
        }
    };

    return (
        <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh"
       }}>
            <Navbar/>
            <h2>Send Payment</h2>
            <input placeholder="Recipient Account" onChange={(e) => setForm({ ...form, recipientAccount:
                 e.target.value })} />
                 <br></br>
                <input placeholder="Amount" onChange={(e) => setForm({ ...form, amount: Number(e.target.value)})} />
                <br></br>
                <button onClick={send}>Send</button>
        </div>
    )
}