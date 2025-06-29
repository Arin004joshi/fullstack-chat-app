import { create } from "zustand"
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({

    // authUser: Represents the currently authenticated user. Initially null, which means no user is logged in.
    authUser: null,

    isSigningUp : false,
    isLoggingIn : false,
    isUpdatingProfile : false,

    // isCheckingAuth: A boolean flag to indicate whether the app is currently verifying if a user is logged in (e.g. checking tokens, fetching user data). Initially true.
    // While this check happens, the app shows a loading spinner.
    isCheckingAuth: true,
}));    