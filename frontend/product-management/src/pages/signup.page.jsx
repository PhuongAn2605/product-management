import React, { useRef, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import isEmpty from "is-empty";
import { ThemeProvider } from "@mui/material/styles";

import InputForm from "../components/input/Input.component";
import ButtonForm from "../components/button/Button.component";
import {
  theme,
  ErrorTextStyle,
  PasswordButtonStyle,
  TextHeaderStyle,
  AuthPageStyle
} from "./utils.styles";

import {
  fetchLoginStart,
  fetchSignup,
  setErrorConfirmPassword,
} from "../redux/auth/auth.actions";

import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

const PasswordText = styled.p`
  margin-right: auto;
`;

const SignUp = ({
  token,
  onChange,
  avatar,
  login,
  signup,
  isLoggedIn,
  error,
  checkPasswordUnique,
  setErrorConfirmPassword,
}) => {
  const [passwordLevel, setPasswordLevel] = useState(0);
  const [isCheckLength, setIsCheckLength] = useState(false);
  const [isCheckLetter, setIsCheckLetter] = useState(false);
  // const [isUnique, setIsUnique] = useState(false);
  const [errors, setErrors] = useState(error);

  // console.log(errors);

  const navigate = useNavigate();

  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const signupHandler = async (userName, password, confirmPassword) => {
    console.log(userName, password, confirmPassword);

    if (password !== confirmPassword) {
      const err = "Confirm password not match!";
      setErrors(err);
      return;
    }

    if (isCheckLength && isCheckLetter) {
      signup(userName, password);
      if (!isEmpty(error)) {
        setErrors(error);
        return;
      }
    } else {
      const err =
        "Password must be in length 8-15, contain at least one uppercase, lowercase, number and special character!";
      setErrors(err);
      return;
    }

    navigate("/");
  };

  const onChangePasswordHandler = (e) => {
    passwordRef.current.value = e.currentTarget.value;
    let passwordValue = passwordRef.current.value;
    // console.log(passwordValue);
    if (passwordValue.match(/^.{8,15}$/)) {
      // setPasswordLevel((prev) => prev + 1);
      setIsCheckLength(true);
    } else {
      setIsCheckLength(false);
    }

    if (
      passwordValue.match(
        /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s)/
      )
    ) {
      setIsCheckLetter(true);
    } else {
      setIsCheckLetter(false);
    }

    if (isCheckLength && isCheckLetter) {
      setPasswordLevel(2);
    } else if (
      (isCheckLetter && !isCheckLength) ||
      (!isCheckLetter && isCheckLength)
    ) {
      setPasswordLevel(1);
    } else {
      setPasswordLevel(0);
    }
  };

  return (
    <AuthPageStyle>
      <TextHeaderStyle>Create an account</TextHeaderStyle>
      <form className="sign-up">
        <InputForm
          id="userName"
          name="User Name"
          type="text"
          ref={nameRef}
          onChange={(e) => (nameRef.current.value = e.currentTarget.value)}
          icon={<PermIdentityOutlinedIcon />}
        />
        <InputForm
          id="password"
          name="Password"
          type="password"
          ref={passwordRef}
          onChange={(e) => onChangePasswordHandler(e)}
          icon={<VpnKeyIcon />}
        />

        <InputForm
          id="confirm-password"
          name="Confirm Password"
          type="password"
          ref={confirmPasswordRef}
          onChange={(e) =>
            (confirmPasswordRef.current.value = e.currentTarget.value)
          }
          icon={<VpnKeyIcon />}
        />
        {!isEmpty(errors) ? (
          <ErrorTextStyle>{errors.toString()}</ErrorTextStyle>
        ) : (
          <div></div>
        )}

        <PasswordButtonStyle>
          <PasswordText>Password level</PasswordText>
          <div>
            <HorizontalRuleIcon
              fontSize="large"
              color={passwordLevel > 0 ? "warning" : "disabled"}
            />
            <HorizontalRuleIcon
              fontSize="large"
              color={passwordLevel > 1 ? "warning" : "disabled"}
            />
          </div>
        </PasswordButtonStyle>

        <PasswordButtonStyle>
          <ThemeProvider theme={theme}>
            <ButtonForm
              title="Sign Up"
              variant="contained"
              action={() =>
                signupHandler(
                  nameRef.current.value,
                  passwordRef.current.value,
                  confirmPasswordRef.current.value
                )
              }
            />
          </ThemeProvider>
          <ButtonForm
            title="Login"
            type="button"
            variant="outlined"
            action={() => navigate("/login")}
          />
        </PasswordButtonStyle>
      </form>
    </AuthPageStyle>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isLoggedIn: state.auth.isLoggedIn,
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch) => ({
  signup: (userName, password) => dispatch(fetchSignup(userName, password)),
  login: (userName, token) => dispatch(fetchLoginStart(userName, token, null)),
  setErrorConfirmPassword: (error) => dispatch(setErrorConfirmPassword(error)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
