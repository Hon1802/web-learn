import React, { useState } from "react";
import {
   Box,
   Typography,
   Paper,
   List,
   Collapse,
   IconButton,
   Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PeopleIcon from "@mui/icons-material/People";
import ContentItem from "./ContentItem";
import { useThemeContext } from "../../../theme/ThemeContext";

interface Content {
   type: string;
   at: number;
   title: string;
   canReview: boolean;
}

interface Section {
   title: string;
   lecturersNumber: number;
   duration: number;
   contents: Content[];
}

const CourseSection: React.FC<{ section: Section }> = ({ section }) => {
   const { mode } = useThemeContext();
   const [open, setOpen] = useState(false);

   const backgroundColor = "transparent";
   const textColor = mode === "light" ? "#000000" : "#ffffff";

   const handleToggle = () => {
      setOpen(!open);
   };

   return (
      <Paper
         elevation={3}
         sx={{
            padding: 2,
            backgroundColor: backgroundColor,
            color: textColor,
         }}
      >
         <Box
            sx={{
               display: "flex",
               alignItems: "center",
               justifyContent: "space-between",
               cursor: "pointer",
            }}
            onClick={handleToggle}
         >
            <Box>
               <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: textColor }}
               >
                  {section.title}
               </Typography>
               <Typography
                  variant="body2"
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     color: textColor,
                  }}
               >
                  <PeopleIcon sx={{ marginRight: 1, color: textColor }} />
                  Lecturers: {section.lecturersNumber}
               </Typography>
            </Box>
            <IconButton>
               {open ? (
                  <ExpandLessIcon sx={{ color: textColor }} />
               ) : (
                  <ExpandMoreIcon sx={{ color: textColor }} />
               )}
            </IconButton>
         </Box>

         <Collapse in={open} timeout="auto" unmountOnExit>
            <Divider sx={{ marginY: 1, backgroundColor: textColor }} />
            <List>
               {section.contents.map((content, index) => (
                  <ContentItem key={index} {...content} textColor={textColor} />
               ))}
            </List>
         </Collapse>
      </Paper>
   );
};

export default CourseSection;
