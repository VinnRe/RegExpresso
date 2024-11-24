import { endpoints } from "../config/config";

const useTuples = () => {
    const getTuples = async (regex) => {
        try {
            const response = await fetch(endpoints.tuples, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    regEx: regex 
                })
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
    
            const data = await response.json()
            console.log("Tuples Data: ", data)
            return data
        } catch (error) {
            console.error("Error Receiving Tuples: ", error)
        }
    }

    return { getTuples }
}

export default useTuples