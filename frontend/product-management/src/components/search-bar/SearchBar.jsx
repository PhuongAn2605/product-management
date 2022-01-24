import SearchBar from "material-ui-search-bar";
import { useState } from "react";
import { connect } from 'react-redux';
import { searchProductByLocationStart, searchProductByNameStart } from "../../redux/product/product.actions";

const SearchBarForm = ({ isSearchByName, isSearchByLocation, searchProductByName, searchProductByLocation }) => {
  const [searchValue, setSearchValue] = useState('');

  const searchHandler = (e) => {
    // e.preventDefault();

    if(isSearchByName && !isSearchByLocation){
      searchProductByName(searchValue);
    }else if(!isSearchByName && isSearchByLocation){
      searchProductByLocation(searchValue);
    }
  }

    return (
        <SearchBar
          value={searchValue}
          onChange={(value) => setSearchValue(value) }
          onRequestSearch={(e) => searchHandler(e)}
        style={{ width: "120%" }}
        />
      );
}

const mapDispatchToProps = dispatch => ({
  searchProductByName: (productName) => dispatch(searchProductByNameStart(productName)),
  searchProductByLocation: (location) => dispatch(searchProductByLocationStart(location))
})

const mapStateToProps = state => ({
  isSearchByName: state.product.isSearchByName,
  isSearchByLocation: state.product.isSearchByLocation
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarForm);