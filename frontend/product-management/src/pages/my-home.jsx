import React from "react";
import styled from "styled-components";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import DatePicker from "../components/date-picker/DatePicker";
import SearchBarForm from "../components/search-bar/SearchBar";
import SideBar from "../components/side-bar/SideBar";
import Item from "../components/item/Item";
import UserMenu from "../components/UserMenu/UserMenu";

const MyHomeStyle = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100%;
`;
const HeaderStyle = styled.div`
  /* margin: 1rem; */
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;

const ItemsStyle = styled.div`
  margin: 1rem;
  display: flex;
  width: 100%;
  justify-content: center;
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
  /* justify-content: center; */
  margin-left: 1rem;
`;

const UserNameStyle = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
`;

const DisplayItemsStyle = styled.div`
  display: flex;
  margin-top: 1rem;
  justify-content: flex-start;
`;

const DatePickerStyle = styled.div`
  /* margin-left: auto; */
  /* margin-right: 0.5rem; */
  /* margin-left: auto !important; */
  /* width: 30%; */
  justify-content: flex-end;
`;
const ItemDetailStyle = styled.div`
  display: flex;
`;

const MyHome = () => {
  return (
    <div>
      <MyHomeStyle>
        <div className="sidebar">
          <SideBar />
        </div>
        <ItemsStyle>
          <HeaderStyle>
            <WelcomeText>Welcome to my home</WelcomeText>
            <SearchFormStyle>
              <SearchBarForm />
            </SearchFormStyle>
            <UserNameStyle>
              <PermIdentityOutlinedIcon />
              {/* <span>Username</span> */}
              <UserMenu />
            </UserNameStyle>
          </HeaderStyle>
          <DisplayItemsStyle>
            <ItemDetailStyle>
              <Item />
              <Item />
              <Item />
              <Item />
            </ItemDetailStyle>

            <DatePickerStyle>
              <DatePicker />
            </DatePickerStyle>
          </DisplayItemsStyle>
        </ItemsStyle>
      </MyHomeStyle>
    </div>
  );
};

export default MyHome;
