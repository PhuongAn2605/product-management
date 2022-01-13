import AuthTypes from "./auth.types";


export const logoutAction = () => ({
    type: AuthTypes.LOGOUT
});

export const fetchSignup = ( userName, password ) => ({
    type: AuthTypes.SIGN_UP_START,
    payload: {
        userName, 
        password
    }
});

export const fetchSignupSuccess = result => ({
    type: AuthTypes.SIGN_UP_SUCCESS,
    payload: result
});

export const fetchSignupFailure = error => ({
    type: AuthTypes.SIGN_UP_FAILURE,
    payload: error
});

export const fetchLoginStart = (userName, password) => ({
    type: AuthTypes.LOGIN_START,
    payload: {
        userName,
        password
    }
});

export const fetchLoginSuccess = result => ({
    type: AuthTypes.LOGIN_SUCCESS,
    payload: result
});

export const fetchLoginFailure = error => ({
    type: AuthTypes.LOGIN_FAILURE,
    payload: error
});

export const fetchLogoutStart = () => ({
    type: AuthTypes.LOGOUT_START
});

export const fetchLogoutSuccess = () => ({
    type: AuthTypes.LOGOUT_SUCCESS
});

export const fetchLogoutFailure = () => ({
    type: AuthTypes.LOGOUT_FAILURE
});





