import "./App.css";
import Header from "./components/header/Header.component";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login.page";
import Signup from "./pages/signup.page";
import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchLoginStart, fetchLogoutStart } from "./redux/auth/auth.actions";
import MyHome from "./pages/my-home";
import { useNavigate } from 'react-router-dom';
import EditProductPage from "./pages/product/EditProduct";
import { fetchProductStart } from "./redux/product/product.actions";

let logoutTimer;
const App = ({ login, logout, token, tokenExpirationDate, isLoggedIn, fetchProducts }) => {

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (token && tokenExpirationDate) {
  //     const remainingTime =
  //       tokenExpirationDate.getTime() - new Date().getTime();
  //     logoutTimer = setTimeout(logout, remainingTime);
  //   } else {
  //     clearTimeout(logoutTimer);
  //   }
  // }, [token, logout, tokenExpirationDate]);

  // useEffect(() => {
  //   const storedData = JSON.parse(localStorage.getItem("userData"));
  //   if (
  //     storedData &&
  //     storedData.token &&
  //     new Date(storedData.expiration) > new Date()
  //   ) {
  //     login(
  //       storedData.userName,
  //       storedData.token,
  //       new Date(storedData.expiration)
  //     );
  //   }
  // }, [login]);

  return (
    <div className="App">
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={ isLoggedIn ? <MyHome /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/edit/:pid" element={<EditProductPage />} />

      </Routes>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  login: (userName, token, expirationDate) =>
    dispatch(fetchLoginStart(userName, token, expirationDate)),
  logout: () => dispatch(fetchLogoutStart()),
  fetchProducts: () => dispatch(fetchProductStart())
});

const mapStateToProps = (state) => ({
  token: state.auth.token,
  tokenExpirationDate: state.auth.tokenExpirationDate,
  isLoggedIn: state.auth.isLoggedIn
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
