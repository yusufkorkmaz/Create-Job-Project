import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [showJobDeleteModal, setShowJobDeleteModal] = useState(false);
    const [showJobEditModal, setShowJobEditModal] = useState(false);

    const getShowJobDeleteModal = () => {
        return showJobDeleteModal;
    }

    const setShowJobDeleteModalState = (showJobDeleteModal) => {
        setShowJobDeleteModal(showJobDeleteModal);
    }

    const getShowJobEditModal = () => {
        return showJobEditModal;
    }

    const setShowJobEditModalState = (showJobEditModal) => {
        setShowJobEditModal(showJobEditModal);
    }

    return (
        <ModalContext.Provider value={{ getShowJobDeleteModal, setShowJobDeleteModalState, getShowJobEditModal, setShowJobEditModalState }}>
            {children}
        </ModalContext.Provider>
    );
}

export const AppModal = () => {
    return useContext(ModalContext);
}
