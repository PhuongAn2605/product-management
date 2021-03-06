import { useCallback, useEffect, useState } from "react";

let logoutTimer;

export const useAuth = () => {
    const [token, setToken] = useState(false);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
    const [userId, setUserId] = useState(false);

    const login = useCallback((userId, token, expirationDate) => {
        setToken(token);
        setUserId(userId);
        const tokenExpirationDate = new Date().getTime() + 1000*60*60;
        setTokenExpirationDate(tokenExpirationDate);

        localStorage.setItem(
            'userData',
            JSON.stringify({
                userId,
                token,
                expiration: tokenExpirationDate.toISOString()
            })
        )
    },[]);

    const logout = useCallback(() => {
        setToken(null);
        setTokenExpirationDate(null);
        setUserId(null);
        localStorage.removeItem('userData');
        localStorage.removeItem('visitHouse');
    }, []);

    useEffect(() => {
        if(token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        }else{
            clearTimeout(logoutTimer);
        }
    },[token, tokenExpirationDate, logout]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if(storedData && storedData.token && new Date(storedData.expiration) > new Date()){
            login(storedData.userId, storedData.token, new Date(storedData.expiration));
        }
    },[login]);
    return { token, login, logout, userId };
}