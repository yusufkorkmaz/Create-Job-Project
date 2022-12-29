import { InputAdornment, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import CustomSelectInput from '../customSelectInput/customSelectInput';
import { JobPriorities } from '../../../context/prioritiesContext';
import { UserJobs } from '../../../context/jobsContext';
import { SearchJobs } from '../../../context/searchContext';

const SearchJobSection = () => {
    const { getPriorities } = JobPriorities();
    const { getJobs, getWhichArrayUse } = UserJobs();
    const { getSearchInputText, setSearchInputTextState, getSearchPriority, setSearchPriorityState } = SearchJobs();

    const setSearchPriority = (event) => {
        setSearchPriorityState(event.target.value);
    }

    const setSearchInputText = (event) => {
        setSearchInputTextState(event.target.value);
    }

    return <Box className='search-area'>
        <Box className='job-content-headers'>
            <h2 className='jobs-header'>{getJobs().length} Jobs</h2>
            {(getSearchPriority() !== 'All' || getSearchInputText().length > 0)  && <h2 className='jobs-header'>{getWhichArrayUse().length} Match</h2> }
        </Box>

        <Box className='search-input-wrapper' >
            <TextField
                disabled={getJobs().length === 0}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
                onChange={setSearchInputText} id="search-input" className='search-input' label="Search" variant="outlined" />
        </Box>

        <Box>
            <CustomSelectInput
                defaultValue="All"
                type="sort"
                disabled={getJobs().length === 0}
                label="Priority *"
                value={getSearchPriority()}
                onChange={setSearchPriority}
                options={
                    getPriorities()
                }
            />
        </Box>
    </Box>
}

export default SearchJobSection