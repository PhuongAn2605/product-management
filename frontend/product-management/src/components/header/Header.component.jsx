import { Button } from "@mui/material";
import React from "react";
import { connect } from "react-redux";

import { NavLink } from "react-router-dom";
import { setLogInMode, setSignupMode } from "../../redux/auth/auth.actions";
import UserMenu from "../UserMenu/UserMenu";

import { HeaderStyle, LeftHeaderItem, RightHeaderItem } from "./Header.styles";

const Header = ({ logout, isLoggedIn, setLogInMode, setSignupMode, isLogInMode, isSignupMode }) => {
  // console.log(isLoggedIn);
  let activeStyle = {
    textDecoration: "underline",
  };

  return (
    <HeaderStyle className="header">
      <LeftHeaderItem>Home page</LeftHeaderItem>
      {!isLoggedIn ? (
        <RightHeaderItem>
         <NavLink
            to="/login"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            onClick={() => setSignupMode()}
          >
            Login / 
          </NavLink>
          <NavLink
            to="/signup"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            onClick={() => setLogInMode()}
          >
            Sign up
          </NavLink>
        </RightHeaderItem>
      ) : (
          <UserMenu />
      )}
    </HeaderStyle>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  isLogInMode: state.auth.isLogInMode,
  isSignupMode: state.auth.isSignupMode
});

const mapDispatchToProps = dispatch => ({
  setLogInMode: () => dispatch(setLogInMode()),
  setSignupMode: () => dispatch(setSignupMode())
})



export default connect(mapStateToProps, mapDispatchToProps)(Header);
