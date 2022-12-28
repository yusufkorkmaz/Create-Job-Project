import { Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { UserJobs } from '../../../context/jobsContext';

const EditJobModal = (job, show, onClose) => {

    const { getJobs, setNewJobs, getSelectedJobIndex } = UserJobs();

    const [priority, setPriority] = useState('');

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

    const changeCurrentJobPriority = (event) => {
        setPriority(event.target.value);
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
        setPriority(job.priority);
    }


    const closeModal = () => {
        returnPriority();
        onClose();
    }
    
    useEffect(() => {
        if (job.priority)
            setPriority(job.priority);
    }, [job.priority])

    return <Modal
        open={show}
        onClose={onClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
    >
        <Box className='modal-wrapper'>
            <Box className='modal edit-job-modal'>
                <Box>
                    <h2 id="parent-modal-title">Edit Job</h2>

                    <TextField disabled fullWidth id="outlined-basic" label="Job Name" value={job.name} variant="outlined" />
                    <Box className='select-priority-in-modal'>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                label="Priority *"
                                id="demo-simple-select"
                                fullWidth
                                value={priority}
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
                    <Button variant="contained" color='info' onClick={editPriority}>Complete</Button>
                    <Button color='info' onClick={closeModal}>Cancel</Button>
                </Box>
            </Box>
        </Box>
    </Modal>
}

export default EditJobModal