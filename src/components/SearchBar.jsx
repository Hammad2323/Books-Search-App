// src/components/SearchBar.js
import React from 'react';
import { TextField } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <TextField
        label="Search for books"
        variant="outlined"
        fullWidth
        onChange={handleInputChange}
        style={{ fontSize: "16px" }}
      />
    </div>
  );
};

export default SearchBar;