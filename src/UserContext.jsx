import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import API from "./Api";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchUser = async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            setLoading(false);
            return;
        }
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const response = await API.get(`/api/onboard/user/${decoded.userid}`);
                setUser(response.data);
            } catch (error) {
                console.error("User session expired, logging out.", error);
                logout();
            } finally {
                setLoading(false);
            }
        }
    };
    const logout = async () => {
        try {
            await API.post("/api/onboard/logout");
            localStorage.removeItem("accessToken");
            setUser(null); // Clear user state
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error.response?.data?.message || error.message);
        }
    };
    useEffect(() => {
        console.log("UserProvider mounted, calling fetchUser");
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
