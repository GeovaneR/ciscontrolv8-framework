// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Box,
//   Checkbox,
//   Typography,
//   Stack,
//   Chip
// } from "@mui/material";

// // Componente FilterBar (mantido como você tinha)
// const FilterBar = ({ onFilterChange }) => {
//   const [activeFilters, setActiveFilters] = useState([]);

//   const filterOptions = [
//     { id: "IG1", label: "IG1", color: { bg: "#C8E6C9", text: "#2E7D32" } },
//     { id: "IG2", label: "IG2", color: { bg: "#FFE0B2", text: "#E65100" } },
//     { id: "IG3", label: "IG3", color: { bg: "#BBDEFB", text: "#0D47A1" } },
//     { id: "ATT&CK", label: "ATT&CK", color: { bg: "#FFCDD2", text: "#B71C1C" } },
//     { id: "800171", label: "800171", color: { bg: "#E1BEE7", text: "#4A148C" } },
//     { id: "PCI 3.2.1", label: "PCI 3.2.1", color: { bg: "#C8E6C9", text: "#1B5E20" } }
//   ];

//   const handleFilterClick = (filterId) => {
//     let newFilters;
//     if (activeFilters.includes(filterId)) {
//       newFilters = activeFilters.filter(f => f !== filterId);
//     } else {
//       newFilters = [...activeFilters, filterId];
//     }
    
//     setActiveFilters(newFilters);
//     onFilterChange(newFilters);
//   };

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         bgcolor: "background.paper",
//         border: "1px solid",
//         borderColor: "divider",
//         borderRadius: 1,
//         boxShadow: 1,
//         px: 2,
//         py: 1,
//         mb: 2,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         flexWrap: "wrap",
//         gap: 1,
//       }}
//     >
//       <Stack direction="row" spacing={2} alignItems="center">
//         <Checkbox size="small" />
//         <Typography variant="body2" fontWeight={600}>
//           Sub
//         </Typography>
//         <Typography variant="body2" fontWeight={600}>
//           Title
//         </Typography>
//         <Typography variant="body2" fontWeight={600}>
//           Asset Type
//         </Typography>
//         <Typography variant="body2" fontWeight={600}>
//           Implementation Group:
//         </Typography>
//       </Stack>

//       <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="flex-end">
//         {filterOptions.map((filter) => (
//           <Chip
//             key={filter.id}
//             label={filter.label}
//             size="small"
//             clickable
//             onClick={() => handleFilterClick(filter.id)}
//             variant={activeFilters.includes(filter.id) ? "filled" : "outlined"}
//             sx={{ 
//               bgcolor: activeFilters.includes(filter.id) ? filter.color.bg : "transparent",
//               color: activeFilters.includes(filter.id) ? filter.color.text : "text.primary",
//               borderColor: filter.color.text,
//               fontWeight: 600,
//               '&:hover': {
//                 bgcolor: filter.color.bg,
//                 color: filter.color.text,
//               }
//             }}
//           />
//         ))}
//       </Stack>
//     </Box>
//   );
// };

// // Componente Cascade com FilterBar ACIMA da tabela
// export function Cascade() {
//   const [activeFilters, setActiveFilters] = useState([]);

//   const handleFilterChange = (filters) => {
//     setActiveFilters(filters);
//     console.log("Filtros ativos:", filters);
//   };

//   // Exemplo de rows
//   const rows = [
//     { name: "Frozen yoghurt", calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
//     { name: "Ice cream sandwich", calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
//     { name: "Eclair", calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
//   ];

//   // Componente Row
//   const Row = ({ row }) => (
//     <TableRow>
//       <TableCell>{/* Ícone para expandir/colapsar */}</TableCell>
//       <TableCell>{row.name}</TableCell>
//       <TableCell align="right">{row.calories}</TableCell>
//       <TableCell align="right">{row.fat}</TableCell>
//       <TableCell align="right">{row.carbs}</TableCell>
//       <TableCell align="right">{row.protein}</TableCell>
//     </TableRow>
//   );

//   return (
//     <Box>
//       {/* FilterBar ACIMA da tabela */}
//       <FilterBar onFilterChange={handleFilterChange} />
      
//       {/* Tabela com cabeçalho normal */}
//       <TableContainer component={Paper}>
//         <Table aria-label="collapsible table">
//           <TableHead>
//             <TableRow>
//               <TableCell />
//               <TableCell>Dessert (100g serving)</TableCell>
//               <TableCell align="right">Calories</TableCell>
//               <TableCell align="right">Fat&nbsp;(g)</TableCell>
//               <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//               <TableCell align="right">Protein&nbsp;(g)</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row) => (
//               <Row key={row.name} row={row} />
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// }
// // // Função para obter as cores dos grupos
// // const getGroupColor = (group) => {
// //   const colors = {
// //     "IG1": { bg: "#C8E6C9", text: "#2E7D32" },
// //     "IG2": { bg: "#FFE0B2", text: "#E65100" },
// //     "IG3": { bg: "#BBDEFB", text: "#0D47A1" },
// //     "ATT&CK": { bg: "#FFCDD2", text: "#B71C1C" },
// //     "800171": { bg: "#E1BEE7", text: "#4A148C" },
// //     "PCI 3.2.1": { bg: "#C8E6C9", text: "#1B5E20" }
// //   };
// //   return colors[group] || { bg: "#E0E0E0", text: "#424242" };
// // };

// // const Cascade = () => {
// //   const [activeFilters, setActiveFilters] = useState([]);

// //   // Função para lidar com filtros do FilterBar
// //   const handleFilterChange = (filters) => {
// //     setActiveFilters(filters);
// //   };

// //   // Função para verificar se um controle deve ser exibido baseado nos filtros
// //   const shouldDisplayControl = (control) => {
// //     if (activeFilters.length === 0) return true;

// //     return activeFilters.some(filter => 
// //       control.implementationGroups?.includes(filter) ||
// //       control.topics.some(topic => 
// //         topic.implementationGroups?.includes(filter)
// //       )
// //     );
// //   };

// //   // Função para verificar se um tópico deve ser exibido baseado nos filtros
// //   const shouldDisplayTopic = (topic) => {
// //     if (activeFilters.length === 0) return true;

// //     return activeFilters.some(filter => 
// //       topic.implementationGroups?.includes(filter)
// //     );
// //   };

// //   return (
// //     <Box sx={{ width: "95%", margin: "auto", mt: 4 }}>
// //       <FilterBar onFilterChange={handleFilterChange} />

// //       {cisControls.map((control) => {
// //         if (!shouldDisplayControl(control)) return null;

// //         return (
// //           <Accordion key={control.id} sx={{ mb: 2 }}>
// //             <AccordionSummary
// //               expandIcon={<ExpandMoreIcon sx={{ color: "primary.main" }} />}
// //               sx={{
// //                 flexDirection: "row-reverse",
// //                 "& .MuiAccordionSummary-content": { 
// //                   ml: 1,
// //                   display: "flex",
// //                   alignItems: "center",
// //                   minHeight: '80px', // Aumenta a altura mínima
// //                 },
// //                 minHeight: '80px !important', // Aumenta a altura mínima
// //                 height: 'auto',
// //                 py: 2, // Adiciona padding vertical
// //               }}
// //             >
// //               <Box sx={{ 
// //                 display: "flex", 
// //                 flexDirection: "column", 
// //                 width: "100%",
// //                 gap: 1 // Adiciona espaçamento entre os elementos
// //               }}>
// //                 {/* Linha 1: ID e Título (SEM Implementation Group no texto) */}
// //                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// //                   <Typography sx={{ 
// //                     fontWeight: "bold",
// //                     fontSize: "1.1rem"
// //                   }}>
// //                     {control.id}: {control.title} 
// //                   </Typography>
// //                 </Box>

// //                 {/* Linha 2: Descrição e contador de tópicos */}
// //                 <Typography variant="body2" sx={{ color: "text.secondary" }}>
// //                   {control.description}{" "}
// //                   <Box component="span" sx={{ color: "primary.main", fontWeight: 500 }}>
// //                     ({control.topics.length} tópicos)
// //                   </Box>
// //                 </Typography>

// //                 {/* Linha 3: Bolinhas coloridas (Implementation Groups visuais) */}
// //                 <Stack direction="row" spacing={0.5}>
// //                   {control.implementationGroups?.map((group) => {
// //                     const color = getGroupColor(group);
// //                     return (
// //                       <Box
// //                         key={group}
// //                         sx={{
// //                           width: 20,
// //                           height: 20,
// //                           borderRadius: "50%",
// //                           backgroundColor: color.bg,
// //                           border: `2px solid ${color.text}`,
// //                           display: "flex",
// //                           alignItems: "center",
// //                           justifyContent: "center",
// //                           fontSize: "10px",
// //                           fontWeight: "bold",
// //                           color: color.text
// //                         }}
// //                         title={group}
// //                       >
// //                         {group.charAt(2)}
// //                       </Box>
// //                     );
// //                   })}
// //                 </Stack>
// //               </Box>
// //             </AccordionSummary>

// //             <AccordionDetails sx={{ pt: 0 }}>
// //               <List dense>
// //                 {control.topics.map((topic) => {
// //                   if (!shouldDisplayTopic(topic)) return null;

// //                   return (
// //                     <ListItem key={topic.id} sx={{ py: 1.5 }}>
// //                       <ListItemIcon sx={{ minWidth: 60 }}>
// //                         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// //                           <ChevronRightIcon sx={{ color: "primary.main" }} />
// //                           <ArticleIcon sx={{ color: "primary.main" }} />

// //                           {/* Bolinhas coloridas para o tópico */}
// //                           <Stack direction="row" spacing={0.3}>
// //                             {topic.implementationGroups?.map((group) => {
// //                               const color = getGroupColor(group);
// //                               return (
// //                                 <Box
// //                                   key={group}
// //                                   sx={{
// //                                     width: 16,
// //                                     height: 16,
// //                                     borderRadius: "50%",
// //                                     backgroundColor: color.bg,
// //                                     border: `1px solid ${color.text}`,
// //                                     display: "flex",
// //                                     alignItems: "center",
// //                                     justifyContent: "center",
// //                                     fontSize: "9px",
// //                                     fontWeight: "bold",
// //                                     color: color.text
// //                                   }}
// //                                   title={group}
// //                                 >
// //                                   {group.charAt(2)}
// //                                 </Box>
// //                               );
// //                             })}
// //                           </Stack>
// //                         </Box>
// //                       </ListItemIcon>

// //                       <ListItemText
// //                         primary={
// //                           <Link
// //                             component={RouterLink}
// //                             to={`/control/detail?id=${topic.id}`}
// //                             underline="hover"
// //                             sx={{
// //                               color: "primary.main",
// //                               fontWeight: 500,
// //                               fontSize: "0.95rem",
// //                               "&:hover": { color: "primary.dark" }
// //                             }}
// //                           >
// //                             {topic.name}
// //                           </Link>
// //                         }
// //                         secondary={
// //                           <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
// //                             {topic.description}
// //                           </Typography>
// //                         }
// //                       />
// //                     </ListItem>
// //                   );
// //                 })}
// //               </List>
// //             </AccordionDetails>
// //           </Accordion>
// //         );
// //       })}
// //     </Box>
// //   );
// // };

// export default Cascade;