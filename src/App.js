import { Divider } from '@mui/material';
import React, { useEffect } from 'react';
import './App.scss';
import CustomSnackBar from './components/genericComponents/customSnackBar/customSnackBar';
import EditJobModal from './components/genericComponents/modals/editJobModal';
import DeleteJobModal from './components/genericComponents/modals/deleteJobModal';
import { UserJobs } from './context/jobsContext';
import JobsList from './components/genericComponents/jobsList/jobsList';
import { JobPriorities } from './context/prioritiesContext';
import { SearchJobs } from './context/searchContext';
import CreateJobSection from './components/featureComponents/createJobSection/createJobSection';
import { AppSnackbar } from './context/snackBarContext';

function App() {
  const { getJobs, getSelectedJob, setWhichArrayUseState, setFilteredJobsState } = UserJobs();
  const { getPriorities, getPrioritiesInApi } = JobPriorities();
  const { getSearchPriority, getSearchInputText, } = SearchJobs();
  const { getErrorSnackbarMessage, getShowErrorSnackbar, getShowSuccessSnackbar, setShowErrorSnackbarState, setShowSuccessSnackbarState } = AppSnackbar();

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

      <CreateJobSection />

      <Divider className="divider" />

      <JobsList />

      <EditJobModal job={getSelectedJob()}/>

      <DeleteJobModal />

      <CustomSnackBar type='success' open={getShowSuccessSnackbar()} onClose={() => setShowSuccessSnackbarState(false)} message='Success!' />

      <CustomSnackBar type='error' open={getShowErrorSnackbar()} onClose={() => setShowErrorSnackbarState(false)} message={getErrorSnackbarMessage()} />

    </div>
  );
}

export default App;