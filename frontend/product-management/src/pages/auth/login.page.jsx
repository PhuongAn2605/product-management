import React, { useState } from "react";
import InputForm from "../../components/input/Input.component";
import ButtonForm from "../../components/button/Button.component";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchLoginStart } from "../../redux/auth/auth.actions";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { ThemeProvider } from "@mui/material/styles";
import UserImage from "../../images/user.png";
import KeyImage from "../../images/key.png";
import "./custom.css";

import isEmpty from "is-empty";

import {
  theme,
  ErrorTextStyle,
  PasswordButtonStyle,
  TextHeaderStyle,
  AuthPageStyle,
  LeftItemsStyle,
  RightItemsStyle,
} from "../utils.styles";
import LeftItem from "./LeftItem";
import TitleItem from "./TitleItem";
import AuthInputForm from "./AuthInputForm";

const Login = ({ login, isLoggedIn, error }) => {
  const [userNameValue, setUserNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errors, setErrors] = useState(error);

  const navigate = useNavigate();

  const changeNameInputHandler = (e) => {
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
    } else {
      navigate("/");
    }
  };

  return (
    <AuthPageStyle>
      <LeftItem />
      <RightItemsStyle>
        <TitleItem targetAction="Login" />
        <form className="login">
          <AuthInputForm
            image={UserImage}
            placeholder="User Name"
            type="text"
            onChange={(e) => changeNameInputHandler(e)}
          />
          <AuthInputForm
            image={KeyImage}
            placeholder="Password"
            type="password"
            onChange={(e) => changePasswordInputHandler(e)}
          />

          {/* <InputForm
            id="userName"
            name="User Name"
            type="text"
            value={userNameValue}
            onChange={(e) => changeEmailInputHandler(e)}
            icon={<PermIdentityOutlinedIcon />}
          /> */}
          {/* <InputForm
            id="password"
            name="Password"
            type="password"
            value={passwordValue}
            onChange={(e) => changePasswordInputHandler(e)}
            icon={<VpnKeyIcon />}
          /> */}

          {!isEmpty(errors) && (
            <ErrorTextStyle>{errors.toString()}</ErrorTextStyle>
          )}

          <PasswordButtonStyle>
            <ThemeProvider theme={theme}>
              <ButtonForm
                title="Login"
                variant="contained"
                style={{ color: "#fff", border: "1px solid #fff" }}
                action={() => loginHandler(userNameValue, passwordValue)}
              />
            </ThemeProvider>
            <ButtonForm
              title="Sign Up"
              type="button"
              variant="outlined"
              style={{ color: "#fff", border: "1px solid #fff" }}
              action={() => navigate("/signup")}
            />
          </PasswordButtonStyle>
        </form>
      </RightItemsStyle>
    </AuthPageStyle>
  );
};

const mapDispatchToProps = (dispatch) => ({
  login: (userNameValue, passwordValue) =>
    dispatch(fetchLoginStart(userNameValue, passwordValue, null)),
});

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  error: state.auth.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
