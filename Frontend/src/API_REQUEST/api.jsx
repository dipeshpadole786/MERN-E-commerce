import axios from "axios"

export const api = axios.create({
    baseURL: "https://mern-e-commerce-1-njzx.onrender.com", // your backend port
});
