import React from "react";
import { Box, Paper } from "@mui/material";
import { useThemeContext } from "../../theme/ThemeContext";
import InstructorHeader from "./instructor/InstructorHeader";
import InstructorInfo from "./instructor/InstructorInfo.tsx";
import MarkdownContent from "./instructor/MarkdownContent";

const fakeData = {
   name: "Dr. Angela Yu",
   avt: "https://t3.ftcdn.net/jpg/06/57/85/22/360_F_657852299_5py03y6oH4mrUDyZnf9XxFSFfrjcqAzP.jpg",
   position: "Developer and Lead Instructor",
   rating: 4.7,
   reviews: 870289,
   students: 2878773,
   courses: 7,
   introduction: "/instructordes.md",
};

const Instructor = () => {
   const { mode } = useThemeContext();

   const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
   const textColor = mode === "light" ? "#000000" : "#ffffff";
   const secondaryTextColor = mode === "light" ? "#757575" : "#b0b0b0";
   const headerBackgroundColor = mode === "light" ? "#f0f0f0" : "#333333";
   const iconBackgroundColor = mode === "light" ? "#e0e0e0" : "#444444";

   return (
      <Box
         sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: backgroundColor,
            mb: "20px",
            mt: "20px",
         }}
      >
         <Paper
            elevation={4}
            sx={{
               borderRadius: "12px",
               backgroundColor: backgroundColor,
               color: textColor,
               padding: 2,
               width: "100%",
            }}
         >
            <InstructorHeader
               backgroundColor={headerBackgroundColor}
               textColor={textColor}
            />
            <InstructorInfo
               name={fakeData.name}
               position={fakeData.position}
               secondaryTextColor={secondaryTextColor}
               iconBackgroundColor={iconBackgroundColor}
               rating={fakeData.rating}
               reviews={fakeData.reviews}
               students={fakeData.students}
               courses={fakeData.courses}
               avt={fakeData.avt}
            />
            <MarkdownContent markdownPath={fakeData.introduction} />
         </Paper>
      </Box>
   );
};

export default Instructor;
