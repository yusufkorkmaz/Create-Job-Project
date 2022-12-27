import { Alert, Button, Divider, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Modal, Paper, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { Box } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react';
import './App.scss';

function App() {
  const [searchInputText, setSearchInputText] = useState('');
  const [whichArrayUse, setWhichArrayUse] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [jobName, setJobName] = useState('');
  const [priority, setPriority] = useState('');
  const [searchPriority, setSearchPriority] = useState('All');
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
  const changeSearchPriority = (event) => {
    setSearchPriority(event.target.value);
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
  const searchOnTable = (event) => {
    setSearchInputText(event.target.value);
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
  const searchArea = () => {
    return <Box className='search-area'>
      <Box className='job-content-headers'>
        <h2 className='jobs-header'>{jobs.length} Jobs</h2>
        <h2 className='jobs-header'>{whichArrayUse.length} Match</h2>
      </Box>

      <Box className='search-input-wrapper' >
        <TextField
          disabled={jobs.length === 0}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          onChange={searchOnTable} id="search-input" className='search-input' label="Search" variant="outlined" />

      </Box>

      <FormControl className='select-priority-in-search'  >
        <InputLabel id="demo-simple-select-label">Priority</InputLabel>
        <Select
          disabled={jobs.length === 0}

          labelId="demo-simple-select-label"
          label="Priority *"
          id="demo-simple-select"
          defaultValue='All'
          value={searchPriority}
          onChange={changeSearchPriority}
        >
          <MenuItem value={'All'}>All</MenuItem>
          <MenuItem value={'Urgent'}>Urgent</MenuItem>
          <MenuItem value={'Regular'}>Regular</MenuItem>
          <MenuItem value={'Trivial'}>Trivial</MenuItem>
        </Select>
      </FormControl>

    </Box>
  }
  const jobsArea = () => {
    return <Box>
      {searchArea()}
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Job</TableCell>
              <TableCell className='priority-text' align="right">Priority</TableCell>
              <TableCell className='action-text' align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {whichArrayUse.sort((a, b) => {
              return a.importanceLevel - b.importanceLevel;
            }).map((job, index) => (
              <TableRow key={index}>
                <TableCell className='job-text-in-table' component="th" scope="row">
                  {job.name}
                </TableCell>
                <TableCell align="right"><Box className={`priority-${job.priority}`}>{job.priority}</Box></TableCell>
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
    </Box>
  }
  const editModal = () => {
    return <Modal
      open={openJobEditModal}
      onClose={() => setOpenJobEditModal(false)}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box className='modal-wrapper'>
        <Box className='modal edit-job-modal'>
          <Box>
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
          </Box>
          <Box className='edit-job-modal-buttons'>

            <Button variant="contained" color='info' onClick={completeEditButtonOnClickInModal}>Complete</Button>
            <Button color='info' onClick={() => setOpenJobEditModal(false)}>Cancel</Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  }
  const deleteJobModal = () => {
    return <Modal
      open={openJobDeleteModal}
      onClose={() => setOpenJobDeleteModal(false)}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box className='modal-wrapper'>
        <Box className='modal delete-job-modal'>
          <Box>
            <h2 id="parent-modal-title">Delete Job</h2>
            <p>Are you sure you want to delete this job?</p>
          </Box>

          <Box className='delete-job-modal-buttons'>
            <Button variant="contained" color='error' onClick={() => completeDeleteJobButtonOnClickInModal()}>Delete</Button>
            <Button color='info' onClick={() => setOpenJobDeleteModal(false)}>Cancel</Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  }

  useEffect(() => {
    if (searchInputText.length > 0 && searchPriority !== 'All') {
      const filteredJobs = jobs.filter(job => job.name.toLowerCase().includes(searchInputText.toLowerCase()) && job.priority.toLowerCase().includes(searchPriority.toLowerCase()));
      setWhichArrayUse(filteredJobs);
    } else if (searchInputText.length > 0 && searchPriority === 'All') {
      const filteredJobs = jobs.filter(job => job.name.toLowerCase().includes(searchInputText.toLowerCase()));
      setWhichArrayUse(filteredJobs);
    } else if (searchPriority !== 'All') {
      const filteredJobs = jobs.filter(job => job.priority === searchPriority);
      setWhichArrayUse(filteredJobs);
    } else {
      setWhichArrayUse(jobs);
    }
  }, [searchInputText, searchPriority, jobs])

  return (
    <div className="App">

      {createJobSection()}

      {<Divider />}

      {jobsArea()}

      {editModal()}

      {deleteJobModal()}

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