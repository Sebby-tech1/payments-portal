import axios from "axios";  


const API = axios.create({
    baseURL:"http://localhost:5058/api", //allows connection between backend and frontend
    
});


//Attach JWT token
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export default API;