import { useCallback, useEffect, useState } from "react";

async function sendRequest(url, config) {
    let response = await fetch(url, config);
    let resData = await response.json();
    if (!response.ok) {
        throw new Error(resData.message || 'Something went wrong! Unable to send request');
    }

    return resData;
}

export default function useHttp(url, config, initialDataState) {
    const [data, setData] = useState(initialDataState);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    function clearData() {
        setData(initialDataState);
    }

    const sendHttpRequest = useCallback(async function sendHttpRequest(dataToSend) {
        try {
            setIsLoading(true);
            const resData = await sendRequest(url, {...config, body: dataToSend});
            setData(resData);
        } catch (err) {
            setError(err.message || 'Something went wrong');
        }
        setIsLoading(false);
    }, [url, config]);

    // to handle get request
    if ((config && (config.method === "GET" || !config.method)) || !config) {
        useEffect(() => {
            sendHttpRequest();
        }, [sendHttpRequest]);
    }

    return {
        data,
        isLoading,
        error,
        sendHttpRequest,
        clearData
    }

}