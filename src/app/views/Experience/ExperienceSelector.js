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

const ExperienceSelector = ({
  selectedExperience,
  setSelectedExperience,
  anchorElExperience,
  setAnchorElExperience,
  handleExperienceSelect,
  handleCloseExperience,
}) => {
  return (
    <>
      {/* Experience dropdown */}
      <TextField
        label="Experience"
        variant="outlined"
        onClick={(event) => setAnchorElExperience(event.currentTarget)}
        InputProps={{
          endAdornment: (
            <>
              {selectedExperience && (
                <Chip
                  label={selectedExperience}
                  onDelete={() => setSelectedExperience("")}
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
        value={selectedExperience}
        fullWidth={false} // Set fullWidth to false
        style={{ marginRight: "10px", marginBottom: { xs: "10px", sm: 0 } }} // Set the desired width using CSS
      />
      {/* Salary dropdown menu */}
      <Menu
        anchorEl={anchorElExperience}
        open={Boolean(anchorElExperience)}
        onClose={handleCloseExperience}
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
        <MenuItem onClick={() => handleExperienceSelect("1")}>1</MenuItem>
        <MenuItem onClick={() => handleExperienceSelect("2")}>2</MenuItem>
        <MenuItem onClick={() => handleExperienceSelect("3")}>3</MenuItem>
        {/* Add more menu items as needed */}
      </Menu>
    </>
  );
};

export default ExperienceSelector;
