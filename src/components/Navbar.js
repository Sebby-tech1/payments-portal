import {Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div>
        <nav>
            <Link to="/dashboard">Dashboard | </Link>
            <Link to="/send">Send Payment | </Link>
            <Link to="/transactions">Transactions </Link>
            
        </nav>
        <div style={{
            position: "fixed",
            bottom: "20px",
            width: "100%",
            //textAlign: "center"
        }}>
            <button onClick={logout}>Logout</button>
        </div>
        </div>
    );
}