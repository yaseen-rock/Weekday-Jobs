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

const LocationSelector = ({
  selectedRemote,
  setSelectedRemote,
  anchorElRemote,
  setAnchorElRemote,
  handleRemoteSelect,
  handleCloseRemote,
}) => {
  return (
    <>
      <TextField
        label="Remote"
        variant="outlined"
        onClick={(event) => setAnchorElRemote(event.currentTarget)}
        InputProps={{
          endAdornment: (
            <>
              {selectedRemote && (
                <Chip
                  label={selectedRemote}
                  onDelete={() => setSelectedRemote("")}
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
        value={selectedRemote}
        fullWidth={false} // Set fullWidth to false
        style={{ marginRight: "10px", marginBottom: { xs: "10px", sm: 0 } }} // Set the desired width using CSS
      />
      {/* Salary dropdown menu */}
      <Menu
        anchorEl={anchorElRemote}
        open={Boolean(anchorElRemote)}
        onClose={handleCloseRemote}
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
            minWidth: "180px", // Set the same width as TextField
          },
        }}
      >
        <MenuItem onClick={() => handleRemoteSelect("Remote")}>Remote</MenuItem>
        <MenuItem onClick={() => handleRemoteSelect("Hybrid")}>Hybrid</MenuItem>
        <MenuItem onClick={() => handleRemoteSelect("In-office")}>
          In-office
        </MenuItem>
        {/* Add more menu items as needed */}
      </Menu>
    </>
  );
};

export default LocationSelector;
