import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from './pages/Dashboard';
import SendPayment from './pages/SendPayment';
import Transactions from './pages/Transactions';
import ProtectedRoute from "./components/ProtectedRoute";

 export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
       path="/dashboard" 
       element={<ProtectedRoute>
        <Dashboard/>
        </ProtectedRoute>}
        />

        <Route path="/send" element={<ProtectedRoute>
          <SendPayment />
        </ProtectedRoute>}/>

          <Route path="/transactions" element={<ProtectedRoute>
            <Transactions/>
          </ProtectedRoute>}/>

    </Routes>
    </BrowserRouter>
  );
}


