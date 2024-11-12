import { Box, Grid } from "@mui/material";
import CourseHeader from "../components/course/Header";
import RightBox from "../components/course/RightBox";
import CourseLearn from "../components/course/CourseLearn";
import CourseContent from "../components/course/CourseContent";
import Requiments from "../components/course/Requiments";
import Description from "../components/course/Description";
import FeaturedReview from "../components/course/FeaturedReview";
import Intructor from "../components/course/Instructor";
import Rating from "../components/course/Rating";

const CoursePage = () => {
   return (
      <Box
         sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            px: "20%",
         }}
      >
         <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
               <CourseHeader />
               <CourseLearn />
               <CourseContent />
               <Requiments />
               <Description />
               <FeaturedReview />
               <Intructor />
               <Rating />
            </Grid>
            <Grid item xs={12} md={4}>
               <Box
                  sx={{
                     position: "sticky",
                     top: 20, // Adjust this value to how far you want RightBox to stick from the top
                  }}
               >
                  <RightBox />
               </Box>
            </Grid>
         </Grid>
      </Box>
   );
};

export default CoursePage;
