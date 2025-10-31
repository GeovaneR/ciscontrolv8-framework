import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function BasicSelect({ label, minWidth, items = [] }) {
    const [status, setStatus] = React.useState('');

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    return (
        <Box sx={{minWidth}}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-autowidth-label">{label}</InputLabel>
                <Select
                    labelId="select-label"
                    id="simple-select"
                    value={status}
                    label={label}
                    onChange={handleChange}
                >
                    {items.map((item, index) => (
                        <MenuItem key={index} value={index + 1}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}