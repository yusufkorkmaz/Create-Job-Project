import { Alert, Button, FormControl, IconButton, InputLabel, MenuItem, Modal, Paper, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { Box } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';
import './App.scss';

function App() {
  const [jobs, setJobs] = useState([]);
  const [jobName, setJobName] = useState('');
  const [priority, setPriority] = useState('');
  const [currentJob, setCurrentJob] = useState({});
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [openJobEditModal, setOpenJobEditModal] = useState(false);
  const [openJobDeleteModal, setOpenJobDeleteModal] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);

  //Functions
  const handleJobName = (event) => {
    setJobName(event.target.value);
  };
  const changePriority = (event) => {
    setPriority(event.target.value);
  };
  const changeCurrentJobPriority = (event) => {
    setCurrentJob({ ...currentJob, priority: event.target.value })
  };
  const createJob = () => {
    if (priority.length === 0) {
      setOpenErrorSnackbar(true);
    } else if (jobName.length === 0) {
      setOpenErrorSnackbar(true);
    } else {
      setOpenSuccessSnackbar(true);
      setJobs([...jobs, { "name": jobName, "priority": priority, "importanceLevel": selectImportanceLevel(priority) }]);
      setJobName('');
      setPriority('');
    }
  }
  const selectImportanceLevel = (priority) => {
    switch (priority) {
      case 'Urgent':
        return 1;
      case 'Regular':
        return 2;
      case 'Trivial':
        return 3;
    }
  }
  const snackbarClose = () => {
    setOpenErrorSnackbar(false);
    setOpenSuccessSnackbar(false);
  };
  const editButtonOnClickInTable = (job, index) => {
    setCurrentJobIndex(index);
    setCurrentJob(job);
    setOpenJobEditModal(true)
  }
  const completeEditButtonOnClickInModal = () => {
    let tempJobs = [...jobs];
    //change priority for sorting
    currentJob.importanceLevel = selectImportanceLevel(currentJob.priority);
    tempJobs[currentJobIndex] = currentJob;
    setJobs(tempJobs);
    console.log(jobs);
    setOpenJobEditModal(false);
  }
  const deleteButtonOnClickInTable = (index) => {
    setCurrentJobIndex(index);
    setOpenJobDeleteModal(true);
  }
  const completeDeleteJobButtonOnClickInModal = () => {
    let tempJobs = [...jobs];
    tempJobs.splice(currentJobIndex, 1);
    setJobs(tempJobs);
    setOpenJobDeleteModal(false);
  }


  //Components
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
        <Box>
          <h2>Jobs ({jobs.length})</h2>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Priority</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs.sort((a, b) => {
                  return a.importanceLevel - b.importanceLevel;
                }).map((job, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {job.name}
                    </TableCell>
                    <TableCell align="right">{job.priority}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => editButtonOnClickInTable(job, index)} variant="edit">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => deleteButtonOnClickInTable(index)} variant="delete">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box> : <h2 className='no-job-text'>No Jobs</h2>}


      <Modal
        open={openJobEditModal}
        onClose={() => setOpenJobEditModal(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box className='modal-wrapper'>
          <Box className='modal'>
            <h2 id="parent-modal-title">Edit Job</h2>

            <TextField disabled fullWidth id="outlined-basic" label="Job Name" value={currentJob.name} onChange={handleJobName} variant="outlined" />
            <Box className='select-priority-in-modal'>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                <Select

                  labelId="demo-simple-select-label"
                  label="Priority *"
                  id="demo-simple-select"
                  fullWidth
                  value={currentJob.priority}
                  onChange={changeCurrentJobPriority}
                >
                  <MenuItem value={'Urgent'}>Urgent</MenuItem>
                  <MenuItem value={'Regular'}>Regular</MenuItem>
                  <MenuItem value={'Trivial'}>Trivial</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button onClick={completeEditButtonOnClickInModal}>Complete</Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={openJobDeleteModal}
        onClose={() => setOpenJobDeleteModal(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box className='modal-wrapper'>
          <Box className='modal'>

            <h2 id="parent-modal-title">Delete Job</h2>
            <p>Are you sure you want to delete this job?</p>
            <Button onClick={() => completeDeleteJobButtonOnClickInModal()}>Delete</Button>
          </Box>
        </Box>

      </Modal>

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
