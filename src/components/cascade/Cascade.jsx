import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Link,
  Chip,
  Stack
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArticleIcon from "@mui/icons-material/Article";
import { Link as RouterLink } from "react-router-dom";
import { cisControls } from "../../data/ciscontrols";
import FilterBar from "../filterbar/FilterBar.jsx";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';



const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const Cascade = () =>{
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={cisControls}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  )
}
// // Função para obter as cores dos grupos
// const getGroupColor = (group) => {
//   const colors = {
//     "IG1": { bg: "#C8E6C9", text: "#2E7D32" },
//     "IG2": { bg: "#FFE0B2", text: "#E65100" },
//     "IG3": { bg: "#BBDEFB", text: "#0D47A1" },
//     "ATT&CK": { bg: "#FFCDD2", text: "#B71C1C" },
//     "800171": { bg: "#E1BEE7", text: "#4A148C" },
//     "PCI 3.2.1": { bg: "#C8E6C9", text: "#1B5E20" }
//   };
//   return colors[group] || { bg: "#E0E0E0", text: "#424242" };
// };

// const Cascade = () => {
//   const [activeFilters, setActiveFilters] = useState([]);

//   // Função para lidar com filtros do FilterBar
//   const handleFilterChange = (filters) => {
//     setActiveFilters(filters);
//   };

//   // Função para verificar se um controle deve ser exibido baseado nos filtros
//   const shouldDisplayControl = (control) => {
//     if (activeFilters.length === 0) return true;
    
//     return activeFilters.some(filter => 
//       control.implementationGroups?.includes(filter) ||
//       control.topics.some(topic => 
//         topic.implementationGroups?.includes(filter)
//       )
//     );
//   };

//   // Função para verificar se um tópico deve ser exibido baseado nos filtros
//   const shouldDisplayTopic = (topic) => {
//     if (activeFilters.length === 0) return true;
    
//     return activeFilters.some(filter => 
//       topic.implementationGroups?.includes(filter)
//     );
//   };

//   return (
//     <Box sx={{ width: "95%", margin: "auto", mt: 4 }}>
//       <FilterBar onFilterChange={handleFilterChange} />

//       {cisControls.map((control) => {
//         if (!shouldDisplayControl(control)) return null;
        
//         return (
//           <Accordion key={control.id} sx={{ mb: 2 }}>
//             <AccordionSummary
//               expandIcon={<ExpandMoreIcon sx={{ color: "primary.main" }} />}
//               sx={{
//                 flexDirection: "row-reverse",
//                 "& .MuiAccordionSummary-content": { 
//                   ml: 1,
//                   display: "flex",
//                   alignItems: "center",
//                   minHeight: '80px', // Aumenta a altura mínima
//                 },
//                 minHeight: '80px !important', // Aumenta a altura mínima
//                 height: 'auto',
//                 py: 2, // Adiciona padding vertical
//               }}
//             >
//               <Box sx={{ 
//                 display: "flex", 
//                 flexDirection: "column", 
//                 width: "100%",
//                 gap: 1 // Adiciona espaçamento entre os elementos
//               }}>
//                 {/* Linha 1: ID e Título (SEM Implementation Group no texto) */}
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <Typography sx={{ 
//                     fontWeight: "bold",
//                     fontSize: "1.1rem"
//                   }}>
//                     {control.id}: {control.title} 
//                   </Typography>
//                 </Box>

//                 {/* Linha 2: Descrição e contador de tópicos */}
//                 <Typography variant="body2" sx={{ color: "text.secondary" }}>
//                   {control.description}{" "}
//                   <Box component="span" sx={{ color: "primary.main", fontWeight: 500 }}>
//                     ({control.topics.length} tópicos)
//                   </Box>
//                 </Typography>

//                 {/* Linha 3: Bolinhas coloridas (Implementation Groups visuais) */}
//                 <Stack direction="row" spacing={0.5}>
//                   {control.implementationGroups?.map((group) => {
//                     const color = getGroupColor(group);
//                     return (
//                       <Box
//                         key={group}
//                         sx={{
//                           width: 20,
//                           height: 20,
//                           borderRadius: "50%",
//                           backgroundColor: color.bg,
//                           border: `2px solid ${color.text}`,
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           fontSize: "10px",
//                           fontWeight: "bold",
//                           color: color.text
//                         }}
//                         title={group}
//                       >
//                         {group.charAt(2)}
//                       </Box>
//                     );
//                   })}
//                 </Stack>
//               </Box>
//             </AccordionSummary>

//             <AccordionDetails sx={{ pt: 0 }}>
//               <List dense>
//                 {control.topics.map((topic) => {
//                   if (!shouldDisplayTopic(topic)) return null;
                  
//                   return (
//                     <ListItem key={topic.id} sx={{ py: 1.5 }}>
//                       <ListItemIcon sx={{ minWidth: 60 }}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                           <ChevronRightIcon sx={{ color: "primary.main" }} />
//                           <ArticleIcon sx={{ color: "primary.main" }} />
                          
//                           {/* Bolinhas coloridas para o tópico */}
//                           <Stack direction="row" spacing={0.3}>
//                             {topic.implementationGroups?.map((group) => {
//                               const color = getGroupColor(group);
//                               return (
//                                 <Box
//                                   key={group}
//                                   sx={{
//                                     width: 16,
//                                     height: 16,
//                                     borderRadius: "50%",
//                                     backgroundColor: color.bg,
//                                     border: `1px solid ${color.text}`,
//                                     display: "flex",
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                     fontSize: "9px",
//                                     fontWeight: "bold",
//                                     color: color.text
//                                   }}
//                                   title={group}
//                                 >
//                                   {group.charAt(2)}
//                                 </Box>
//                               );
//                             })}
//                           </Stack>
//                         </Box>
//                       </ListItemIcon>
                      
//                       <ListItemText
//                         primary={
//                           <Link
//                             component={RouterLink}
//                             to={`/control/detail?id=${topic.id}`}
//                             underline="hover"
//                             sx={{
//                               color: "primary.main",
//                               fontWeight: 500,
//                               fontSize: "0.95rem",
//                               "&:hover": { color: "primary.dark" }
//                             }}
//                           >
//                             {topic.name}
//                           </Link>
//                         }
//                         secondary={
//                           <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
//                             {topic.description}
//                           </Typography>
//                         }
//                       />
//                     </ListItem>
//                   );
//                 })}
//               </List>
//             </AccordionDetails>
//           </Accordion>
//         );
//       })}
//     </Box>
//   );
// };

export default Cascade;