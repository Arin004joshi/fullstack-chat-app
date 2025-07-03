import { create } from "zustand"
import { axiosInstance } from "../lib/axios";
import toast, { Toaster } from "react-hot-toast";

export const useAuthStore = create((set) => ({

    // authUser: Represents the currently authenticated user. Initially null, which means no user is logged in.
    authUser: null,

    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    // isCheckingAuth: A boolean flag to indicate whether the app is currently verifying if a user is logged in (e.g. checking tokens, fetching user data). Initially true.
    // While this check happens, the app shows a loading spinner.
    isCheckingAuth: true,

    // we need a function to check the authentication of the user when they refreshes the browser; we already have an endpoint to do the check
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            console.log("✅ Auth success:", res.data);
            set({ authUser: res.data });
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
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
            throw error;
        } finally {
            set({ isSigningUp: false });
        }
    },

    logout: async () => {
        try {
            const res = await axiosInstance.post("/auth/logout");
            toast.success("Logged out successfully");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
            throw error;
        }
    },
}));    