import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchInputText, setSearchInputText] = useState('');
    const [searchPriority, setSearchPriority] = useState('All');

    const getSearchPriority = () => {
        return searchPriority;
    };

    const setSearchPriorityState = (text) => {
        setSearchPriority(text);
    };

    const getSearchInputText = () => {
        return searchInputText;
    };

    const setSearchInputTextState = (text) => {
        setSearchInputText(text);
    };

    return (
        <SearchContext.Provider value={{ getSearchInputText, setSearchInputTextState, getSearchPriority, setSearchPriorityState }}>
            {children}
        </SearchContext.Provider>
    );
}

export const SearchJobs = () => {
    return useContext(SearchContext);
}
