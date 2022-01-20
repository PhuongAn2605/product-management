import React, { useEffect } from "react";
import styled from "styled-components";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import SearchBarForm from "../components/search-bar/SearchBar";
import NavBar from "../components/nav-bar/NavBar.jsx";
import Item from "../components/item/Item";
import UserMenu from "../components/UserMenu/UserMenu";
import SideBar from "../components/sidebar/SideBar.jsx";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { openDialog } from "../redux/dialog/dialog-actions";
import { connect } from "react-redux";
import { red } from "@mui/material/colors";
import DialogFormAdd from "../components/dialog-add/DialogFormAdd.jsx";
import {
  setSearchByLocation,
  setSearchByName,
} from "../redux/product/product.actions";
import isEmpty from "is-empty";

const MyHomeStyle = styled.div`
  display: flex;
  flex-direction: row;
  height: 100% !important;
  width: 100% !important;
`;
const HeaderStyle = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1.5fr 4.2fr;
  align-items: center;
`;

const NavBarStyle = styled.div``;

const ItemsStyle = styled.div`
  margin: 1rem;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const WelcomeText = styled.div`
  text-transform: uppercase;
  font-weight: 1000;
  font-size: 20px;
  color: #3173a5;
`;

const SearchFormStyle = styled.div`
  margin-left: 1rem;
`;

const UserNameStyle = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const DisplayItemsStyle = styled.div`
  display: grid;
  grid-template-columns: 8fr 2fr;
  margin-top: 1rem;
`;

const SideBarStyle = styled.div`
  margin: 0.5rem;
`;

const ItemDetailStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: min-content;
  justify-content: center;
  align-items: flex-start;
`;

const SearchConditionStyle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  

  span:hover {
    background-color: #dae5ec;
  }
`;

const NormalSearchConditionStyle = styled.span`
  margin-top: 0.5rem;
    margin-right: 0.5rem;
    color: #3173a5;
    padding: 0.3rem 0.5rem;
    background-color: #fff;
    box-shadow: 0 3px 10px rgb(0 0 0 / 20%);
    cursor: pointer;
`

const ChoosedSearchConditionStyle = styled.span`
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  color: #3173a5;
  padding: 0.3rem 0.5rem;
  background-color: #dae5ec;
  box-shadow: 0 3px 10px rgb(0 0 0 / 20%);
  cursor: pointer;
`;

const AddDialogStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;
  margin-right: 28rem;

  padding: 0.5rem 1rem;
  background-color: #459add;
  border-radius: 30px;
  span {
    color: #fff;
    font-weight: 600;
    font-size: 18px;
    margin: 0 0.2rem;
  }
  :hover {
    cursor: pointer;
  }
`;

const MessageTextStyle = styled.div`
  color: green;
  font-weight: 600;
  text-align: center;
  font-size: 20px;
  margin: auto;
`;

const MyHome = ({
  openDialog,
  products,
  product,
  message,
  setSearchByName,
  setSearchByLocation,
  isSearchByName,
  isSearchByLocation,
  searchedProducts
}) => {

  console.log(products);
  // console.log(isSearchByName, isSearchByLocation);
  // useEffect(() => {
  //   fetchProducts();
  // }, [products, fetchProducts]);

  if(!isEmpty(searchedProducts) && searchedProducts.length > 0){
    products = [...searchedProducts];
  }

  return (
    <div>
      <MyHomeStyle>
        <NavBarStyle>
          <NavBar />
        </NavBarStyle>
        <ItemsStyle>
          <HeaderStyle>
            <WelcomeText>Welcome to my home</WelcomeText>
            <SearchFormStyle>
              <SearchBarForm />
              <SearchConditionStyle>
                {isSearchByName && !isSearchByLocation ? (
                  <ChoosedSearchConditionStyle
                    onClick={() => setSearchByName()}
                  >
                    Tên
                  </ChoosedSearchConditionStyle>
                ) : (
                  <NormalSearchConditionStyle id="search-name" onClick={() => setSearchByName()}>
                    Tên
                  </NormalSearchConditionStyle>
                )}
                {isSearchByLocation && !isSearchByName ? (
                  <ChoosedSearchConditionStyle
                    onClick={() => setSearchByLocation()}
                  >
                    Vị trí
                  </ChoosedSearchConditionStyle>
                ) : (
                  <NormalSearchConditionStyle
                    id="search-location"
                    onClick={() => setSearchByLocation()}
                  >
                    Vị trí
                  </NormalSearchConditionStyle>
                )}
              </SearchConditionStyle>
            </SearchFormStyle>
            <UserNameStyle>
              <PermIdentityOutlinedIcon />
              <UserMenu />
            </UserNameStyle>
          </HeaderStyle>
          <DialogFormAdd />
          <DisplayItemsStyle>
            <ItemDetailStyle>
              {!isEmpty(products) &&
                products.map((p) => (
                  <Item
                    key={p._id}
                    id={p._id}
                    imageUrl={`http://localhost:5000/${p.image}`}
                    productName={p.productName}
                    functions={p.functions}
                    description={p.description}
                  />
                ))}
            </ItemDetailStyle>
            <SideBarStyle>
              <SideBar />
            </SideBarStyle>
          </DisplayItemsStyle>
        </ItemsStyle>
      </MyHomeStyle>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  openDialog: () => dispatch(openDialog()),
  setSearchByName: () => dispatch(setSearchByName()),
  setSearchByLocation: () => dispatch(setSearchByLocation()),
});

const mapStateToProps = (state) => ({
  products: state.product.products,
  product: state.product.product,
  message: state.product.message,
  isSearchByName: state.product.isSearchByName,
  isSearchByLocation: state.product.isSearchByLocation,
  searchedProducts: state.product.searchedProducts
});

export default connect(mapStateToProps, mapDispatchToProps)(MyHome);
