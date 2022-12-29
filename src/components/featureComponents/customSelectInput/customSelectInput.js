import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const CustomSelectInput = ({ type, defaultValue, disabled, label, value, onChange, options }) => {
    return <FormControl fullWidth>
        <InputLabel id="custom-select-label">{label}</InputLabel>
        <Select
            defaultValue={defaultValue}
            disabled={disabled}
            labelId="custom-select-label"
            label={label}
            fullWidth
            value={value}
            onChange={onChange}
        >
            {type === 'sort' &&
                <MenuItem value={'All'}>All</MenuItem>
            }
            {options}
        </Select>
    </FormControl>
}

export default CustomSelectInput;
