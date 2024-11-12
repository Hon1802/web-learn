import React from "react";
import { Box, Typography, Button, Tooltip, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../theme/ThemeContext";

const fakeData = [
   {
      title: "Introduction to Web Development",
      duration: "4 weeks",
      price: "$120",
      link: "/web-development/introduction",
      rating: 4.5,
      buying: 20394,
      instructor: "John Doe, My Au, Dr. Angela",
      image: "/courses/course1.jpg",
   },
   {
      title: "Advanced CSS Techniques",
      duration: "6 weeks",
      price: "$150",
      link: "/web-development/css-advanced",
      rating: 4.8,
      buying: 15678,
      instructor: "Emily Zhao",
      image: "/courses/course2.jpg",
   },
   {
      // eslint-disable-next-line no-script-url
      title: "JavaScript: The Complete Guide",
      duration: "8 weeks",
      price: "$180",
      link: "/web-development/javascript-complete",
      rating: 4.7,
      buying: 18940,
      instructor: "Maximilian Schwarzmüller",
      image: "/courses/course1.jpg",
   },
   {
      title: "React from Scratch",
      duration: "5 weeks",
      price: "$160",
      link: "/web-development/react-beginner",
      rating: 4.6,
      buying: 20250,
      instructor: "Dan Abramov, Andrew Clark",
      image: "/courses/course2.jpg",
   },
   {
      title: "Full Stack Development with MERN",
      duration: "10 weeks",
      price: "$250",
      link: "/web-development/full-stack-mern",
      rating: 4.9,
      buying: 14289,
      instructor: "Brad Traversy",
      image: "/courses/course1.jpg",
   },
];
const CartPage: React.FC = () => {
   const { t } = useTranslation();
   const { mode } = useThemeContext();

   const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
   const textColor = mode === "light" ? "#000000" : "#ffffff";

   // Calculate total price
   const totalPrice = fakeData.reduce(
      (acc, course) => acc + parseFloat(course.price.replace("$", "")),
      0,
   );

   return (
      <Box sx={{ display: "flex", p: 3 }}>
         <Box sx={{ flex: 2, pr: 3, width: "80%" }}>
            {fakeData.map((course, index) => (
               <></>
            ))}
         </Box>

         {/* Checkout Section */}
         <Box
            sx={{
               flex: 1,
               p: 3,
               border: "1px solid",
               borderColor: mode === "light" ? "#ccc" : "#555",
               borderRadius: "8px",
               backgroundColor: backgroundColor,
               color: textColor,
               maxHeight: "fit-content",
               width: "25%",
               maxWidth: "25%",
            }}
         >
            <Typography variant="h6" sx={{ color: textColor, mb: 3 }}>
               {t("total")}
            </Typography>
            <Typography
               variant="h4"
               sx={{ color: textColor, fontWeight: "bold", mb: 3 }}
            >
               ${totalPrice.toFixed(2)}
            </Typography>
            <Button
               variant="contained"
               fullWidth
               sx={{
                  backgroundColor: textColor,
                  color: backgroundColor,
               }}
            >
               {t("checkout")}
            </Button>
         </Box>
      </Box>
   );
};

export default CartPage;
