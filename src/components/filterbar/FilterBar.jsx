import React, { useState } from "react";
import { Box, Checkbox, Typography, Stack, Chip } from "@mui/material";

const FilterBar = ({ onFilterChange }) => {
  const [activeFilters, setActiveFilters] = useState([]);

  const filterOptions = [
    { id: "IG1", label: "IG1", color: { bg: "#C8E6C9", text: "#2E7D32" } },
    { id: "IG2", label: "IG2", color: { bg: "#FFE0B2", text: "#E65100" } },
    { id: "IG3", label: "IG3", color: { bg: "#BBDEFB", text: "#0D47A1" } },
    { id: "ATT&CK", label: "ATT&CK", color: { bg: "#FFCDD2", text: "#B71C1C" } },
    { id: "800171", label: "800171", color: { bg: "#E1BEE7", text: "#4A148C" } },
    { id: "PCI 3.2.1", label: "PCI 3.2.1", color: { bg: "#C8E6C9", text: "#1B5E20" } }
  ];

  const handleFilterClick = (filterId) => {
    let newFilters;
    if (activeFilters.includes(filterId)) {
      newFilters = activeFilters.filter(f => f !== filterId);
    } else {
      newFilters = [...activeFilters, filterId];
    }
    
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        boxShadow: 1,
        px: 2,
        py: 1,
        mb: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 1,
      }}
    >
      {/* Colunas iniciais - MANTIDO "Implementation Group" */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Checkbox size="small" />
        <Typography variant="body2" fontWeight={600}>
          Sub
        </Typography>
        <Typography variant="body2" fontWeight={600}>
          Title
        </Typography>
        <Typography variant="body2" fontWeight={600}>
          Asset Type
        </Typography>
        <Typography variant="body2" fontWeight={600}>
          Implementation Group: {/* MANTIDO no FilterBar */}
        </Typography>
      </Stack>

      {/* Chips de grupos clicáveis */}
      <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="flex-end">
        {filterOptions.map((filter) => (
          <Chip
            key={filter.id}
            label={filter.label}
            size="small"
            clickable
            onClick={() => handleFilterClick(filter.id)}
            variant={activeFilters.includes(filter.id) ? "filled" : "outlined"}
            sx={{ 
              bgcolor: activeFilters.includes(filter.id) ? filter.color.bg : "transparent",
              color: activeFilters.includes(filter.id) ? filter.color.text : "text.primary",
              borderColor: filter.color.text,
              fontWeight: 600,
              '&:hover': {
                bgcolor: filter.color.bg,
                color: filter.color.text,
              }
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default FilterBar;