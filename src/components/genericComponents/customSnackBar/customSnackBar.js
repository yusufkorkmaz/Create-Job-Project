import React from 'react';

import { Alert, Snackbar } from '@mui/material';
import { AppSnackbar } from '../../../context/snackBarContext';

const CustomSnackBar = ({ type }) => {
    const { getErrorSnackbarMessage, getShowErrorSnackbar, getShowSuccessSnackbar, setShowErrorSnackbarState, setShowSuccessSnackbarState } = AppSnackbar();

    const handleClose = () => {
        if (type === 'error') {
            setShowErrorSnackbarState(false);
        } else {
            setShowSuccessSnackbarState(false);
        }

    };

    const showSnackBar = () => {
        if (type === 'error') {
            return getShowErrorSnackbar();
        } else {
            return getShowSuccessSnackbar();
        }
    }

    const getText = () => {
        if (type === 'error') {
            return getErrorSnackbarMessage();
        } else {
            return 'Success!';
        }
    }

    return <Snackbar
        open={showSnackBar()}
        onClose={handleClose}
        message={getText()}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
            {getText()}
        </Alert>
    </Snackbar>
}

export default CustomSnackBar