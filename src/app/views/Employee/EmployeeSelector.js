import React from "react";
import {
  MenuItem,
  Menu,
  Chip,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";

const EmployeeSelector = ({
  selectedEmployee,
  setSelectedEmployee,
  anchorElEmployee,
  setAnchorElEmployee,
  handleEmployeeSelect,
  handleCloseEmployee,
}) => {
  return (
    <>
      {/* Number of employees dropdown */}
      <TextField
        label="Number of Employee"
        variant="outlined"
        onClick={(event) => setAnchorElEmployee(event.currentTarget)}
        InputProps={{
          endAdornment: (
            <>
              {selectedEmployee && (
                <Chip
                  label={selectedEmployee}
                  onDelete={() => setSelectedEmployee("")}
                  variant="outlined"
                  size="small"
                  style={{ marginLeft: "5px" }}
                />
              )}
              <Box display="flex" alignItems="center">
                <Box>|</Box>
                <KeyboardArrowDown />
              </Box>
            </>
          ),
          style: {
            borderColor: "black",
            color: "black",
            textTransform: "none",
            paddingRight: "10px", // Adjust padding to accommodate the Chip
          },
        }}
        value={selectedEmployee}
        fullWidth={false} // Set fullWidth to false
        style={{
          minWidth: "230px",
          marginRight: "10px",
          marginBottom: { xs: "10px", sm: 0 },
        }} // Set the desired width using CSS
      />
      {/* Salary dropdown menu */}
      <Menu
        anchorEl={anchorElEmployee}
        open={Boolean(anchorElEmployee)}
        onClose={handleCloseEmployee}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          style: {
            marginTop: "5px",
            minWidth: "230px", // Set the same width as TextField
          },
        }}
      >
        <MenuItem onClick={() => handleEmployeeSelect("1-10")}>1-10</MenuItem>
        <MenuItem onClick={() => handleEmployeeSelect("11-20")}>11-20</MenuItem>
        <MenuItem onClick={() => handleEmployeeSelect("21-50")}>21-50</MenuItem>
        <MenuItem onClick={() => handleEmployeeSelect("51-100")}>51-100</MenuItem>
        <MenuItem onClick={() => handleEmployeeSelect("101-200")}>101-200</MenuItem>
        <MenuItem onClick={() => handleEmployeeSelect("201-500")}>201-500</MenuItem>
        <MenuItem onClick={() => handleEmployeeSelect("501-1000")}>500+</MenuItem>
        {/* Add more menu items as needed */}
      </Menu>
    </>
  );
};

export default EmployeeSelector;
