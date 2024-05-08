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

const RoleSelector = ({
  selectedRoles,
  setSelectedRoles,
  anchorEl,
  setAnchorEl,
  handleRoleSelect,
  handleClose,
  handleRemoveRole,
}) => {
  return (
    <>
      {selectedRoles.length > 0 ? (
        <TextField
          variant="outlined"
          onClick={(event) => setAnchorEl(event.currentTarget)}
          InputProps={{
            readOnly: true,
            startAdornment: selectedRoles.map((role) => (
              <Chip
                key={role}
                label={role}
                onDelete={() => handleRemoveRole(role)}
                variant="outlined"
                size="small"
                style={{ margin: "0 5px 5px 0" }}
              />
            )),
            endAdornment: (
              <>
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
              paddingRight: "10px",
            },
          }}
          fullWidth={false}
          style={{
            marginRight: "10px",
            marginBottom: { xs: "10px", sm: 0 },
          }}
        />
      ) : (
        <TextField
          label="Roles"
          variant="outlined"
          onClick={(event) => setAnchorEl(event.currentTarget)}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <>
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
              paddingRight: "10px",
            },
          }}
          fullWidth={false}
          style={{
            marginRight: "10px",
            marginBottom: { xs: "10px", sm: 0 },
          }}
        />
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
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
            minWidth: "180px",
            // Set the same width as TextField
          },
        }}
      >
        <Typography>Experience</Typography>
        <MenuItem onClick={() => handleRoleSelect("ios")}>ios</MenuItem>
        <MenuItem onClick={() => handleRoleSelect("Data Analyst")}>
          Data Analyst
        </MenuItem>
        {/* Add more menu items as needed */}
      </Menu>
    </>
  );
};

export default RoleSelector;
