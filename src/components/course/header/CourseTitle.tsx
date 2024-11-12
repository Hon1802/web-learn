import React from "react";
import { Typography, Box } from "@mui/material";
import { useThemeContext } from "../../../theme/ThemeContext";

interface CourseTitleProps {
   name: string;
   introduction: string;
}

const CourseTitle: React.FC<CourseTitleProps> = ({ name, introduction }) => {
   const { mode } = useThemeContext();
   const textColor = mode === "light" ? "black" : "white";
   const fontFamily = "system-ui";
   return (
      <Box>
         <Typography
            variant="h5"
            gutterBottom
            sx={{
               color: textColor,
               fontWeight: "bold",
               fontFamily: fontFamily,
            }}
         >
            {name}
         </Typography>
         <Typography
            variant="h6"
            paragraph
            sx={{
               color: textColor,
               fontStyle: "italic",
               fontFamily: fontFamily,
            }}
         >
            {introduction}
         </Typography>
      </Box>
   );
};

export default CourseTitle;
