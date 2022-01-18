import React, { useState } from "react";
import InputForm from "../components/input/Input.component";
import ButtonForm from "../components/button/Button.component";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchLoginStart } from "../redux/auth/auth.actions";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { ThemeProvider } from "@mui/material/styles";

import isEmpty from "is-empty";

import {
  theme,
  ErrorTextStyle,
  PasswordButtonStyle,
  TextHeaderStyle,
  AuthPageStyle,
} from "./utils.styles";

const Login = ({ login, isLoggedIn, error }) => {
  const [userNameValue, setUserNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errors, setErrors] = useState(error);

  const navigate = useNavigate();

  const changeEmailInputHandler = (e) => {
    setUserNameValue(e.currentTarget.value);
  };
  const changePasswordInputHandler = (e) => {
    setPasswordValue(e.currentTarget.value);
  };

  const loginHandler = (userName, password) => {
    login(userName, password);

    if (!isEmpty(error)) {
      setErrors(error);
      return;
    }else{
      navigate("/");
    }
  };

  return (
    <AuthPageStyle>
      <TextHeaderStyle>Login</TextHeaderStyle>
      <form className="login">
        <InputForm
          id="userName"
          name="User Name"
          type="text"
          value={userNameValue}
          onChange={(e) => changeEmailInputHandler(e)}
          icon={<PermIdentityOutlinedIcon />}
        />
        <InputForm
          id="password"
          name="Password"
          type="password"
          value={passwordValue}
          onChange={(e) => changePasswordInputHandler(e)}
          icon={<VpnKeyIcon />}
        />

        {!isEmpty(errors) && (
          <ErrorTextStyle>{errors.toString()}</ErrorTextStyle>
        )}

        <PasswordButtonStyle>
          <ThemeProvider theme={theme}>
            <ButtonForm
              title="Login"
              variant="contained"
              action={() => loginHandler(userNameValue, passwordValue)}
            />
          </ThemeProvider>
          <ButtonForm
            title="Sign Up"
            type="button"
            variant="outlined"
            action={() => navigate("/signup")}
          />
        </PasswordButtonStyle>
        {/* <ButtonForm title="Login" type="submit" action={() => loginHandler(userNameValue, passwordValue)}/> */}
      </form>
    </AuthPageStyle>
  );
};

const mapDispatchToProps = (dispatch) => ({
  login: (userNameValue, passwordValue) =>
    dispatch(fetchLoginStart(userNameValue, passwordValue)),
});

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  error: state.auth.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
