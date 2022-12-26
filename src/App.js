import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';

import React, { useState } from 'react';
import './App.scss';

function App() {

  const [priority, setPriority] = useState('');

  const handleChange = (event) => {
    setPriority(event.target.value);
  };

  return (
    <div className="App">
      <Box className="create-new-job-wrapper">

        <h2>Create New Job</h2>

        <Box className="create-job-items">
          <TextField required fullWidth id="outlined-basic" label="Job Name" variant="outlined" />

          <Box className="select-priority-box">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Priority *</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="Priority *"
                id="demo-simple-select"
                fullWidth
                value={priority}
                onChange={handleChange}
              >
                <MenuItem value={'Urgent'}>Urgent</MenuItem>
                <MenuItem value={'Regular'}>Regular</MenuItem>
                <MenuItem value={'Trivial'}>Trivial</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Button className='create-button' variant="contained">Create</Button>
        </Box>
      </Box>
    </div>
  );
}

export default App;
