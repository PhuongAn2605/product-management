import React, { useRef, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import InputForm from "../components/input/Input.component";
import ButtonForm from "../components/button/Button.comonent";
import { fetchLoginStart, fetchSignup } from "../redux/auth/auth.actions";
import Header from "../components/header/Header.component";

import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

const ErrorTextStyle = styled.div`
  color: red;
`;

const SignUp = ({
  token,
  onChange,
  avatar,
  login,
  signup,
  isLoggedIn,
  error,
}) => {
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const passwordRef = useRef(null);

  const signupHandler = (userName, password) => {
    signup(userName, password);
    // if (isLoggedIn) {
    //   alert();
    navigate("/");
    // }
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
        />
        <InputForm
          id="password"
          name="Password"
          type="password"
          ref={passwordRef}
          onChange={(e) => (passwordRef.current.value = e.currentTarget.value)}
        />

        <HorizontalRuleIcon fontSize="large" color="action" />
        <HorizontalRuleIcon fontSize="large" color="disabled" />
        <HorizontalRuleIcon fontSize="large" color="warning" />
        <HorizontalRuleIcon fontSize="large" color="error" />



        {/* { error && <ErrorTextStyle>{error}</ErrorTextStyle>} */}
        <ButtonForm
          title="Sign Up"
          action={() =>
            signupHandler(nameRef.current.value, passwordRef.current.value)
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
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
