import { useState,useCallback } from "react";

export const useHttp =()=>{
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(null);
    const reqest = useCallback(async (url, method = 'GET', body= null, headers ={'Content-Type':'application/json'})=>{
        
        setLoading(true);
        try {
            const response = await fetch(url, {method,body,headers});
            if(!response.ok){
                throw new Error(`Not fetch ${url}, status: ${response.status}`);
            }
            const data = await response.json();
            setLoading(false);
            return data;
        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);
    const clearError = useCallback(()=>setError(null),[]);
    return {loading,reqest,error,clearError}
}