import React from "react";
import {
   Box,
   Paper,
   Typography,
   List,
   ListItem,
   ListItemIcon,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";

const fakeData = [
   "Build 16 web development projects for your portfolio, ready to apply for junior developer jobs.",
   "Learn the latest technologies, including Javascript, React, Node and even Web3 development.",
   "After the course you will be able to build ANY website you want.",
   "Build fully-fledged websites and web apps for your startup or business.",
   "Work as a freelance web developer.",
   "Master frontend development with React",
   "Master backend development with Node",
   "Learn professional developer best practices.",
];

const CourseLearn: React.FC = () => {
   const { t } = useTranslation();

   const { mode } = useThemeContext();
   const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
   const textColor = mode === "light" ? "#000000" : "#ffffff";
   const headerBackgroundColor = mode === "light" ? "#f0f0f0" : "#333333";

   return (
      <Box
         sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:
               backgroundColor === "#ffffff" ? "#f5f5f5" : "#121212",
         }}
      >
         <Paper
            elevation={4}
            sx={{
               width: "100%",
               padding: 2,
               borderRadius: "12px",
               backgroundColor: backgroundColor,

               color: textColor,
            }}
         >
            <Typography
               variant="h5"
               sx={{
                  fontWeight: "bold",
                  mb: 2,
                  textAlign: "center",
                  backgroundColor: headerBackgroundColor,
                  padding: "8px",
                  borderRadius: "4px",
               }}
            >
               {t("course_hightlights")}
            </Typography>
            <List>
               {fakeData.map((item, index) => (
                  <ListItem key={index} sx={{ marginBottom: 1 }}>
                     <ListItemIcon>
                        <CheckCircleIcon sx={{ color: "green" }} />
                     </ListItemIcon>
                     <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                        {item}
                     </Typography>
                  </ListItem>
               ))}
            </List>
         </Paper>
      </Box>
   );
};

export default CourseLearn;
