import axios from "axios"

export const api = axios.create({
    baseURL: "https://mern-e-commerce-2-9ab4.onrender.com", // your backend port
});
