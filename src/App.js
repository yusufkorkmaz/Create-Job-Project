import { Alert, Button, FormControl, InputLabel, MenuItem, Paper, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { Box } from '@mui/system';

import React, { useState } from 'react';
import './App.scss';

function App() {

  const [jobs, setJobs] = useState([]);
  const [jobName, setJobName] = useState('');
  const [priority, setPriority] = useState('');
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);

  const changePriority = (event) => {
    setPriority(event.target.value);
  };

  const handleJobName = (event) => {
    setJobName(event.target.value);
  };

  const snackbarClose = () => {
    setOpenErrorSnackbar(false);
    setOpenSuccessSnackbar(false);
  };

  const createJob = () => {
    if (priority.length === 0) {
      setOpenErrorSnackbar(true);
    } else if (jobName.length === 0) {
      setOpenErrorSnackbar(true);
    } else {
      setOpenSuccessSnackbar(true);
      setJobs([...jobs, { "name": jobName, "priority": priority }]);
    }

    setJobName('');
    setPriority('');
  }

  const createJobSection = () => {
    return <Box className="create-new-job-wrapper">
      <h2>Create New Job</h2>
      <Box className="create-job-items">
        <TextField required fullWidth id="outlined-basic" className='job-name' label="Job Name" value={jobName} onChange={handleJobName} variant="outlined" />
        <Box className="select-priority-box">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Priority *</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              label="Priority *"
              id="demo-simple-select"
              fullWidth
              value={priority}
              onChange={changePriority}
            >
              <MenuItem value={'Urgent'}>Urgent</MenuItem>
              <MenuItem value={'Regular'}>Regular</MenuItem>
              <MenuItem value={'Trivial'}>Trivial</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button onClick={createJob} variant="contained">Create</Button>
      </Box>
    </Box>
  }




  return (
    <div className="App">

      {createJobSection()}

      {jobs.length > 0 ?
       <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Priority</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {job.name}
                </TableCell>
                <TableCell align="right">{job.priority}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> : <h2 className='no-job-text'>No Jobs</h2>}


      <Snackbar
        open={openErrorSnackbar}
        onClose={snackbarClose}
        message="Error!"
      >
        <Alert onClose={snackbarClose} severity="error" sx={{ width: '100%' }}>
          Please fill all the fields!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openSuccessSnackbar}
        onClose={snackbarClose}
        message="Success!"
      >
        <Alert onClose={snackbarClose} severity="success" sx={{ width: '100%' }}>
          Success
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
