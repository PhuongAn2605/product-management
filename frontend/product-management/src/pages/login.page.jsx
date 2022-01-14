import React, { useState } from "react";
import InputForm from "../components/input/Input.component";
import ButtonForm from "../components/button/Button.comonent";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchLoginStart } from "../redux/auth/auth.actions";
import Header from '../components/header/Header.component';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import VpnKeyIcon from '@mui/icons-material/VpnKey';


const Login = ({ login }) => {
  const [userNameValue, setUserNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const navigate = useNavigate();

  const changeEmailInputHandler = (e) => {
    // console.log(e.currentTarget.value)
    setUserNameValue(e.currentTarget.value);
  };
  const changePasswordInputHandler = (e) => {
    setPasswordValue(e.currentTarget.value);
  };

  const loginHandler = (userName, password) => {
    login(userName, password);
    navigate('/');
  }

  return (
    <React.Fragment>
      <Header />
      <form >
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

      <ButtonForm title="Login" type="submit" action={() => loginHandler(userNameValue, passwordValue)}/>
    </form>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  login: (userNameValue, passwordValue ) => dispatch(fetchLoginStart(userNameValue, passwordValue)),
})

export default connect(null, mapDispatchToProps)(Login);
