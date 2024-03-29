import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { UserJobs } from "../../../context/jobsContext";
import { JobPriorities } from '../../../context/prioritiesContext';
import { AppSnackbar } from '../../../context/snackBarContext';
import CustomSelectInput from '../customSelectInput/customSelectInput';
import { selectImportanceLevel } from '../../../context/prioritiesContext';

const CreateJobSection = () => {

    const [jobName, setJobName] = useState('');
    const [priority, setPriority] = useState('');

    const { getJobs, addJob } = UserJobs();
    const { getPrioritiesListComponent } = JobPriorities();
    const { setShowSuccessSnackbarState, setShowErrorSnackbarState, setErrorSnackbarMessageState } = AppSnackbar();

    const handleJobName = (event) => {
        setJobName(event.target.value);
    }

    const changePriority = (event) => {
        setPriority(event.target.value);
    }

    const createJob = () => {
        if (priority.length === 0 || jobName.length === 0) {
            setErrorSnackbarMessageState('Please fill all the fields');
            setShowErrorSnackbarState(true);
        }  else {
            setShowSuccessSnackbarState(true);
            addJob({ "id": getJobs().length, "name": jobName, "priority": priority, "importanceLevel": selectImportanceLevel(priority) });
            setJobName('');
            setPriority('');
        }
    }

    return <Box className="create-new-job-wrapper">
        <h2>Create New Job</h2>
        <Box className="create-job-items">
            <TextField required fullWidth id="outlined-basic" className='job-name' label="Job Name" value={jobName} onChange={handleJobName} variant="outlined" />
            <Box className="select-priority-for-create-new-job-wrapper">
                <CustomSelectInput
                    label="Priority *"
                    value={priority}
                    onChange={changePriority}
                    options={getPrioritiesListComponent()}
                />
            </Box>

            <Button onClick={createJob} variant="contained">Create</Button>
        </Box>
    </Box>
}

export default CreateJobSection;