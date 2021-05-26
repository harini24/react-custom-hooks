import React, { useState } from 'react';
const useHttpRequest = (requestConfig,applyData) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendReq = async (taskText) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                requestConfig.url, {
                method: requestConfig.method,
                headers: requestConfig.headers,
                body: json.stringify(requestConfig.body)
            });

            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();

            applyData(data)
        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    };

    return {
        isLoading:isLoading,
        error:error, 
        sendReq:sendReq
    }
}
export default useHttpRequest