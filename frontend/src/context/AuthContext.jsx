import React, { createContext, useState, useEffect } from "react";
import { endpoints } from "../config/config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const handleLogin = async (username, password) => {
        try {
            const response = await fetch(endpoints.login, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            console.log("Login Data: ", data);
            if (response.ok) {
                setToken(data.token);
                setUser(data.user);
                localStorage.setItem('token', data.token);
                return true;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Login Failed: ', error.message);
            return false;
        }
    };

    const handleSignup = async (username, email, password) => {
        try {
            const response = await fetch(endpoints.signup, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                setToken(data.token);
                setUser(data.user);
                localStorage.setItem('token', data.token);
                return true;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Signup Failed: ', error.message);
            return false;
        }
    };

    const handleLogout = async () => {
        try {
            await fetch(endpoints.logout, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            setUser(null);
            setToken(null);
            localStorage.removeItem('token');
        } catch (error) {
            console.error("Error Logging Out: ", error);
        }
    };

    const checkUsernameExists = async (username) => {
        try {
            const response = await fetch(`${endpoints.checkUsername}?username=${username}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const data = await response.json();
                return data.exists;
            } else {
                console.error("Failed to check username existence.");
                return false;
            }
        } catch (error) {
            console.error("Error checking username:", error);
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, handleLogin, handleSignup, handleLogout, checkUsernameExists }}>
            {children}
        </AuthContext.Provider>
    );
};

export const getUserData = async (token) => {
    if (!token) {
        console.error("No Token Found");
        return null;
    }
    try {
        const response = await fetch(endpoints.fetch, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.error("Failed to fetch user data");
            return null;
        }

        const data = await response.json();
        return data.username;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
};

export const useAuth = () => React.useContext(AuthContext);
