import React from "react";
import {
   IconButton,
   Popover,
   Box,
   Typography,
   Avatar,
   List,
   ListItem,
   Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const fakeData = [
   {
      id: 1,
      name: "The Complete JavaScript Course 2024: From Zero to Expert!",
      by: "John Smith",
      price: 2499000,
      image: "https://cloud.z.com/vn/wp-content/uploads/2024/01/Screenshot_1-6.png",
   },
   {
      id: 2,
      name: "Mastering Python: Learn Python Programming from Scratch",
      by: "Emily Johnson",
      price: 2999000,
      image: "https://cloud.z.com/vn/wp-content/uploads/2024/01/Screenshot_2-6.png",
   },
   {
      id: 3,
      name: "Web Development Bootcamp 2024: Become a Full-Stack Developer",
      by: "Michael Brown",
      price: 3199000,
      image: "https://cloud.z.com/vn/wp-content/uploads/2024/01/Screenshot_3-6.png",
   },
   {
      id: 4,
      name: "Data Science and Machine Learning with Python",
      by: "Sophia Davis",
      price: 2799000,
      image: "https://cloud.z.com/vn/wp-content/uploads/2024/01/Screenshot_4-6.png",
   },
   {
      id: 5,
      name: "Complete React Developer in 2024: Build Real-World Projects",
      by: "James Wilson",
      price: 2699000,
      image: "https://cloud.z.com/vn/wp-content/uploads/2024/01/Screenshot_5-6.png",
   },
   {
      id: 6,
      name: "Advanced CSS and Sass: Flexbox, Grid, Animations and More!",
      by: "Olivia Martinez",
      price: 2399000,
      image: "https://cloud.z.com/vn/wp-content/uploads/2024/01/Screenshot_6-6.png",
   },
   {
      id: 7,
      name: "The Ultimate Node.js Developer Course 2024",
      by: "William Lee",
      price: 2599000,
      image: "https://cloud.z.com/vn/wp-content/uploads/2024/01/Screenshot_7-6.png",
   },
   {
      id: 8,
      name: "Angular - The Complete Guide (2024 Edition)",
      by: "Isabella Taylor",
      price: 2899000,
      image: "https://cloud.z.com/vn/wp-content/uploads/2024/01/Screenshot_8-6.png",
   },
];
export default function Cart() {
   const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
   const navigate = useNavigate();

   const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handlePopoverClose = () => {
      setAnchorEl(null);
   };

   const open = Boolean(anchorEl);

   // Calculate total price
   const totalPrice = fakeData.reduce((sum, item) => sum + item.price, 0);

   // Theme and Translation
   const { mode } = useThemeContext();
   const { t } = useTranslation();

   const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
   const textColor = mode === "light" ? "#000000" : "#ffffff";

   return (
      <div>
         <IconButton
            aria-owns={open ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
         >
            <ShoppingCartIcon />
         </IconButton>
         <Popover
            id="mouse-over-popover"
            sx={{ mt: "50px" }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
               vertical: "top",
               horizontal: "right",
            }}
            transformOrigin={{
               vertical: "top",
               horizontal: "right",
            }}
            onClose={handlePopoverClose}
            onMouseLeave={handlePopoverClose}
         >
            <Box
               sx={{
                  maxWidth: 300,
                  maxHeight: 500,
                  overflowY: "auto", // Enable scrolling for the list
                  border: "1px solid #ccc", // Add border to the box
                  boxShadow: 3,
                  borderRadius: 2,
                  backgroundColor: backgroundColor, // Apply theme-based background
                  color: textColor, // Apply theme-based text color
               }}
            >
               <List>
                  {fakeData.map((item, index) => (
                     <ListItem
                        key={index}
                        sx={{
                           display: "flex",
                           alignItems: "center",
                           mb: 1,
                           cursor: "pointer",
                        }}
                        onClick={() => navigate(`/course/${item.id}`)}
                     >
                        <Avatar
                           src={item.image}
                           alt={item.name}
                           sx={{
                              width: 70,
                              height: 70,
                              mr: 2,
                              borderRadius: "8px", // Make the image square
                           }}
                        />
                        <Box sx={{ flexGrow: 1 }}>
                           <Typography
                              variant="body1"
                              sx={{
                                 display: "-webkit-box",
                                 overflow: "hidden",
                                 WebkitBoxOrient: "vertical",
                                 WebkitLineClamp: 2,
                              }}
                           >
                              {item.name}
                           </Typography>
                           <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                 display: "-webkit-box",
                                 overflow: "hidden",
                                 WebkitBoxOrient: "vertical",
                                 WebkitLineClamp: 1,
                              }}
                           >
                              {item.by}
                           </Typography>
                           <Typography variant="body2" color="text.secondary">
                              {item.price.toLocaleString()} VND
                           </Typography>
                        </Box>
                     </ListItem>
                  ))}
               </List>
               <Box
                  sx={{
                     position: "sticky",
                     bottom: 0,
                     backgroundColor: backgroundColor, // Ensure the footer is visible
                     color: textColor,
                     p: 2,
                     borderTop: "1px solid #ccc",
                  }}
               >
                  <Typography variant="h6">
                     {t("total")}: {totalPrice.toLocaleString()} VND
                  </Typography>
                  <Button
                     variant="contained"
                     sx={{
                        mt: 1,
                        color: backgroundColor,
                        backgroundColor: textColor,
                     }}
                     onClick={() => {
                        handlePopoverClose();
                        navigate(`/cart`);
                     }}
                  >
                     {t("goto_cart")}
                  </Button>
               </Box>
            </Box>
         </Popover>
      </div>
   );
}
