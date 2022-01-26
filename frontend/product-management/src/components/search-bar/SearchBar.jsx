import SearchBar from "material-ui-search-bar";
import { useState } from "react";
import { connect } from "react-redux";
import {
  searchProductByLocationStart,
  searchProductByNameStart,
  setSearchState,
} from "../../redux/product/product.actions";

const SearchBarForm = ({
  isSearchByName,
  isSearchByLocation,
  searchProductByName,
  searchProductByLocation,
  setSearchState,
  isSearched,
  visit,
  visitHouse,
  houseId
}) => {
  const [searchValue, setSearchValue] = useState("");

  const searchHandler = (e) => {
    setSearchState();
    const targetHouseId = visit ? visitHouse._id : houseId;

    if (isSearchByName && !isSearchByLocation) {
      searchProductByName(targetHouseId, searchValue);
    } else if (!isSearchByName && isSearchByLocation) {
      searchProductByLocation(targetHouseId, searchValue);
    }
  };

  return (
    <SearchBar
      value={searchValue}
      onChange={(value) => setSearchValue(value)}
      onRequestSearch={(e) => searchHandler(e)}
      style={{ width: "120%" }}
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  searchProductByName: (targetHouseId, productName) =>
    dispatch(searchProductByNameStart(targetHouseId, productName)),
  searchProductByLocation: (targetHouseId, location) =>
    dispatch(searchProductByLocationStart(targetHouseId, location)),
    setSearchState: () => dispatch(setSearchState())
});

const mapStateToProps = (state) => ({
  isSearchByName: state.product.isSearchByName,
  isSearchByLocation: state.product.isSearchByLocation,
  houseId: state.auth.houseId,
  visitHouse: state.house.visitHouse,
  isSearched: state.product.isSearched
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarForm);
