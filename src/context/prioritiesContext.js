import { Box, CircularProgress, MenuItem } from '@mui/material';
import React, { createContext, useContext, useState } from 'react';
import { AppSnackbar } from './snackBarContext';

const PrioritiesContext = createContext();

export const PrioritiesProvider = ({ children }) => {

    const [priorities, setPriorities] = useState(JSON.parse(localStorage.getItem('priorities')) || []);

    const { setShowErrorSnackbarState, setErrorSnackbarMessageState } = AppSnackbar();

    const getPrioritiesInApi = async () => {
        await fetch('http://localhost:3001/api/priorities')
            .then(response => response.json())
            .then(data => {
                setPriorities(data);
                localStorage.setItem('priorities', JSON.stringify(data));
            }).catch(error => {
                setShowErrorSnackbarState(true);
                setErrorSnackbarMessageState('Error in getting priorities from API');
                console.log(error);
            })
    }

    const setPrioritiesState = (priorities) => {
        setPriorities(priorities);
    }

    const getPriorities = () => {
        return priorities.length > 0 ?
            priorities.map((priority, index) => {
                return <MenuItem key={index} value={priority.name}>{priority.name}</MenuItem>
            }) : <Box className="circular-progress"><CircularProgress />
            </Box>
    }

    return (
        <PrioritiesContext.Provider value={{ getPriorities, getPrioritiesInApi, setPrioritiesState }}>
            {children}
        </PrioritiesContext.Provider>
    );
}

export const JobPriorities = () => {
    return useContext(PrioritiesContext);
}
