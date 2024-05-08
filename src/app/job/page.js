"use client";
// Importing necessary modules from Material-UI
import { useState, useEffect } from "react";
import {
  Grid,
  Card,
  Badge,
  CardContent,
  Typography,
  Button,
  CardMedia,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRef } from "react";
import { CircularProgress } from "@mui/material";
import RoleSelector from "../views/JobRole/RoleSelector";
import ExperienceSelector from "../views/Experience/ExperienceSelector";
import SalarySelector from "../views/Salary/SalarySelector";
import SearchBar from "../views/Search/SearchBar";
import EmployeeSelector from "../views/Employee/EmployeeSelector";
import LocationSelector from "../views/Location/LocationSelector";
import { keyframes } from "@emotion/react";

const blinkAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

// Defining custom styles using styled function
const StyledCard = styled(Card)({
  maxWidth: 400,
  margin: "20px",
  borderRadius: "20px",
  boxShadow: "0 10px 14px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.3s", // Add transition for smooth effect
  "&:hover": {
    transform: "scale(1.02)", // Scale up the card slightly on hover
  },
});

const thunderIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 512 512"
  >
    <path
      fill="#ffb636"
      d="m459.866 218.346l-186.7.701c-4.619.017-7.618-4.861-5.517-8.975L370.845 8.024c3.103-6.075-4.493-11.949-9.592-7.417L39.948 286.141c-4.221 3.751-1.602 10.732 4.045 10.78l170.444 1.457c4.443.038 7.391 4.619 5.583 8.679L133.317 501.73c-2.688 6.035 4.709 11.501 9.689 7.16l320.937-279.725c4.307-3.753 1.637-10.84-4.077-10.819"
    />
  </svg>
);

const blurredIconStyle = {
  width: "30px", // Adjust the size of the icon as needed
  height: "30px",
  filter: "blur(0.8px)", // Apply blur effect
  marginRight: "10px",
  borderRadius: "50%", // Adjust spacing between icon and text
};

const IndexPage = () => {
  const [jobs, setJobs] = useState([]);
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  // Other code remains the same

  const [selectedEmployee, setSelectedEmployee] = useState(""); // Initialize as empty string
  const [anchorElEmployee, setAnchorElEmployee] = useState(null);

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    setAnchorElEmployee(null); // Close the dropdown menu
  };

  const handleCloseEmployee = () => {
    setAnchorElEmployee(null);
  };

  const [selectedExperience, setSelectedExperience] = useState(""); // Initialize as empty string
  const [anchorElExperience, setAnchorElExperience] = useState(null);

  const handleExperienceSelect = (experience) => {
    setSelectedExperience([""]); // Pass a blank value first

    // Delay passing the selected experience after 2 seconds
    setTimeout(() => {
      setSelectedExperience((prevExperience) =>
        prevExperience.filter((prevExp) => prevExp !== "")
      );
      setSelectedExperience(experience);
    }, 2000);

    setAnchorElExperience(null); // Close the dropdown menu
  };

  const handleCloseExperience = () => {
    setAnchorElExperience(null);
  };

  const [selectedRemote, setSelectedRemote] = useState(""); // Initialize as empty string
  const [anchorElRemote, setAnchorElRemote] = useState(null);

  const handleRemoteSelect = (remote) => {
    setSelectedRemote(remote);
    setAnchorElRemote(null); // Close the dropdown menu
  };

  const handleCloseRemote = () => {
    setAnchorElRemote(null);
  };

  const [selectedSalary, setSelectedSalary] = useState(""); // Initialize as empty string
  const [anchorElSalary, setAnchorElSalary] = useState(null);

  const handleSalarySelect = (salary) => {
    setSelectedSalary([""]); // Pass a blank value first

    // Delay passing the selected salary after 2 seconds
    setTimeout(() => {
      setSelectedSalary((prevSalary) =>
        prevSalary.filter((prevSal) => prevSal !== "")
      );
      setSelectedSalary(salary);
    }, 2000);

    setAnchorElSalary(null); // Close the dropdown menu
  };

  const handleCloseSalary = () => {
    setAnchorElSalary(null);
  };

  const [searchText, setSearchText] = useState("");
  const handleSearch = () => {
    // Keep the "hii" search results initially
    const defaultFiltered = jobs.filter((job) =>
      job.companyName.toLowerCase().includes("zzz")
    );
    setFilteredJobs(defaultFiltered);

    // After a delay of 1 second, perform the search with the actual search text
    setTimeout(() => {
      const filtered = jobs.filter((job) =>
        job.companyName.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredJobs(filtered);
    }, 1000);
  };

  const handleClearSearch = () => {
    setSearchText("");
    setFilteredJobs(jobs); // Reset to all jobs
  };

  const [loading, setLoading] = useState(false);
  const pageRef = useRef(null);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Filter jobs based on selected roles and minimum experience
    let filtered = jobs;
    if (selectedRoles.length > 0) {
      filtered = filtered.filter((job) => selectedRoles.includes(job.jobRole));
    }
    if (selectedExperience !== "") {
      filtered = filtered.filter(
        (job) => job.minExp === parseInt(selectedExperience)
      );
    }
    if (selectedSalary !== "") {
      filtered = filtered.filter(
        (job) => job.minJdSalary === parseInt(selectedSalary)
      );
    }

    setFilteredJobs(filtered);
  }, [jobs, selectedRoles, selectedExperience, selectedSalary]);

  const fetchJobs = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            limit: 10,
            offset: jobs.length, // Offset by the current number of jobs
          }),
        }
      );
      const data = await response.json();
      setJobs((prevJobs) => [...prevJobs, ...data.jdList]);
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRoles([""]); // Pass a blank value first

    // Delay passing the selected role after 0.5 seconds
    setTimeout(() => {
      setSelectedRoles((prevRoles) =>
        prevRoles.filter((prevRole) => prevRole !== "")
      );
      if (role !== " ") {
        setSelectedRoles([...selectedRoles, role]);
      }
    }, 200);

    setAnchorEl(null); // Close the dropdown menu
  };

  const handleRemoveRole = (roleToRemove) => {
    setSelectedRoles(selectedRoles.filter((role) => role !== roleToRemove));
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRoles([]); // Deselect all roles when closing the menu
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = pageRef.current;

    if (scrollHeight - scrollTop === clientHeight) {
      fetchJobs();
    }
  };

  const toggleExpand = (jobId) => {
    if (expandedJobId === jobId) {
      setExpandedJobId(null);
    } else {
      setExpandedJobId(jobId);
    }
  };

  const getCurrencySign = (currencyCode) => {
    switch (currencyCode) {
      case "INR":
        return "₹";
      case "USD":
        return "$";
      default:
        return currencyCode; // Return the code itself if not found
    }
  };

  return (
    <div
      ref={pageRef}
      onScroll={handleScroll}
      style={{ overflowY: "scroll", height: "100vh" }}
    >
      <Grid container spacing={3} style={{ background: "white" }}>
        <Grid item xs={12}>
          {/* Centered text */}
          <Box textAlign="center" mt={4}>
            <Typography variant="h3" component="h1">
              Few of the companies we curate
            </Typography>
            <Typography color="textSecondary" variant="h5" component="h1">
              Apply to more than 5k+ jobs
            </Typography>
          </Box>

          {/* Add the logo */}
          <Box display="flex" justifyContent="flex-start" mt={4} ml={2}>
            <img
              src="https://assets-global.website-files.com/63359abeb97bf0d5ca346052/6336e2cc37e3c15b9c7c4487_Logo_new.png"
              alt="Weekday Logo"
              style={{ width: 200, height: "auto" }}
            />
          </Box>

          <Box mt={4} mx={2}>
            <Card
              sx={{
                backgroundColor: "#E5FFDA",
                borderRadius: "16px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardContent>
                <Typography variant="body1" component="p">
                  We, at Weekday, are creating a go-to hub for uncovering the
                  real issues candidates should be aware of before joining a
                  company.
                  <strong>Access 150+ company reviews here</strong>
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={4}
          >
            <Box mr={4}>
              <Badge badgeContent={totalCount} color="primary">
                <Typography
                  variant="h6"
                  component="h1"
                  color="textSecondary"
                  sx={{
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      left: -8,
                      right: -8,
                      bottom: -2, // Adjust this value to set the gap
                      borderBottom: "1px solid blue", // Blue underline
                    },
                  }}
                >
                  Search Jobs
                </Typography>
              </Badge>
            </Box>
            {/* Salary badge (blinking) */}
            <Box>
              <Badge
                badgeContent="new"
                color="error"
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#5CFEB5", // Set badge color to #62F7B4
                    animation: `${blinkAnimation} 2s infinite`, // Slow down the blinking animation to 2 seconds
                  },
                }}
              >
                <Typography variant="h6" component="h1" color="textSecondary">
                  Search Salary
                </Typography>
              </Badge>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="flex-start"
            mb={1}
            mt={4}
            ml={2}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <RoleSelector
              selectedRoles={selectedRoles}
              setSelectedRoles={setSelectedRoles}
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              handleRoleSelect={handleRoleSelect}
              handleClose={handleClose}
              handleRemoveRole={handleRemoveRole}
            />

            <ExperienceSelector
              selectedExperience={selectedExperience}
              setSelectedExperience={setSelectedExperience}
              anchorElExperience={anchorElExperience}
              setAnchorElExperience={setAnchorElExperience}
              handleExperienceSelect={handleExperienceSelect}
              handleCloseExperience={handleCloseExperience}
            />

            <SalarySelector
              selectedSalary={selectedSalary}
              setSelectedSalary={setSelectedSalary}
              anchorElSalary={anchorElSalary}
              setAnchorElSalary={setAnchorElSalary}
              handleSalarySelect={handleSalarySelect}
              handleCloseSalary={handleCloseSalary}
            />

            <EmployeeSelector
              selectedEmployee={selectedEmployee}
              setSelectedEmployee={setSelectedEmployee}
              anchorElEmployee={anchorElEmployee}
              setAnchorElEmployee={setAnchorElEmployee}
              handleEmployeeSelect={handleEmployeeSelect}
              handleCloseEmployee={handleCloseEmployee}
            />

            <LocationSelector
              selectedRemote={selectedRemote}
              setSelectedRemote={setSelectedRemote}
              anchorElRemote={anchorElRemote}
              setAnchorElRemote={setAnchorElRemote}
              handleRemoteSelect={handleRemoteSelect}
              handleCloseRemote={handleCloseRemote}
            />

            <SearchBar
              searchText={searchText}
              setSearchText={setSearchText}
              handleClearSearch={handleClearSearch}
              handleSearch={handleSearch}
            />
          </Box>
        </Grid>

        {filteredJobs.map((job) => (
          <Grid item key={job.jdUid} xs={12} sm={6} md={4}>
            <StyledCard>
              <CardContent>
                <Grid container alignItems="center" spacing={2}>
                  {job.logoUrl && (
                    <Grid item>
                      <CardMedia
                        component="img"
                        src={job.logoUrl}
                        alt={job.companyName}
                        style={{ width: 60, height: 70 }}
                      />
                    </Grid>
                  )}
                  <Grid item>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      component="h2"
                      marginTop="20px"
                    >
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
                  Estimated Salary: {getCurrencySign(job.salaryCurrencyCode)}
                  {job.minJdSalary} - {getCurrencySign(job.salaryCurrencyCode)}
                  {job.maxJdSalary} LPA {job.isSalaryNegotiable} ✅
                </Typography>
                <Typography variant="h7" fontWeight="500">
                  About Company:
                </Typography>
                <Typography variant="body2" fontWeight="600">
                  About us
                </Typography>
                <Typography variant="body2" component="p">
                  {expandedJobId === job.jdUid
                    ? job.jobDetailsFromCompany
                    : `${job.jobDetailsFromCompany.substring(0, 550)}...`}
                  {job.jobDetailsFromCompany.length > 30 && (
                    <Box textAlign="center">
                      {job.jobDetailsFromCompany.length > 30 && (
                        <Button
                          variant="text"
                          color="primary"
                          onClick={() => toggleExpand(job.jdUid)}
                        >
                          {expandedJobId === job.jdUid
                            ? "Collapse"
                            : "View Full Details"}
                        </Button>
                      )}
                    </Box>
                  )}
                </Typography>
                <Typography variant="body2" component="p">
                  {expandedJobId === job.jdUid && (
                    <>
                      <Typography variant="h6" fontWeight="500">
                        About Role:
                      </Typography>
                      <Typography variant="body2" component="p">
                        Overview
                      </Typography>
                      <Typography variant="body2" component="p">
                        Company name: {job.companyName}
                      </Typography>
                      <Typography variant="body2" component="p">
                        Role: {job.jobRole}
                      </Typography>
                      <Typography variant="body2" component="p">
                        salary Currency: {job.salaryCurrencyCode}
                      </Typography>
                      <Typography variant="body2" component="p">
                        Salary: {getCurrencySign(job.salaryCurrencyCode)}
                        {job.minJdSalary} -{" "}
                        {getCurrencySign(job.salaryCurrencyCode)}
                        {job.maxJdSalary} lakhs per annum
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
                      backgroundColor: "cyan",
                      color: "inherit",
                      fontWeight: "bold",
                      textTransform: "none",
                      height: "43px", // Adjust the height as needed
                      width: "350px", // Adjust the width as needed
                      borderRadius: "7px",
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
                      backgroundColor: "#1976d2",
                      color: "white",
                      fontWeight: "bold",
                      textTransform: "none",
                      height: "43px",
                      width: "350px",
                      borderRadius: "7px",
                    }}
                  >
                    <img
                      src="https://cdn.openart.ai/stable_diffusion/c5755f9fe9100afb59ad0ac135c9c80f7f05e228_2000x2000.webp"
                      alt="Blurred Icon"
                      style={blurredIconStyle}
                    />
                    <img
                      src="https://qph.cf2.quoracdn.net/main-qimg-01413b57de6f876bcc0e647e12740eee-pjlq"
                      alt="Blurred Icon"
                      style={blurredIconStyle}
                    />
                    Unlock Referral Asks
                  </Button>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
        {loading && (
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <CircularProgress />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default IndexPage;
