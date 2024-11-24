import { useState } from "react"
import { endpoints } from "../config/config"

const useRegexOptions = () => {
    const fetchRegex = async (token) => {
        try {    
            const response = await fetch(endpoints.fetchRegex, {
                method: "GET",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json()
            return data
        } catch (error) {
            console.error("Failed to fetch regex:", error)
        }
    }

    const saveRegex = async (regex, token) => {
        try {
            const response = await fetch(endpoints.saveRegex, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ regEx: regex })
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            // ADD A RETRUN FUNCTION THAT WOULD SAY THAT THE REGEX IS SAVED
        } catch (error) {
            console.error("Failed to save regex:", error);
            throw error;
        }
    };
    

    return { fetchRegex, saveRegex }
}

export default useRegexOptions