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
        <Typography
          variant="body2"
          color="textSecondary"
          marginLeft={2}
          marginTop={1}
        >
          ENGENEERING
        </Typography>

        <MenuItem onClick={() => handleRoleSelect("ios")}>
          {" "}
          iOS Developer
        </MenuItem>
        <MenuItem onClick={() => handleRoleSelect("Android")}>
          Android Developer
        </MenuItem>
        <MenuItem onClick={() => handleRoleSelect("Frontend")}>
          Frontend Developer
        </MenuItem>
        <MenuItem onClick={() => handleRoleSelect("Backend")}>
          Backend Developer
        </MenuItem>
        <MenuItem onClick={() => handleRoleSelect("Full Stack")}>
          Full Stack Developer
        </MenuItem>
        <MenuItem onClick={() => handleRoleSelect("DevOps")}>
          DevOps Engineer
        </MenuItem>
        <MenuItem onClick={() => handleRoleSelect("Data Engineer")}>
          Data Engineer
        </MenuItem>
        <MenuItem onClick={() => handleRoleSelect("Machine Learning")}>
          Machine Learning
        </MenuItem>
        <MenuItem onClick={() => handleRoleSelect("Software Engineer")}>
          Software Engineer
        </MenuItem>

        {/* Design Roles */}
        <Typography
          variant="body2"
          color="textSecondary"
          marginLeft={2}
          marginTop={2}
        >
          DESIGN
        </Typography>
        <MenuItem onClick={() => handleRoleSelect("UI/UX")}>
          UI/UX Designer
        </MenuItem>
        <MenuItem onClick={() => handleRoleSelect("Graphic")}>
          Graphic Designer
        </MenuItem>
        <MenuItem onClick={() => handleRoleSelect("Product")}>
          Product Designer
        </MenuItem>
        <MenuItem onClick={() => handleRoleSelect("Web")}>
          Web Designer
        </MenuItem>

        {/* Operations Roles */}
        <Typography
          variant="body2"
          color="textSecondary"
          marginLeft={2}
          marginTop={2}
        >
          OPERATIONS
        </Typography>
        <MenuItem onClick={() => handleRoleSelect("Operations Coordinator")}>
          Operations Coordinator
        </MenuItem>
        <MenuItem onClick={() => handleRoleSelect("Operations Manager")}>
          Operations Manager
        </MenuItem>
        <MenuItem onClick={() => handleRoleSelect("Operations Analyst")}>
          Operations Analyst
        </MenuItem>

        {/* Product Roles */}
        <Typography
          variant="body2"
          color="textSecondary"
          marginLeft={2}
          marginTop={2}
        >
          PRODUCT
        </Typography>
        <MenuItem onClick={() => handleRoleSelect("Product Manager")}>
          Product Manager
        </MenuItem>
        <MenuItem onClick={() => handleRoleSelect("Product Owner")}>
          Product Owner
        </MenuItem>
        <MenuItem onClick={() => handleRoleSelect("Product Analyst")}>
          Product Analyst
        </MenuItem>

        {/* Sales Roles */}
        <Typography
          variant="body2"
          color="textSecondary"
          marginLeft={2}
          marginTop={2}
        >
          SALES
        </Typography>
        <MenuItem onClick={() => handleRoleSelect("Sales Associate")}>
          Sales Associate
        </MenuItem>
        <MenuItem onClick={() => handleRoleSelect("Sales Representative")}>
          Sales Representative
        </MenuItem>
        <MenuItem onClick={() => handleRoleSelect("Sales Manager")}>
          Sales Manager
        </MenuItem>
        <MenuItem onClick={() => handleRoleSelect("Account Executive")}>
          Account Executive
        </MenuItem>

        <Typography
          variant="body2"
          color="textSecondary"
          marginLeft={2}
          marginTop={2}
        >
          HR
        </Typography>
        <MenuItem onClick={() => handleRoleSelect("Hr")}>Hr</MenuItem>
        <Typography
          variant="body2"
          color="textSecondary"
          marginLeft={2}
          marginTop={2}
        >
          LEGAL
        </Typography>
        <MenuItem onClick={() => handleRoleSelect("Legal")}>Legal</MenuItem>
        {/* Add more menu items as needed */}
      </Menu>
    </>
  );
};

export default RoleSelector;
