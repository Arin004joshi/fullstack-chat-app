import { create } from "zustand"
import { axiosInstance } from "../lib/axios";
import toast, { Toaster } from "react-hot-toast";
import { io } from "socket.io-client"

const baseURL = "http://localhost:5001";

export const useAuthStore = create((set, get) => ({

    // authUser: Represents the currently authenticated user. Initially null, which means no user is logged in.
    authUser: null,

    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    // isCheckingAuth: A boolean flag to indicate whether the app is currently verifying if a user is logged in (e.g. checking tokens, fetching user data). Initially true.
    // While this check happens, the app shows a loading spinner.
    isCheckingAuth: true,

    onlineUsers: [],
    socket: null,

    // we need a function to check the authentication of the user when they refreshes the browser; we already have an endpoint to do the check
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            console.log("✅ Auth success:", res.data);
            set({ authUser: res.data });
            get().connectSocket();
        } catch (error) {
            console.log("❌ Auth failed. Setting authUser to null");
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signUp: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully");
            get().connectSocket();
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
            throw error;
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message || "login failed");
            throw error;
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
            get().disconnectSocket();
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "logout failed");
            throw error;
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "profile-update failed");
            throw error;
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: async () => {
        // if user not authetnticated or the socket is already connected then do not connect
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(baseURL, {
            query: {
                userId: authUser._id,
            },
        });
        socket.connect();

        set({ socket: socket })

        socket.on("getOnlineusers",(userIds)=>{
            set({onlineUsers:userIds});
        });
    },
    disconnectSocket: async () => {
        if (get().socket?.connected) get().socket.disconnect()
    }
}));    