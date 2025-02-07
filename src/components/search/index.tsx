import React from "react";
import { SearchProps } from "interfaces/custom";
import {
  Search as MuiSearch,
  SearchIconStyled,
  SearchIconWrapper,
  SearchStyledInputBase,
} from "./index.style";
import { SEARCH } from "constant/Placeholder";

const Search: React.FC<SearchProps> = ({
  searchValue,
  handleSearchOnChange,
  disabled,
  placeholder = SEARCH,
}) => {
  return (
    <MuiSearch>
      <SearchIconWrapper>
        <SearchIconStyled />
      </SearchIconWrapper>
      <SearchStyledInputBase
        placeholder={placeholder}
        inputProps={{ "aria-label": "search" }}
        value={searchValue}
        onChange={handleSearchOnChange}
        disabled={disabled}
      />
    </MuiSearch>
  );
};

export default Search;
