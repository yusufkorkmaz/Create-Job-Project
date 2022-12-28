import { Button, Divider, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import './App.scss';
import CustomSnackBar from './components/genericComponents/customSnackBar/customSnackBar';
import EditJobModal from './components/genericComponents/modals/editJobModal';
import DeleteJobModal from './components/genericComponents/modals/deleteJobModal';
import { UserJobs } from './context/jobsContext';
import CustomSelectInput from './components/featureComponents/customSelectInput/customSelectInput';
import JobsList from './components/genericComponents/jobsList/jobsList';
import { JobPriorities } from './context/prioritiesContext';
import { SearchJobs } from './context/searchContext';
import { AppModal } from './context/modalContext';

function App() {
  const [jobName, setJobName] = useState('');
  const [priority, setPriority] = useState('');
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState('');

  const { addJob, getJobs, getSelectedJob, setWhichArrayUseState, setFilteredJobsState } = UserJobs();
  const { getPriorities, getPrioritiesInApi } = JobPriorities();
  const { getSearchPriority, getSearchInputText, } = SearchJobs();
  const {getShowJobDeleteModal, setShowJobDeleteModalState, getShowJobEditModal, setShowJobEditModalState} = AppModal();

  const handleJobName = (event) => {
    setJobName(event.target.value);
  };
  const changePriority = (event) => {
    setPriority(event.target.value);
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
      addJob({ "id": getJobs().length, "name": jobName, "priority": priority, "importanceLevel": selectImportanceLevel(priority) });
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

  //Components
  const createJobSection = () => {
    return <Box className="create-new-job-wrapper">
      <h2>Create New Job</h2>
      <Box className="create-job-items">
        <TextField required fullWidth id="outlined-basic" className='job-name' label="Job Name" value={jobName} onChange={handleJobName} variant="outlined" />
        <CustomSelectInput
          label="Priority *"
          value={priority}
          onChange={changePriority}
          options={getPriorities()}
        />
        <Button onClick={createJob} variant="contained">Create</Button>
      </Box>
    </Box>
  }

  useEffect(() => {
    if (getPriorities() === null || getPriorities().length === 0 || Object.keys(getPriorities()).length === 0 || JSON.stringify(getPriorities()) === "{}") {
      getPrioritiesInApi();
    }
  }, [])

  useEffect(() => {
    let filteredJobs = getJobs();
  
    if (getSearchInputText().length > 0) {
      filteredJobs = filteredJobs.filter(job => job.name.toLowerCase().includes(getSearchInputText().toLowerCase()));
    }
  
    if (getSearchPriority() !== 'All') {
      filteredJobs = filteredJobs.filter(job => job.priority.toLowerCase().includes(getSearchPriority().toLowerCase()));
    }
  
    setFilteredJobsState(filteredJobs);
    setWhichArrayUseState(filteredJobs);
  
    localStorage.setItem('jobs', JSON.stringify(getJobs()));
  }, [getSearchInputText(), getSearchPriority(), getJobs()])

  return (
    <div className="App">

      {createJobSection()}

      {<Divider className="divider" />}

      {JobsList()}

      {EditJobModal(getSelectedJob(), getShowJobEditModal(), () => setShowJobEditModalState(false))}

      {DeleteJobModal(getShowJobDeleteModal(), () => setShowJobDeleteModalState(false))}

      {CustomSnackBar('success', showSuccessSnackbar, () => setShowSuccessSnackbar(false), 'Success!')}

      {CustomSnackBar('error', showErrorSnackbar, () => setShowErrorSnackbar(false), errorSnackbarMessage)}

    </div>
  );
}

export default App;