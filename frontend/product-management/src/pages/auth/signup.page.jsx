import React, { useRef, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import isEmpty from "is-empty";
import { ThemeProvider } from "@mui/material/styles";

import InputForm from "../../components/input/Input.component";
import ButtonForm from "../../components/button/Button.component";
import {
  theme,
  ErrorTextStyle,
  PasswordButtonStyle,
  TextHeaderStyle,
  AuthPageStyle,
  RightItemsStyle,
} from "../utils.styles";

import {
  fetchLoginStart,
  fetchSignup,
  setErrorConfirmPassword,
} from "../../redux/auth/auth.actions";

import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LeftItem from "./LeftItem";
import TitleItem from "./TitleItem";
import AuthInputForm from "./AuthInputForm";
import UserImage from "../../images/user.png";
import KeyImage from "../../images/key.png";

const PasswordText = styled.p`
  margin-right: auto;
  color: #fff;
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
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  // const nameRef = useRef(null);
  // const passwordRef = useRef(null);
  // const confirmPasswordRef = useRef(null);

  const signupHandler = async (userName, password, confirmPassword) => {
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

    navigate("/login");
  };

  const onChangePasswordHandler = (e) => {
    // passwordRef.current.value = e.currentTarget.value;
    // let passwordValue = passwordRef.current.value;
    setPassword(e.currentTarget.value);
    if (password.match(/^.{8,15}$/)) {
      setIsCheckLength(true);
    } else {
      setIsCheckLength(false);
    }

    if (
      password.match(
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
      <LeftItem />
      <RightItemsStyle>
        <TitleItem targetAction="Sign-up" />
        <form className="sign-up">
          <AuthInputForm
            image={UserImage}
            placeholder="User Name"
            type="text"
            onChange={(e) => setUserName(e.currentTarget.value)}
          />
          <AuthInputForm
            image={KeyImage}
            placeholder="Password"
            type="password"
            onChange={(e) => onChangePasswordHandler(e)}
          />

          <AuthInputForm
            image={KeyImage}
            placeholder="Confirm password"
            type="password"
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
          />

          {/* <InputForm
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
        /> */}
          {!isEmpty(errors) ? (
            <ErrorTextStyle>{errors.toString()}</ErrorTextStyle>
          ) : (
            <div></div>
          )}

          <PasswordButtonStyle>
            <PasswordText>Password strength</PasswordText>
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
                style={{ color: "#fff", border: "1px solid #fff" }}
                action={() =>
                  signupHandler(userName, password, confirmPassword)
                }
              />
            </ThemeProvider>
            <ButtonForm
              title="Login"
              type="button"
              variant="outlined"
              style={{ color: "#fff", border: "1px solid #fff" }}
              action={() => navigate("/login")}
            />
          </PasswordButtonStyle>
        </form>
      </RightItemsStyle>
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
