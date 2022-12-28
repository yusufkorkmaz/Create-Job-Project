import React from 'react';

import { Alert, Snackbar } from '@mui/material';

const CustomSnackBar = (type, showSnackBar, handleClose, text) => {
    return <Snackbar
        open={showSnackBar}
        onClose={handleClose}
        message={text}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
            {text}
        </Alert>
    </Snackbar>
}

export default CustomSnackBar