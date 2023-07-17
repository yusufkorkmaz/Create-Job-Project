import { Button, Modal, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { UserJobs } from '../../../context/jobsContext';
import { AppModal } from '../../../context/modalContext';
import { JobPriorities, selectImportanceLevel } from '../../../context/prioritiesContext';
import CustomSelectInput from '../../featureComponents/customSelectInput/customSelectInput';

const EditJobModal = () => {

    const { getPrioritiesListComponent } = JobPriorities();
    const { getJobs, getSelectedJob, setNewJobs, getSelectedJobIndex } = UserJobs();
    const { getShowJobEditModal, setShowJobEditModalState } = AppModal();

    const [priority, setPriority] = useState();

    const onClose = () => {
        setShowJobEditModalState(false);
    }

    const editPriority = () => {
        const jobs = getJobs();
        const selectedJobIndex = getSelectedJobIndex();
        jobs[selectedJobIndex].priority = priority;
        jobs[selectedJobIndex].importanceLevel = selectImportanceLevel(priority);
        setNewJobs(jobs);
        localStorage.setItem('jobs', JSON.stringify(jobs));
        onClose();
    }

    const returnPriority = () => {
        setPriority(getSelectedJob().priority);
    }

    const closeModal = () => {
        returnPriority();
        onClose();
    }

    const changePriority = (event) => {
        setPriority(event.target.value);
    }

    useEffect(() => {
        if (getSelectedJob().priority) {
            returnPriority();
        }
    }, [getSelectedJob().priority])

    return <Modal
        open={getShowJobEditModal()}
        onClose={onClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
    >
        <Box className='modal-wrapper'>
            <Box className='modal edit-job-modal'>
                <Box>
                    <h2 id="parent-modal-title">Edit Job</h2>

                    <TextField disabled fullWidth id="outlined-basic" label="Job Name" value={getSelectedJob().name} variant="outlined" />
                    <Box className='select-priority-in-modal'>
                        <CustomSelectInput
                            label="Priority *"
                            value={priority || ''}
                            onChange={changePriority}
                            options={getPrioritiesListComponent()}
                        />
                    </Box>
                </Box>
                <Box className='edit-job-modal-buttons'>
                    <Button variant="contained" color='info' onClick={editPriority}>Complete</Button>
                    <Button color='info' onClick={closeModal}>Cancel</Button>
                </Box>
            </Box>
        </Box>
    </Modal>
}

export default EditJobModal