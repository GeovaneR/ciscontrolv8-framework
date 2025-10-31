import React from "react";
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
  Link
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArticleIcon from '@mui/icons-material/Article';
import { cisControls } from "../../data/ciscontrols";


const Cascade = () => {
  return (
    <Box sx={{ width: "80%", margin: "auto", mt: 4 }}>
      {cisControls.map((control) => (
        <Accordion key={control.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "primary.main" }} />}
            sx={{
              flexDirection: "row-reverse",
              "& .MuiAccordionSummary-content": { ml: 1 }
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ fontWeight: "bold" }}>
                {control.id}: {control.title}
              </Typography>
              <Typography variant="body2">
                {control.description}
                <Box component="span" sx={{ color: "primary.main" }}>
                  {" "}
                  ({control.topics.length} tópicos)
                </Box>
              </Typography>
            </Box>
          </AccordionSummary>

          <AccordionDetails>
            <List dense>
              {control.topics.map((topic) => (
                <ListItem key={topic.id}>
                  <ListItemIcon>
                    <ChevronRightIcon sx={{ color: "primary.main" }} />
                    <ArticleIcon sx={{ color: "primary.main" }} />
                  </ListItemIcon>

                  <ListItemText
                    primary={
                      <Link
                        component={RouterLink}
                        to={`/control/detail?id=${topic.id}`} // 👈 vai para a nova página
                        underline="hover"
                        sx={{
                          color: "primary.main",
                          fontWeight: 500,
                          "&:hover": { color: "primary.dark" }
                        }}
                      >
                        {topic.name}
                      </Link>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Cascade;