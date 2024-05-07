"use client";
// Importing necessary modules from Material-UI
import { useState, useEffect } from 'react';
import {TextField, Grid, Card, CardContent, Typography, Button, CardMedia, Box, Chip, Menu, MenuItem, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Close, KeyboardArrowDown } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';


// Defining custom styles using styled function
const StyledCard = styled(Card)({
    maxWidth: 400,
    margin: '20px',
    borderRadius: '20px',
    boxShadow: '0 10px 14px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s', // Add transition for smooth effect
    '&:hover': {
      transform: 'scale(1.02)', // Scale up the card slightly on hover
      
    },
  });
  

const thunderIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
      <path fill="#ffb636" d="m459.866 218.346l-186.7.701c-4.619.017-7.618-4.861-5.517-8.975L370.845 8.024c3.103-6.075-4.493-11.949-9.592-7.417L39.948 286.141c-4.221 3.751-1.602 10.732 4.045 10.78l170.444 1.457c4.443.038 7.391 4.619 5.583 8.679L133.317 501.73c-2.688 6.035 4.709 11.501 9.689 7.16l320.937-279.725c4.307-3.753 1.637-10.84-4.077-10.819"/>
    </svg>
  );

  const blurredIconStyle = {
    width: '30px', // Adjust the size of the icon as needed
    height: '30px',
    filter: 'blur(0.8px)', // Apply blur effect
    marginRight: '10px',
    borderRadius: '50%', // Adjust spacing between icon and text
  };

const IndexPage = () => {
  const [jobs, setJobs] = useState([]);
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  // Other code remains the same

  const handleRoleSelect = (role) => {
    setSelectedRoles([...selectedRoles, role]);
    setAnchorEl(null); // Close the dropdown menu
  };

  const handleRemoveRole = (roleToRemove) => {
    setSelectedRoles(selectedRoles.filter(role => role !== roleToRemove));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [selectedEmployee, setSelectedEmployee] = useState(''); // Initialize as empty string
  const [anchorElEmployee, setAnchorElEmployee] = useState(null);

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    setAnchorElEmployee(null); // Close the dropdown menu
  };

  const handleCloseEmployee = () => {
    setAnchorElEmployee(null);
  };

  const [selectedExperience, setSelectedExperience] = useState(''); // Initialize as empty string
  const [anchorElExperience, setAnchorElExperience] = useState(null);

  const handleExperienceSelect = (experience) => {
    setSelectedExperience(experience);
    setAnchorElExperience(null); // Close the dropdown menu
  };

  const handleCloseExperience = () => {
    setAnchorElExperience(null);
  };

  const [selectedRemote, setSelectedRemote] = useState(''); // Initialize as empty string
  const [anchorElRemote, setAnchorElRemote] = useState(null);

  const handleRemoteSelect = (remote) => {
    setSelectedRemote(remote);
    setAnchorElRemote(null); // Close the dropdown menu
  };

  const handleCloseRemote = () => {
    setAnchorElRemote(null);
  };

  const [selectedSalary, setSelectedSalary] = useState(''); // Initialize as empty string
  const [anchorElSalary, setAnchorElSalary] = useState(null);

  const handleSalarySelect = (salary) => {
    setSelectedSalary(salary);
    setAnchorElSalary(null); // Close the dropdown menu
  };

  const handleCloseSalary = () => {
    setAnchorElSalary(null);
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Implement your search logic here based on the searchTerm
    console.log('Searching for:', searchTerm);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  useEffect(() => {
    // Fetch job data from API
    const fetchJobs = async () => {
      try {
        const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            limit: 10,
            offset: 0,
          }),
        });
        const data = await response.json();
        setJobs(data.jdList);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const toggleExpand = (jobId) => {
    if (expandedJobId === jobId) {
      setExpandedJobId(null);
    } else {
      setExpandedJobId(jobId);
    }
  };

  const getCurrencySign = (currencyCode) => {
    switch(currencyCode) {
      case "INR":
        return "₹";
      case "USD":
        return "$";
      default:
        return currencyCode; // Return the code itself if not found
    }
  };

  return (
    <Grid container spacing={3} justifyContent="center" style={{ background: 'white' }}>
        <Grid item xs={12}>

        <Box display="flex" justifyContent="flex-start" mb={1} mt={4} ml={2} flexDirection={{ xs: 'column', sm: 'row' }}>
        {selectedRoles.length > 0 ? (
  <TextField
    variant="outlined"
    onClick={(event) => setAnchorEl(event.currentTarget)}
    InputProps={{
      readOnly: true,
      startAdornment: (
        selectedRoles.map(role => (
          <Chip
            key={role}
            label={role}
            onDelete={() => handleRemoveRole(role)}
            variant="outlined"
            size="small"
            style={{ margin: '0 5px 5px 0' }}
          />
        ))
      ),
      endAdornment: (
        <>
          <Box display="flex" alignItems="center">
            <Box>|</Box>
            <KeyboardArrowDown />
          </Box>
        </>
      ),
      style: {
        borderColor: 'black',
        color: 'black',
        textTransform: 'none',
        paddingRight: '10px',
      },
    }}
    fullWidth={false}
    style={{ marginRight: '10px', marginBottom: { xs: '10px', sm: 0 } }}
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
        borderColor: 'black',
        color: 'black',
        textTransform: 'none',
        paddingRight: '10px',
      },
    }}
    fullWidth={false}
    style={{ marginRight: '10px', marginBottom: { xs: '10px', sm: 0 } }}
  />
)}


<Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleClose}
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'left',
  }}
  transformOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }}
  PaperProps={{
    style: {
        marginTop:'5px',
        minWidth: '180px',
       // Set the same width as TextField
    },
  }}
>
  <MenuItem onClick={() => handleRoleSelect('Software Engineer')}>Software Engineer</MenuItem>
  <MenuItem onClick={() => handleRoleSelect('Data Analyst')}>Data Analyst</MenuItem>
  {/* Add more menu items as needed */}
</Menu>


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
                      onDelete={() => setSelectedEmployee('')}
                      variant="outlined"
                      size="small"
                      style={{ marginLeft: '5px' }}
                    />
                  )}
                  <Box display="flex" alignItems="center">
          <Box>|</Box>
          <KeyboardArrowDown />
        </Box>
                </>
              ),
              style: {
                borderColor: 'black',
                color: 'black',
                textTransform: 'none',
                paddingRight: '10px', // Adjust padding to accommodate the Chip
              },
            }}
            value={selectedEmployee}
            fullWidth={false} // Set fullWidth to false
            style={{ minWidth: '230px', marginRight: '10px', marginBottom: { xs: '10px', sm: 0 } }} // Set the desired width using CSS
          />
          {/* Salary dropdown menu */}
          <Menu
            anchorEl={anchorElEmployee}
            open={Boolean(anchorElEmployee)}
            onClose={handleCloseEmployee}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            PaperProps={{
                style: {
                    marginTop:'5px',
                  minWidth: '230px', // Set the same width as TextField
                },
              }}
          >
            <MenuItem onClick={() => handleEmployeeSelect('1-10')}>1-10</MenuItem>
            <MenuItem onClick={() => handleEmployeeSelect('11-20')}>11-20</MenuItem>
            {/* Add more menu items as needed */}
          </Menu>

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
                      onDelete={() => setSelectedExperience('')}
                      variant="outlined"
                      size="small"
                      style={{ marginLeft: '5px' }}
                    />
                  )}
                  <Box display="flex" alignItems="center">
          <Box>|</Box>
          <KeyboardArrowDown />
        </Box>
                </>
              ),
              style: {
                borderColor: 'black',
                color: 'black',
                textTransform: 'none',
                paddingRight: '10px', // Adjust padding to accommodate the Chip
              },
            }}
            value={selectedExperience}
            fullWidth={false} // Set fullWidth to false
            style={{ marginRight: '10px', marginBottom: { xs: '10px', sm: 0 } }} // Set the desired width using CSS
          />
          {/* Salary dropdown menu */}
          <Menu
            anchorEl={anchorElExperience}
            open={Boolean(anchorElExperience)}
            onClose={handleCloseExperience}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            PaperProps={{
                style: {
                    marginTop:'5px',
                  minWidth: '180px', // Set the same width as TextField
                },
              }}
          >
            <MenuItem onClick={() => handleExperienceSelect('1')}>1</MenuItem>
            <MenuItem onClick={() => handleExperienceSelect('2')}>2</MenuItem>
            <MenuItem onClick={() => handleExperienceSelect('3')}>3</MenuItem>
            {/* Add more menu items as needed */}
          </Menu>


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
                      onDelete={() => setSelectedRemote('')}
                      variant="outlined"
                      size="small"
                      style={{ marginLeft: '5px' }}
                    />
                  )}
                  <Box display="flex" alignItems="center">
          <Box>|</Box>
          <KeyboardArrowDown />
        </Box>
                </>
              ),
              style: {
                borderColor: 'black',
                color: 'black',
                textTransform: 'none',
                paddingRight: '10px', // Adjust padding to accommodate the Chip
              },
            }}
            value={selectedRemote}
            fullWidth={false} // Set fullWidth to false
            style={{ marginRight: '10px', marginBottom: { xs: '10px', sm: 0 } }} // Set the desired width using CSS
          />
          {/* Salary dropdown menu */}
          <Menu
            anchorEl={anchorElRemote}
            open={Boolean(anchorElRemote)}
            onClose={handleCloseRemote}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            PaperProps={{
                style: {
                    marginTop:'5px',
                  minWidth: '180px', // Set the same width as TextField
                },
              }}
          >
            <MenuItem onClick={() => handleRemoteSelect('Remote')}>Remote</MenuItem>
            <MenuItem onClick={() => handleRemoteSelect('Hybrid')}>Hybrid</MenuItem>
            <MenuItem onClick={() => handleRemoteSelect('In-office')}>In-office</MenuItem>
            {/* Add more menu items as needed */}
          </Menu>

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
                      onDelete={() => setSelectedSalary('')}
                      variant="outlined"
                      size="small"
                      style={{ marginLeft: '5px' }}
                    />
                  )}
                   <Box display="flex" alignItems="center">
          <Box>|</Box>
          <KeyboardArrowDown />
        </Box>
                </>
              ),
              style: {
                borderColor: 'black',
                color: 'black',
                textTransform: 'none',
                paddingRight: '10px', // Adjust padding to accommodate the Chip
              },
            }}
            value={selectedSalary}
            fullWidth={false} // Set fullWidth to false
            style={{ width: '310px', marginRight: '10px', marginBottom: { xs: '10px', sm: 0 } }} // Set the desired width using CSS
          />
          {/* Salary dropdown menu */}
          <Menu
            anchorEl={anchorElSalary}
            open={Boolean(anchorElSalary)}
            onClose={handleCloseSalary}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            PaperProps={{
                style: {
                    marginTop:'5px',
                  minWidth: '240px', // Set the same width as TextField
                },
              }}
          >
            <MenuItem onClick={() => handleSalarySelect('0L')}>0L</MenuItem>
            <MenuItem onClick={() => handleSalarySelect('10L')}>10L</MenuItem>
            <MenuItem onClick={() => handleSalarySelect('20L')}>20L</MenuItem>
          </Menu>

          <TextField
        label="Search Company"
        variant="outlined"
        value={searchTerm}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleSearch}>
               <SearchIcon />
            </IconButton>
          ),
        }}
      />

        </Box>
      </Grid>


      





      
      {jobs.map(job => (
        <Grid item key={job.jdUid} xs={12} sm={6} md={4}>
          <StyledCard>
            <CardContent>
              <Grid container alignItems="center" spacing={2}>
                {job.logoUrl && (
                  <Grid item>
                    <CardMedia component="img" src={job.logoUrl} alt={job.companyName} style={{ width: 60, height: 70 }} />
                  </Grid>
                )}
                <Grid item>
                  <Typography color="textSecondary" variant="h6" component="h2" marginTop="20px">
                    {job.companyName}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {job.jobRole}
                  </Typography>
                  <Typography variant="body2" color="black" gutterBottom>
                    {job.location} | Exp: {job.minExp} - {job.maxExp} years
                  </Typography>
                  
                </Grid>
              </Grid>
              <Typography variant="body1" marginTop="7px">
                    Estimated Salary: {getCurrencySign(job.salaryCurrencyCode)}{job.minJdSalary} - {getCurrencySign(job.salaryCurrencyCode)}{job.maxJdSalary} LPA {job.isSalaryNegotiable } ✅
                  </Typography>
              <Typography variant="h7" fontWeight="500">About Company:</Typography>
              <Typography variant="body2" fontWeight="600">About us</Typography>
              <Typography variant="body2" component="p" >
                {expandedJobId === job.jdUid ? job.jobDetailsFromCompany : `${job.jobDetailsFromCompany.substring(0, 550)}...`}
                {job.jobDetailsFromCompany.length > 30 && (
                  <Box textAlign="center">
                  {job.jobDetailsFromCompany.length > 30 && (
                    <Button variant="text" color="primary" onClick={() => toggleExpand(job.jdUid)}>
                      {expandedJobId === job.jdUid ? 'Collapse' : 'View Full Details'}
                    </Button>
                  )}
                </Box>
                )}
              </Typography>
              <Typography variant="body2" component="p">
                {expandedJobId === job.jdUid && (
                  <>
                  
                    <Typography variant="h6" fontWeight="500">About Role:</Typography>
                    <Typography variant="body2" component="p">
                      Overview
                    </Typography>
                    <Typography variant="body2" component="p">
                      Company name: {job.companyName} 
                    </Typography>
                    <Typography variant="body2" component="p">
                      Role: {job.jobRole}
                    </Typography>
                    <Typography  variant="body2" component="p">
                     salary Currency: {job.salaryCurrencyCode}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Salary: {getCurrencySign(job.salaryCurrencyCode)}{job.minJdSalary} - {getCurrencySign(job.salaryCurrencyCode)}{job.maxJdSalary} lakhs per annum
                    </Typography>
                    <Typography variant="body2" component="p">
                      Experience: {job.minExp}+ years
                    </Typography>
                    <Typography variant="body2" component="p">
                      Location: {job.location}
                    </Typography>
                   
                  </>
                )}
              </Typography>

             
              <Box display="flex" justifyContent="center">
                <Button 
                  variant="contained" 
                  color="primary" 
                  href={job.jdLink} 
                  target="_blank" 
                  style={{ 
                    backgroundColor: 'cyan', 
                    color: 'inherit', 
                    fontWeight: 'bold', 
                    textTransform: 'none',
                    height: '43px', // Adjust the height as needed
                    width: '350px', // Adjust the width as needed
                    borderRadius: '7px'
                  }}
                  startIcon={thunderIcon}
                >
                  Easy Apply
                </Button>
                
              </Box>
              <Box mt={1} display="flex" justifyContent="center">
        <Button 
          variant="contained" 
          color="primary" 
          href={job.jdLink} 
          target="_blank"
          style={{ 
            backgroundColor: '#1976d2', 
            color: 'white', 
            fontWeight: 'bold', 
            textTransform: 'none',
            height: '43px', 
            width: '350px', 
            borderRadius: '7px'
          }}
          
        >
              <img src="https://cdn.openart.ai/stable_diffusion/c5755f9fe9100afb59ad0ac135c9c80f7f05e228_2000x2000.webp" alt="Blurred Icon" style={blurredIconStyle} />
              <img src="https://qph.cf2.quoracdn.net/main-qimg-01413b57de6f876bcc0e647e12740eee-pjlq" alt="Blurred Icon" style={blurredIconStyle} />
      
          Unlock Referral Asks
        </Button>
      </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default IndexPage;
