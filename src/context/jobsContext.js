import React, { createContext, useState, useContext } from 'react';

const JobsContext = createContext();

export const JobsProvider = ({children}) => {
    const [jobs, setJobs] = useState(JSON.parse(localStorage.getItem('jobs')) || []);
    const [selectedJob, setSelectedJobState] = useState({});
    const [selectedJobIndex, setSelectedJobIndex] = useState(0);

    const getJobs = () => {
        return jobs;
    };

    const getSelectedJob = () => {
        return selectedJob;
    };

    const getSelectedJobIndex = () => {
        return selectedJobIndex;
    };

    const setSelectedJobIndexState = (index) => {
        setSelectedJobIndex(index);
    };

    const setSelectedJob = (id) => {
        setSelectedJobState(jobs.find((job) => job.id === id));
    };

    const addJob = (job) => {
        setJobs((prevJobs) => [...prevJobs, job]);
    };

    const removeJob = (id) => {
        setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
    };

    const setNewJobs = (jobs) => {
        setJobs(jobs);
    };

    return (
        <JobsContext.Provider value={{ getJobs, getSelectedJob, addJob, removeJob, setNewJobs, setSelectedJob, getSelectedJobIndex, setSelectedJobIndexState }}>
            {children}
        </JobsContext.Provider>
    );
}

export const UserJobs = () => {
    return useContext(JobsContext);
}
