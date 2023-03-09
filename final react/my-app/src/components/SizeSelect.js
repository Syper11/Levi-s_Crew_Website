import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SizeSelect({size, setSize}) {

  const handleChange = (event) => {
    setSize(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="size-select-label">Size</InputLabel>
        <Select
          labelId="size-select-label"
          id="size-select"
          value={size}
          label="Size"
          onChange={handleChange}
        >
          <MenuItem value="Youth XS">Youth XS</MenuItem>
          <MenuItem value="Youth S">Youth S</MenuItem>
          <MenuItem value="Youth M">Youth M</MenuItem>
          <MenuItem value="Youth L">Youth L</MenuItem>
          <MenuItem value="Youth XL">Youth XL</MenuItem>
          <MenuItem value="Small">Small</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Large">Large</MenuItem>
          <MenuItem value="XL">Extra Large</MenuItem>
          <MenuItem value="2XL">2X Large</MenuItem>
          <MenuItem value="3XL">3X Large</MenuItem>
          <MenuItem value="4XL">4X Large</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}




