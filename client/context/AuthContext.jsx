import { useCallback, useEffect, useState } from "react";
import axios from 'axios'
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContextValue";

const envBackendUrl = import.meta.env.VITE_BACKEND_URL;
const productionBackendUrl = "https://vibe-chat-backend-amber.vercel.app";
const backendUrl = import.meta.env.PROD
    ? (!envBackendUrl || envBackendUrl.includes("localhost") || envBackendUrl.includes("projects.vercel.app")
        ? productionBackendUrl
        : envBackendUrl)
    : (envBackendUrl || "http://localhost:5000");
const axiosInstance = axios.create({ baseURL: backendUrl });

axiosInstance.interceptors.request.use((config) => {
    const currentToken = localStorage.getItem("token");
    if (currentToken) {
        config.headers.token = currentToken;
        config.headers.Authorization = `Bearer ${currentToken}`;
    }
    return config;
});

export const AuthProvider = ({ children })=>{
    
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [authUser, setAuthUser] = useState(null);
    const[onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);

    //Connect socket function to handle socket connection and online users updates
    const connectSocket = useCallback((userData)=>{
         if(!userData || socket?.connected) return;
         const newSocket = io(backendUrl, {
            query: {
                userId: userData._id,
            }
         });
         newSocket.connect();
         setSocket(newSocket);

         newSocket.on("getOnlineUsers", (userIds)=>{
            setOnlineUsers(userIds);
         })
    }, [socket])

    //check if user is automaticated and if so, 
    // set the user data and connect the socket
    const checkAuth = useCallback(async() => {
        try {
         const { data } = await axiosInstance.get("/api/auth/check");
         if(data.success){
            setAuthUser(data.user)
            connectSocket(data.user)
         }
        } catch (error) {
            const status = error.response?.status;
            if (status === 401) {
                // No token or invalid token: clear auth state silently
                setAuthUser(null);
                setOnlineUsers([]);
                return;
            }
            const message = error.response?.data?.message || error.message;
            toast.error(message);
        }
    }, [connectSocket])


    //Login function to handle user authentication and socket connection
    const login = async(state, credentials)=>{
        try {
           const { data } = await axiosInstance.post(`/api/auth/${state}`, credentials);
           if(data.success){
            setAuthUser(data.userData);
            connectSocket(data.userData);
            setToken(data.token);
            localStorage.setItem("token", data.token);
            toast.success(data.message);
           }
           else{
            toast.error(data.message)
           } 
        } catch (error) {
            toast.error(error.message)
        }
    }

    //Logout function to handle user logout and socket disconnection
    const logout = async() =>{
        localStorage.removeItem("token");
        setToken(null);
        setAuthUser(null);
        setOnlineUsers([]);
        axios.defaults.headers.common["token"]=null;
        toast.success("Logged out successfully");
        socket?.disconnect();
    }


    //Update profile function to handle user profile updates
    const updateProfile = async (body)=>{
        try {
            const { data } = await axiosInstance.put("/api/auth/update-profile", body);
            if(data.success){
                setAuthUser(data.user);
                toast.success("Profile updated successfully")
                return true;
            } else {
                toast.error(data.message || "Unable to update profile")
                return false;
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            toast.error(message);
            return false;
        }
    }


    useEffect(()=>{
             if(token){
                queueMicrotask(() => {
                        checkAuth();
                })
             }
     },[token, checkAuth])

    const value = {
        axios: axiosInstance,
        authUser,
        onlineUsers,
        socket,
        login,
        logout,
        updateProfile
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}