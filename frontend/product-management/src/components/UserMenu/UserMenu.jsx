import * as React from "react";
import isEmpty from "is-empty";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  fetchLoginStart,
  fetchLogoutStart,
} from "../../redux/auth/auth.actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router";

const UserMenu = ({ userName, logout, isLoggedIn, error }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [errors, setErrors] = React.useState(error);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();
  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(isLoggedIn);
  if (isEmpty(userName) && isLoggedIn) {
    userName = JSON.parse(localStorage.getItem("userData")).userName;
  }

  const logoutHandler = () => {
    logout();
    localStorage.removeItem("userData");

    if (isEmpty(errors)) {
      navigate("/login");
    } else {
      setErrors(error);
      console.log(errors);
    }
  };

  return (
    <React.Fragment>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{ color: "#aaa" }}
      >
        {userName}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem> */}
        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </Menu>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  userName: state.auth.userName,
  isLoggedIn: state.auth.isLoggedIn,
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(fetchLogoutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
