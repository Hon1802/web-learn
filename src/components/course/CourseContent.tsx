import { Paper, Typography } from "@mui/material";
import CourseDetails from "./coursecontent/CourseDetails";
import { useThemeContext } from "../../theme/ThemeContext";
import fakeData from "./fakeData.json";
import { useTranslation } from "react-i18next";

const data = fakeData;

const CourseContent = () => {
   const { mode } = useThemeContext();
   const { t } = useTranslation();
   const headerBackgroundColor = mode === "light" ? "#f0f0f0" : "#333333";

   const backgroundColor = mode === "light" ? "white" : "black";
   const textColor = mode === "light" ? "black" : "white";

   return (
      <Paper
         elevation={4}
         sx={{
            width: "100%",
            borderRadius: "12px",
            backgroundColor: backgroundColor,
            color: textColor,
            mb: "20px",
            mt: "10px",
            padding: 2,
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
            {t("course_contents")}
         </Typography>
         <CourseDetails sections={data.contents} />
      </Paper>
   );
};

export default CourseContent;
