import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchAllHouseStart } from '../redux/house/house.actions';

const OtherHousesPageStyle = styled.div`
    text-align: center;
`

const OtherHousePage = ({ fetchAllHouse, houses }) => {
    console.log(houses);

    useEffect(() => {
        fetchAllHouse();
    }, []);
    
    return (
        <OtherHousesPageStyle>{
            houses.map(h => (
                <div key={h._id}>{h.name}</div>
            ))
            }</OtherHousesPageStyle>
    )
}

const mapStateToProps = state => ({
    houses: state.house.houses
})

const mapDispatchToProps = dispatch => ({
    fetchAllHouse: () => dispatch(fetchAllHouseStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(OtherHousePage);