import React, { createContext, useContext, useState } from 'react';

const SnackBarContext = createContext();

export const SnackBarProvider = ({ children }) => {
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
    const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
    const [errorSnackbarMessage, setErrorSnackbarMessage] = useState('');

    const getErrorSnackbarMessage = () => {
        return errorSnackbarMessage;
    }

    const setErrorSnackbarMessageState = (errorSnackbarMessage) => {
        setErrorSnackbarMessage(errorSnackbarMessage);
    }

    const getShowErrorSnackbar = () => {
        return showErrorSnackbar;
    }

    const getShowSuccessSnackbar = () => {
        return showSuccessSnackbar;
    }

    const setShowErrorSnackbarState = (showErrorSnackbar) => {
        setShowErrorSnackbar(showErrorSnackbar);
    }

    const setShowSuccessSnackbarState = (showSuccessSnackbar) => {
        setShowSuccessSnackbar(showSuccessSnackbar);
    }

    return (
        <SnackBarContext.Provider value={{ getErrorSnackbarMessage, setErrorSnackbarMessageState, getShowErrorSnackbar, getShowSuccessSnackbar, setShowErrorSnackbarState, setShowSuccessSnackbarState }}>
            {children}
        </SnackBarContext.Provider>
    );
}

export const AppSnackbar = () => {
    return useContext(SnackBarContext);
}
