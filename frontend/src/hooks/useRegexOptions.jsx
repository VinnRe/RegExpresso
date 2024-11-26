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

            console.log(response)

        } catch (error) {
            console.error("Failed to save regex:", error);
            throw error;
        }
    };

    const deleteRegex = async (regexId, token) => {
        try {
            const response = await fetch(endpoints.deleteRegex + regexId, {
                method: "DELETE",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                 },
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

        } catch (error) {
            console.error("Failed to delte regex: ", error)
            throw error
        }
    }
    

    return { fetchRegex, saveRegex, deleteRegex }
}

export default useRegexOptions