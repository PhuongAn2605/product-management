import isEmpty from "is-empty";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import UserMenu from "../components/UserMenu/UserMenu";
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
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
  font-weight: 700;

`;
const OtherHouseStyle = styled.div`
  margin: 1rem 10rem;
  padding: 1rem;
  background-color: #d8c9c9;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background-color: #d3aeae;
  }
`;


const HouseNameStyle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #2684bb;
  margin-left: 1rem;
`

const OtherHousePage = ({
  fetchAllHouse,
  houses,
  userName,
  getHouseById,
  targetProducts,
  visitHouse,
  isLoggedIn
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if(isLoggedIn){
      fetchAllHouse();

    }else{
      navigate('/');
    }
  }, []);

  const getHouseByIdHandler = async (id) => {
    await getHouseById(id);

    if (!isEmpty(visitHouse)) {
      navigate("/visit-house/" + id);
    }

    // }else{
    //   alert('Loading...')
    // }
  };
  const otherHouses = houses.filter((h) => h.name.split("'s")[0] !== userName);

  return (
    <OtherHousesPageStyle>
      <HouseTitleStyle>
        <span>Friends' House</span>
        <UserMenu />
      </HouseTitleStyle>
      {!isEmpty(otherHouses) ? otherHouses.map((h) => (
        <OtherHouseStyle
          key={h._id}
          onClick={() => {
            getHouseByIdHandler(h._id);
          }}
        >
          <OtherHousesIcon color="primary" fontSize="large"/>
          <HouseNameStyle>{h.name}</HouseNameStyle>
        </OtherHouseStyle>
      )) : <OtherHouseStyle>Not found any friends'house!</OtherHouseStyle>}
    </OtherHousesPageStyle>
  );
};

const mapStateToProps = (state) => ({
  houses: state.house.houses,
  userName: state.auth.userName,
  targetProducts: state.house.targetProducts,
  visitHouse: state.house.visitHouse,
  isLoggedIn: state.auth.isLoggedIn
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllHouse: () => dispatch(fetchAllHouseStart()),
  getHouseById: (id) => dispatch(getHouseByIdStart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OtherHousePage);
