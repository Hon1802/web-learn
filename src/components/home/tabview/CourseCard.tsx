import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

interface CourseProps {
   course: {
      title: string;
      duration: string;
      price: string;
      link: string;
      rating: number;
      buying: number;
      instructor: string;
      image: string;
      tag: string[];
   };
}

const CourseCard: React.FC<CourseProps> = ({ course }) => {
   return (
      <Card sx={{ maxWidth: 345, maxHeight: 500 }}>
         <CardMedia
            component="img"
            height="160"
            image={course.image}
            alt={course.title}
         />
         <CardContent>
            <Typography
               gutterBottom
               variant="h6"
               component="div"
               sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  height: 58,
               }}
            >
               {course.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
               {course.duration} - {course.price}
            </Typography>
            <Typography variant="body2" color="text.primary">
               {course.instructor}
            </Typography>
            <Typography variant="body2" style={{ fontWeight: "bold" }}>
               {course.rating} Stars ({course.buying} students)
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
               {course.tag.map((tag, index) => (
                  <Typography
                     key={index}
                     variant="caption"
                     sx={{
                        bgcolor: "secondary.main",
                        color: "white",
                        borderRadius: 1,
                        px: 1,
                        py: 0.25,
                     }}
                  >
                     {tag}
                  </Typography>
               ))}
            </Box>
         </CardContent>
      </Card>
   );
};

export default CourseCard;
