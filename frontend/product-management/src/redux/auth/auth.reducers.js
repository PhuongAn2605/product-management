import AuthTypes from "./auth.types";
import { login } from "./auth.utils";
import { useNavigate } from "react-router-dom";


const INITIAL_STATE = {
  isLoggedIn: false,
  userName: null,
  token: null,
  tokenExpirationDate: null,
  error: null
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
        error: null
      }

    case  AuthTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        error: action.payload
      }

    case AuthTypes.LOGIN_SUCCESS:
      // const { userName, token, expirationDate } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
        userName: action.payload.userName,
        tokenExpirationDate: login(userName, token, action.payload.expirationDate),
      };

    case AuthTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        error: action.payload
      }

    case AuthTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        tokenExpirationDate: null,
        userId: null,
      };

    case AuthTypes.LOGOUT_FAILURE:
      return {
        ...state
      }

    default:
      return state;
  }
};

export default authReducer;
