
"use client";
// Importing necessary modules from Material-UI
import { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles'; // Importing styled from @mui/material/styles
import { useRef } from 'react';
import { CircularProgress } from '@mui/material';
// Defining custom styles using styled function
const StyledCard = styled(Card)({
  maxWidth: 400,
  margin: '20px',
});


const IndexPage = () => {
  const [jobs, setJobs] = useState([]);
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [loading, setLoading] = useState(false);
  const pageRef = useRef(null);

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchJobs = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          limit: 10,
          offset: jobs.length, // Offset by the current number of jobs
        }),
      });
      const data = await response.json();
      setJobs(prevJobs => [...prevJobs, ...data.jdList]);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
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
  

  return (
    <div ref={pageRef} onScroll={handleScroll} style={{ overflowY: 'scroll', height: '100vh' }}>
    <Grid container spacing={3} justifyContent="center">
      {jobs.map(job => (
        <Grid item key={job.jdUid} xs={12}>
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
                  <Typography variant="h6" gutterBottom >
                    {job.jobRole}
                  </Typography>
                  <Typography  variant="body2" color="black" gutterBottom>
                    {job.location}
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="h7" fontWeight="500">About Company:</Typography>
              <Typography variant="body2" fontWeight="600">About us</Typography>

              <Typography variant="body2" component="p">
                {expandedJobId === job.jdUid ? job.jobDetailsFromCompany : `${job.jobDetailsFromCompany.substring(0, 550)}...`}
                {job.jobDetailsFromCompany.length > 30 && (
                  <Button variant="text" color="primary" onClick={() => toggleExpand(job.jdUid)}>
                    {expandedJobId === job.jdUid ? 'Collapse' : 'View Full Details'}
                  </Button>
                )}
              </Typography>
              <Typography  variant="body2" component="p"color="textSecondary" >
                    Minimum Experience
                  </Typography>
              <Typography   variant="body2" component="p">
                    {job.minExp} Years
                  </Typography>
                  <Grid container justifyContent="center">
      <Grid item>
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
            height: '50px', // Adjust the height as needed
            width: '250px' // Adjust the width as needed
          }}
          
        >
          Easy Apply
        </Button>
      </Grid>
    </Grid>
            </CardContent>
          </StyledCard>
        </Grid>
      ))}
      {loading && (
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <CircularProgress />
          </Grid>
          )}
    </Grid>
    </div>
  );
};

export default IndexPage;