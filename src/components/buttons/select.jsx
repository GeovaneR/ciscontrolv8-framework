import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({
  label,
  minWidth,
  items = [],
  value,
  onChange,
}) {
  return (
    <Box sx={{ minWidth }}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          value={value ?? ""}
          label={label}
          onChange={(e) => {
            console.log(`BasicSelect (${label}) mudou:`, e.target.value);
            if (onChange) onChange(e); // repassa pro pai
          }}
        >
          {items.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
