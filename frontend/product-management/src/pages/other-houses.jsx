import isEmpty from "is-empty";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import UserMenu from "../components/UserMenu/UserMenu";

import {
  fetchAllHouseStart,
  getHouseByIdStart,
} from "../redux/house/house.actions";

const OtherHousesPageStyle = styled.div`
  text-align: center;
`;

const HouseTitleStyle = styled.div`
  padding: 1rem;
  /* margin: 3rem; */
  font-size: 20px;
  color: #eee;
  font-weight: 700;
  background-color: #4b6e7e;
  display: flex;
  justify-content: space-between;

`;
const OtherHouseStyle = styled.div`
  margin: 1rem 10rem;
  padding: 1rem;
  background-color: #d8c9c9;
  cursor: pointer;
  &:hover {
    background-color: #d3aeae;
  }
`;

const HeaderFriendHouseStyle = styled.div`
  display: flex;
`;

const OtherHousePage = ({
  fetchAllHouse,
  houses,
  userName,
  getHouseById,
  targetProducts,
}) => {
  // console.log("targetProducts: ", targetProducts);

  useEffect(() => {
    fetchAllHouse();
  }, []);

  const navigate = useNavigate();

  const getHouseByIdHandler = async (id) => {
    await getHouseById(id);

    if (!isEmpty(targetProducts)) {
      navigate("/visit-house/" + id);
    }else{
      alert('Loading...')
    }
  };
  const otherHouses = houses.filter((h) => h.name.split("'s")[0] !== userName);
  // const otherHouses = houses.map(h => h.userName.slice(-8, -1) !== userName);
  //   const test = "Phương An's house";
  //   console.log(test.split("'s")[0]);
  // console.log(otherHouses);

  return (
    <OtherHousesPageStyle>
      <HouseTitleStyle>
        <span>Friends' House</span>
        <UserMenu />
      </HouseTitleStyle>
      {otherHouses.map((h) => (
        <OtherHouseStyle
          key={h._id}
          onClick={() => {
            getHouseByIdHandler(h._id);
          }}
        >
          {h.name}
        </OtherHouseStyle>
      ))}
    </OtherHousesPageStyle>
  );
};

const mapStateToProps = (state) => ({
  houses: state.house.houses,
  userName: state.auth.userName,
  targetProducts: state.house.targetProducts,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllHouse: () => dispatch(fetchAllHouseStart()),
  getHouseById: (id) => dispatch(getHouseByIdStart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OtherHousePage);
