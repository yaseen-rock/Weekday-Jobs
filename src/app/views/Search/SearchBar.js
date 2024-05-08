// SearchBar.js
import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchBar = ({
  searchText,
  setSearchText,
  handleClearSearch,
  handleSearch,
}) => {
  return (
    <TextField
      label="Search Company"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {searchText && (
              <IconButton onClick={handleClearSearch}>
                <ClearIcon />
              </IconButton>
            )}
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      style={{ marginRight: "10px", marginBottom: { xs: "10px", sm: 0 } }}
    />
  );
};

export default SearchBar;
