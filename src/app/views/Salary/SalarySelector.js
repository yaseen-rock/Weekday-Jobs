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

const SalarySelector = ({
  selectedSalary,
  setSelectedSalary,
  anchorElSalary,
  setAnchorElSalary,
  handleSalarySelect,
  handleCloseSalary,
}) => {
  return (
    <>
      <TextField
        label="Minimum Pay Base Salary"
        variant="outlined"
        onClick={(event) => setAnchorElSalary(event.currentTarget)}
        InputProps={{
          endAdornment: (
            <>
              {selectedSalary && (
                <Chip
                  label={selectedSalary}
                  onDelete={() => setSelectedSalary("")}
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
        value={selectedSalary}
        fullWidth={false} // Set fullWidth to false
        style={{
          width: "310px",
          marginRight: "10px",
          marginBottom: { xs: "10px", sm: 0 },
        }} // Set the desired width using CSS
      />
      {/* Salary dropdown menu */}
      <Menu
        anchorEl={anchorElSalary}
        open={Boolean(anchorElSalary)}
        onClose={handleCloseSalary}
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
            minWidth: "240px", // Set the same width as TextField
          },
        }}
      >
        <MenuItem onClick={() => handleSalarySelect("0")}>0L</MenuItem>
        <MenuItem onClick={() => handleSalarySelect("10")}>10L</MenuItem>
        <MenuItem onClick={() => handleSalarySelect("20")}>20L</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("30")}>30L</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("40")}>40L</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("50")}>50L</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("60")}>60L</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("70")}>70L</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("80")}>80L</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("90")}>90L</MenuItem>
      </Menu>
    </>
  );
};

export default SalarySelector;
