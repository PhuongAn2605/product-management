import React, { useRef, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import InputForm from "../components/input/Input.component";
import ButtonForm from "../components/button/Button.comonent";
import {
  fetchCheckPasswordStart,
  fetchLoginStart,
  fetchSignup,
  setPasswordLevel,
} from "../redux/auth/auth.actions";
import Header from "../components/header/Header.component";

import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

const ErrorTextStyle = styled.div`
  color: red;
`;

const PasswordStyle = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: auto;
`;

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
  checkPasswordUnique
}) => {
  const [passwordLevel, setPasswordLevel] = useState(0);
  const [isCheckLength, setIsCheckLength] = useState(false);
  const [isCheckLetter, setIsCheckLetter] = useState(false);
  const [isUnique, setIsUnique] = useState(false);

  console.log(passwordLevel);

  const navigate = useNavigate();

  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const signupHandler = async (userName, password) => {
    console.log(userName, password);
    await signup(userName, password);
    // if (!isEmpty(error)) {
    //   navigate("/signup");
    // }else{
    //   navigate('/');
    // }
    navigate("/");
  };

  const onChangePasswordHandler = (e) => {
    passwordRef.current.value = e.currentTarget.value;
    let passwordValue = passwordRef.current.value;
    // console.log(passwordValue);
    // console.log("passwordValue: ", passwordValue);
    if (passwordValue.match(/^.{8,15}$/) && !isCheckLength) {
      setPasswordLevel((prev) => prev + 1);
      setIsCheckLength(true);
      // console.log(passwordLevel);
      // console.log("passwordLevel length: ", passwordLevel);

    }

    if (
      passwordValue.match(
        /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s)/) && !isCheckLetter
    ) {
      console.log("passwordLevel: ", passwordLevel);

      setPasswordLevel((prev) => prev + 1);
      setIsCheckLetter(true);
      // console.log("passwordLevel letter: ", passwordLevel);
    }

    checkPasswordUnique(passwordValue);




  };

  return (
    <React.Fragment>
      <Header />
      <form className="sign-up">
        <InputForm
          id="name"
          name="Name"
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

        <PasswordStyle>
          <PasswordText>Password level</PasswordText>
          <div>
            <HorizontalRuleIcon fontSize="large" color={passwordLevel > 0 ? "warning" : "disabled"} />
            <HorizontalRuleIcon fontSize="large" color={passwordLevel > 1 ? "warning" : "disabled"} />
            <HorizontalRuleIcon fontSize="large" color={passwordLevel === 3 ? "warning" : "disabled"} />
          </div>
        </PasswordStyle>

        {error && <ErrorTextStyle>{error}</ErrorTextStyle>}
        <ButtonForm
          title="Sign Up"
          action={() =>
            signupHandler(
              nameRef.current.value,
              passwordRef.current.value,
              confirmPasswordRef.current.value
            )
          }
        />
      </form>
    </React.Fragment>
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
  setPasswordLevel: (passwordLevel) =>
    dispatch(setPasswordLevel(passwordLevel)),
  checkPasswordUnique: (password) => dispatch(fetchCheckPasswordStart(password))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
