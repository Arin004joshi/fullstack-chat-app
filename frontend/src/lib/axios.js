import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5001/api",

    // to send cookies after every request
    withCredentials: true,
})