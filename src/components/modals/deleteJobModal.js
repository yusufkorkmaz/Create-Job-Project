import { Box, Button, Modal } from "@mui/material";
import React from "react";
import { UserJobs } from "../../context/jobsContext";

const DeleteJobModal = (show, onClose) => {

    const { getJobs, setNewJobs, getSelectedJobIndex } = UserJobs();

    const completeDeleteJobButtonOnClickInModal = () => {
        let tempJobs = [...getJobs()];
        tempJobs.splice(getSelectedJobIndex(), 1);
        setNewJobs(tempJobs);
        onClose();
    }

    return <Modal
        open={show}
        onClose={onClose}
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
                    <Button color='info' onClick={onClose}>Cancel</Button>
                </Box>
            </Box>
        </Box>
    </Modal>
}

export default DeleteJobModal