import React, { createContext, useState, useEffect } from "react";
import { endpoints } from "../config/config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    // useEffect(() => {
    //     if (token) {
    //         fetch(endpoints.login, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${token}`
    //             },
    //         })
    //             .then((res) => res.json())
    //             .then((data) => {
    //                 if (data.success) {
    //                     setUser(data.user);
    //                 } else {
    //                     handleLogout();
    //                 }
    //             })
    //             .catch(() => handleLogout())
    //     }
    // }, [token])

    const handleLogin = async (username, password) => {
        try {
            const response = await fetch(endpoints.login, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ username, password }),
            })

            const data = await response.json()
            console.log("Login Data: ", data)
            if (response.ok) {
                setToken(data.token)
                setUser(data.user)
                localStorage.setItem('token', data.token)
                return true
            } else {
                throw new Error(data.message)
            }
        } catch (error) {
            console.error('Login Failed: ', error.message)
            return false
        }
    }
    
    const handleSignup = async (username, email, password) => {
        try {
            const response = await fetch(endpoints.signup, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ username, email, password }),
            })

            const data = await response.json()
            if (response.ok) {
                setToken(data.token)
                setUser(data.user)
                localStorage.setItem('token', data.token)
                return true
            } else {
                throw new Error(data.message)
            }
        } catch (error) {
            console.error('Signup Failed: ', error.message)
            return false
        }
    }

    const handleLogout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem('token')
    }

    return (
        <AuthContext.Provider value={{ user, token, handleLogin, handleSignup, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => React.useContext(AuthContext)