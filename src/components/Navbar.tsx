// Navbar.tsx
import React from "react";
import { AppBar, Toolbar, Box } from "@mui/material";
import { useThemeContext } from "../theme/ThemeContext";
import MenuDropDown from "./navbar/menu/MenuDropdown";
import Logo from "./navbar/Logo";
import SearchBar from "./navbar/SearchBar";
import NavLinks from "./navbar/NavLinks";
import ThemeToggle from "./navbar/ThemeToggle";
import LanguageSwitcher from "./navbar/languageSwitcher/LanguageSwitcher";
import AccountSection from "./navbar/AccountSection";
import { useAuth } from "../context/AuthContext";
import Cart from "./navbar/Cart";

const Navbar: React.FC = () => {
   const { toggleTheme, mode } = useThemeContext();
   const [searchQuery, setSearchQuery] = React.useState("");

   const { isAuthenticated } = useAuth();

   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
      setSearchQuery(event.target.value);

   return (
      <AppBar position="static">
         <Toolbar
            sx={{
               height: 50,
               backgroundColor: mode === "light" ? "white" : "black",
            }}
         >
            <Box
               sx={{
                  display: "flex",
                  alignItems: "center",
                  flexGrow: 1,
                  mx: 10,
               }}
            >
               <Logo mode={mode} />
               <MenuDropDown />
               <SearchBar
                  searchQuery={searchQuery}
                  onSearchChange={handleSearchChange}
               />
               <NavLinks mode={mode} />
               <Cart />
               <LanguageSwitcher mode={mode} />
               <ThemeToggle mode={mode} toggleTheme={toggleTheme} />
               {isAuthenticated && <AccountSection />}
            </Box>
         </Toolbar>
      </AppBar>
   );
};

export default Navbar;
