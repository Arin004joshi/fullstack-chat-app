import axios from "axios"

export const axiosInstance = axios.create({

    // dev : localhost, prod : api
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",

    // to send cookies after every request
    withCredentials: true,
})