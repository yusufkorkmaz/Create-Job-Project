import React, { createContext, useState, useContext } from 'react';

const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
    const [jobs, setJobs] = useState(JSON.parse(localStorage.getItem('jobs')) || []);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState({});
    const [selectedJobIndex, setSelectedJobIndex] = useState(0);
    const [whichArrayUse, setWhichArrayUse] = useState(jobs);

    const getJobs = () => {
        return jobs;
    };

    const getFilteredJobs = () => {
        return filteredJobs;
    };

    const setFilteredJobsState = (jobs) => {
        setFilteredJobs(jobs);
    };

    const getWhichArrayUse = () => {
        return whichArrayUse;
    };

    const setWhichArrayUseState = (array) => {
        setWhichArrayUse(array);
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

    const setSelectedJobState = (job) => {
        setSelectedJob(job);
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
        <JobsContext.Provider value={{ getJobs, getFilteredJobs, getWhichArrayUse, setWhichArrayUseState, setFilteredJobsState, getSelectedJob, addJob, removeJob, setNewJobs, setSelectedJobState, getSelectedJobIndex, setSelectedJobIndexState }}>
            {children}
        </JobsContext.Provider>
    );
}

export const UserJobs = () => {
    return useContext(JobsContext);
}
