export const login = (userName, token, expirationDate) => {

    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000*60*60);

    localStorage.setItem(
        'userData',
        JSON.stringify({
            userName,
            token,
            expiration: tokenExpirationDate.toISOString(),
        })
    );

    return tokenExpirationDate;
};