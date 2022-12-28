import { Button, CircularProgress, Divider, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { Box } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react';
import './App.scss';
import CustomSnackBar from './components/customSnackBar/customSnackBar';
import EditJobModal from './components/modals/editJobModal';
import DeleteJobModal from './components/modals/deleteJobModal';
import { UserJobs } from './context/jobsContext';

function App() {
  const [searchInputText, setSearchInputText] = useState('');
  const [whichArrayUse, setWhichArrayUse] = useState([]);
  const [jobName, setJobName] = useState('');
  const [priority, setPriority] = useState('');
  const [priorities, setPriorities] = useState(JSON.parse(localStorage.getItem('priorities')) || []);
  const [searchPriority, setSearchPriority] = useState('All');
  const [currentJob, setCurrentJob] = useState({});
  const [showJobEditModal, setShowJobEditModal] = useState(false);
  const [showJobDeleteModal, setShowJobDeleteModal] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showMatchCountText, setShowMatchCountText] = useState(false);
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState('');

  const { setNewJobs, getJobs, getSelectedJobIndex } = UserJobs();


  //Functions
  const getPrioritiesInApi = async () => {
    await fetch('http://localhost:3001/api/priorities')
      .then(response => response.json())
      .then(data => {
        setPriorities(data);
        localStorage.setItem('priorities', JSON.stringify(data));
        console.log(data);
      }).catch(error => {
        console.log(error);
        showErrorSnackbar(true);
        setErrorSnackbarMessage('Error in getting priorities from API');
      })
  }
  const handleJobName = (event) => {
    setJobName(event.target.value);
  };
  const changePriority = (event) => {
    setPriority(event.target.value);
  };
  const changeSearchPriority = (event) => {
    setSearchPriority(event.target.value);
  };
  const createJob = () => {
    if (priority.length === 0) {
      setErrorSnackbarMessage('Please select a priority');
      setShowErrorSnackbar(true);
    } else if (jobName.length === 0) {
      setErrorSnackbarMessage('Please enter a job name');
      setShowErrorSnackbar(true);
    } else {
      setShowSuccessSnackbar(true);
      setNewJobs([...getJobs(), { "id": getJobs().length, "name": jobName, "priority": priority, "importanceLevel": selectImportanceLevel(priority) }]);
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

  const editButtonOnClickInTable = (job, index) => {
    getSelectedJobIndex(index);
    setCurrentJob(job);
    setShowJobEditModal(true)
  }

  const deleteButtonOnClickInTable = (index) => {
    getSelectedJobIndex(index);
    setShowJobDeleteModal(true);
  }

  const searchOnTable = (event) => {
    setSearchInputText(event.target.value);
  }


  const getPriorities = () => {
    return priorities.length > 0 ?
      priorities.map((priority, index) => {
        return <MenuItem key={index} value={priority.name}>{priority.name}</MenuItem>
      }) : <Box className="circular-progress"><CircularProgress />
      </Box>

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
              {getPriorities()}
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
        <h2 className='jobs-header'>{getJobs().length} Jobs</h2>
        {showMatchCountText && <h2 className='jobs-header'>{whichArrayUse.length} Match</h2>}
      </Box>

      <Box className='search-input-wrapper' >
        <TextField
          disabled={getJobs().length === 0}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          onChange={searchOnTable} id="search-input" className='search-input' label="Search" variant="outlined" />

      </Box>

      <Box>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Priority</InputLabel>
          <Select
            disabled={getJobs().length === 0}
            labelId="demo-simple-select-label"
            label="Priority *"
            id="demo-simple-select"
            defaultValue='All'
            value={searchPriority}
            onChange={changeSearchPriority}
          >
            <MenuItem value={'All'}>All</MenuItem>
            {getPriorities()}
          </Select>
        </FormControl>
      </Box>
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
                  <IconButton onClick={() => { editButtonOnClickInTable(job, index) }} variant="edit">
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


  useEffect(() => {
    if (priorities === null || priorities.length === 0 || Object.keys(priorities).length === 0 || JSON.stringify(priorities) === "{}") {
      getPrioritiesInApi();
    }
  }, [])

  useEffect(() => {
    if (searchInputText.length > 0 && searchPriority !== 'All') {
      const filteredJobs = getJobs().filter(job => job.name.toLowerCase().includes(searchInputText.toLowerCase()) && job.priority.toLowerCase().includes(searchPriority.toLowerCase()));
      setWhichArrayUse(filteredJobs);
      setShowMatchCountText(true);
    } else if (searchInputText.length > 0 && searchPriority === 'All') {
      const filteredJobs = getJobs().filter(job => job.name.toLowerCase().includes(searchInputText.toLowerCase()));
      setWhichArrayUse(filteredJobs);
      setShowMatchCountText(true);
    } else if (searchPriority !== 'All') {
      const filteredJobs = getJobs().filter(job => job.priority === searchPriority);
      setWhichArrayUse(filteredJobs);
      setShowMatchCountText(true);
    } else {
      setWhichArrayUse(getJobs());
      setShowMatchCountText(false);
    }

    localStorage.setItem('jobs', JSON.stringify(getJobs()));
  }, [searchInputText, searchPriority, getJobs()])



  return (
    <div className="App">

      {createJobSection()}

      {<Divider className="divider" />}

      {jobsArea()}

      {EditJobModal(currentJob, showJobEditModal, () => setShowJobEditModal(false))}

      {DeleteJobModal(showJobDeleteModal, () => setShowJobDeleteModal(false))}

      {CustomSnackBar('success', showSuccessSnackbar, () => setShowSuccessSnackbar(false), 'Success!')}

      {CustomSnackBar('error', showErrorSnackbar, () => setShowErrorSnackbar(false), errorSnackbarMessage)}

    </div>
  );
}

export default App;