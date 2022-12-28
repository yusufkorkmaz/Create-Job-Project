import React from 'react';
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import SearchJobSection from "../../featureComponents/searchJobSection/searchJobSection";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { UserJobs } from '../../../context/jobsContext';
import { AppModal } from '../../../context/modalContext';

const JobsList = () => {

    const { setShowJobDeleteModalState, setShowJobEditModalState } = AppModal();
    const { setSelectedJobState, setSelectedJobIndexState, getSelectedJobIndex, getWhichArrayUse } = UserJobs();

    const editButtonOnClickInTable = (job, index) => {
        setSelectedJobIndexState(index);
        setSelectedJobState(job);
        setShowJobEditModalState(true)
    }

    const deleteButtonOnClickInTable = (index) => {
        getSelectedJobIndex(index);
        setShowJobDeleteModalState(true);
    }

    return <Box>
        <SearchJobSection />
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
                    {getWhichArrayUse().sort((a, b) => {
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

export default JobsList