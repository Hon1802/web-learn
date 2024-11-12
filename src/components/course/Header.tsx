import React from "react";
import { Paper } from "@mui/material";
import CourseTitle from "./header/CourseTitle";
import CourseRating from "./header/CourseRating";
import CourseDetails from "./header/CourseDetails";
import CourseCreator from "./header/CourseCreator";
import { useThemeContext } from "../../theme/ThemeContext";
const fakeData = {
   name: "The Web Developer Bootcamp 2024",
   introduction:
      "10 Hours of React just added. Become a Developer With ONE course - HTML, CSS, JavaScript, React, Node, MongoDB and More!",
   rating: 4.7,
   numberRating: 27523,
   students: 919029,
   created: "Colt Steele",
   lastUpdated: "7/2024",
   lang: "English",
   sub: "Dutch, French, German, Indonesian, Italian, Japanese, Korean, Polish, Portuguese, Simplified Chinese, Spanish, Thai, Turkish, Vietnamese",
   additionalContent:
      "This section can contain any additional content related to the course, such as links, important notices, or promotional material.",
};
const CourseHeader = () => {
   const { mode } = useThemeContext();
   const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
   const textColor = mode === "light" ? "#000000" : "#ffffff";

   return (
      <Paper
         elevation={4}
         sx={{
            width: "100%",
            padding: 3,
            borderRadius: "12px",
            backgroundColor: backgroundColor,
            color: textColor,
            mb: "20px",
            mt: "10px",
         }}
      >
         <CourseTitle
            name={fakeData.name}
            introduction={fakeData.introduction}
         />
         <CourseRating
            rating={fakeData.rating}
            numberRating={fakeData.numberRating}
         />
         <CourseCreator created={fakeData.created} />
         <CourseDetails
            students={fakeData.students}
            lastUpdated={fakeData.lastUpdated}
            lang={fakeData.lang}
            sub={fakeData.sub}
         />
      </Paper>
   );
};

export default CourseHeader;
