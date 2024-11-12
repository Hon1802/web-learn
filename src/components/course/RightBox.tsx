import React, { useState } from "react";
import { Box, Paper, useTheme, useMediaQuery } from "@mui/material";
import PriceSection from "./rightbox/PriceSection";
import CourseIncludes from "./rightbox/CourseIncludes";
import CouponSection from "./rightbox/CouponSection";
import ActionButtons from "./rightbox/ActionButtons";
import { useThemeContext } from "../../theme/ThemeContext";

const fakeData = {
   price: 2199000,
   include: {
      duration: 73.5,
      exercisesNumber: 63,
      articles: 54,
      downloadable_resources: 133,
   },
};

const RightBox: React.FC = () => {
   const theme = useTheme();
   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
   const { mode } = useThemeContext();
   const [coupon, setCoupon] = useState("");

   const handleCouponChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCoupon(event.target.value);
   };

   const handleUseCoupon = () => {
      alert(`Coupon applied: ${coupon}`);
   };

   const backgroundColor = mode === "light" ? "white" : "black";
   const textColor = mode === "light" ? "black" : "white";

   return (
      <Box
         sx={{
            flex: "0 0 30%",
            position: isSmallScreen ? "relative" : "sticky",
            top: 0,
            alignSelf: "flex-start",
            mt: "10px",
         }}
      >
         <Paper
            elevation={3}
            sx={{
               padding: 3,
               backgroundColor: backgroundColor,
               minHeight: "200px",
               borderRadius: "8px",
               boxShadow: theme.shadows[5],
               color: textColor,
            }}
         >
            <PriceSection price={fakeData.price} textColor={textColor} />
            <CourseIncludes include={fakeData.include} textColor={textColor} />
            <ActionButtons
               textColor={textColor}
               backgroundColor={backgroundColor}
            />
            <CouponSection
               coupon={coupon}
               onCouponChange={handleCouponChange}
               onUseCoupon={handleUseCoupon}
               textColor={textColor}
               backgroundColor={backgroundColor}
            />
         </Paper>
      </Box>
   );
};

export default RightBox;
