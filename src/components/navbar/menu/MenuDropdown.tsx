import React, { useState } from "react";
import { Menu, MenuItem, Button, Box, Fade, Typography } from "@mui/material";
import { useThemeContext } from "../../../theme/ThemeContext";
import { useTranslation } from "react-i18next";

const MenuDropDown: React.FC = () => {
   const { mode } = useThemeContext();

   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const [submenuAnchorEl, setSubmenuAnchorEl] = useState<null | HTMLElement>(
      null,
   );
   const [menuItems] = useState([
      { title: "Development", submenu: ["Web", "Data"] },
      { title: "Bussiness", submenu: ["Sales", "Operations"] },
   ]);
   const { t } = useTranslation();

   const open = Boolean(anchorEl);
   const submenuOpen = Boolean(submenuAnchorEl);
   const handleMenuClose = () => {
      setAnchorEl(null);
      setSubmenuAnchorEl(null);
   };

   const handleSubmenuOpen = (
      event: React.MouseEvent<HTMLElement>,
      index: number,
   ) => {
      setSubmenuAnchorEl(event.currentTarget);
   };

   const handleSubmenuClose = () => {
      setSubmenuAnchorEl(null);
      setAnchorEl(null);
   };

   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };

   return (
      <Box
         sx={{
            flexGrow: 1,
            ml: 5,
            backgroundColor: "transparent",
         }}
      >
         <Button
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onMouseEnter={handleMenuOpen}
            sx={{ ml: 2, color: mode === "dark" ? "white" : "black" }}
         >
            {t("categories")}
         </Button>

         <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            TransitionComponent={Fade}
            onMouseLeave={handleMenuClose}
         >
            {menuItems.map((item, index) => (
               <div key={index}>
                  {" "}
                  {/* Replace React.Fragment with div */}
                  <MenuItem
                     onMouseEnter={(event) => handleSubmenuOpen(event, index)}
                     onClick={handleMenuClose}
                     style={{
                        color: mode === "dark" ? "white" : "black",
                        fontSize: 20,
                     }}
                     sx={{ width: 200 }}
                  >
                     {item.title}
                  </MenuItem>
                  <Menu
                     anchorEl={submenuAnchorEl}
                     open={submenuOpen}
                     onClose={handleSubmenuClose}
                     TransitionComponent={Fade}
                     onMouseLeave={handleSubmenuClose}
                     anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                     }}
                     transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                     }}
                     sx={{
                        width: 200,
                        ml: 0.5,
                     }}
                  >
                     {item.submenu.map((subitem, subindex) => (
                        <MenuItem key={subindex} onClick={handleSubmenuClose}>
                           <Typography>{subitem}</Typography>
                        </MenuItem>
                     ))}
                  </Menu>
               </div>
            ))}
         </Menu>
      </Box>
   );
};

export default MenuDropDown;
