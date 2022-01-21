import AuthTypes from "./auth.types";
import { login } from "./auth.utils";
import { useNavigate } from "react-router-dom";

const INITIAL_STATE = {
  isLoggedIn: false,
  userName: null,
  token: null,
  tokenExpirationDate: null,
  error: null,
  isLogInMode: true,
  isSignupMode: false,
  password: null,
  products: []
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthTypes.SIGN_UP_SUCCESS:
      const { userName, token } = action.payload;

      return {
        ...state,
        isLoggedIn: true,
        userName: action.payload.userName,
        token: action.payload.token,
        tokenExpirationDate: login(userName, token),
        error: null,
      };

    case AuthTypes.SIGN_UP_FAILURE:
      // console.log(action.payload);
      return {
        ...state,
        isLoggedIn: false,
        // isLoggedInMode: false,
        error: action.payload,
      };

    case AuthTypes.LOGIN_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
        userName: action.payload.userName,
        password: action.payload.password,
        error: null,
        tokenExpirationDate: login(
          action.payload.userName,
          action.payload.password,
          action.payload.token,
          action.payload.expirationDate
        ),
        // products: action.payload.products
      };


    case AuthTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        // isLoggedInMode: true,
        error: action.payload,
      };

    case AuthTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        // isLoggedInMode: true,
        error: null,
        token: null,
        tokenExpirationDate: null,
        userId: null,
      };

    case AuthTypes.LOGOUT_FAILURE:
      return {
        ...state,
        // isLoggedInMode: true
      };

    case AuthTypes.SET_LOGIN_MODE:
      return {
        ...state,
        isLogInMode: true,
        isSignupMode: false,
      };
    case AuthTypes.SET_SIGNUP_MODE:
      return {
        ...state,
        isSignupMode: true,
        isLogInMode: false,
      };

    case AuthTypes.CHECK_PASSWORD_SUCCESS:
      return {
        ...state,
        password: action.payload,
        error: null,
      };
    case AuthTypes.CHECK_PASSWORD_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case AuthTypes.SET_ERROR_CONFIRM_PASSWORD:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
