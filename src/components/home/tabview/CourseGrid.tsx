import React from "react";
import { Grid } from "@mui/material";
import CourseCard from "./CourseCard";
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
interface CourseGridProps {
   courses: CourseProps["course"][];
}

const CourseGrid: React.FC<CourseGridProps> = ({ courses }) => {
  return (
    <Grid container spacing={3}>
      {courses.map((course, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <CourseCard course={course} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CourseGrid;
