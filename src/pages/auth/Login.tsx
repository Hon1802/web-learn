import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../theme/ThemeContext";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginForm from "../../components/auth/login/LoginForm";
import SocialLoginButtons from "../../components/auth/login/SocialLoginButtons";
import SignUpPrompt from "../../components/auth/login/SignUpPrompt";
import LeftPanel from "../../components/auth/login/LeftPanel";
import { useAuth } from "../../context/AuthContext";
import { login } from "../../services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import { LoginResponse } from "../../models/Auth";
import { Error } from "../../models/Error";

const LoginPage: React.FC = () => {
   const { mode } = useThemeContext();
   const { t } = useTranslation();
   const textColor = mode === "light" ? "black" : "white";

   const {
      setUserInfo,
      setIsLoadingAuth,
      setIsAuthenticated,
      isAuthenticated,
      isLoadingAuth,
   } = useAuth();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const navigate = useNavigate();

   useEffect(() => {
      if (!isLoadingAuth && isAuthenticated) {
         navigate("/");
      }
   }, [isAuthenticated, navigate, isLoadingAuth]);

   const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
   };

   const handlePasswordChange = (
      event: React.ChangeEvent<HTMLInputElement>,
   ) => {
      setPassword(event.target.value);
   };

   const handleLoginClick = async () => {
      try {
         const res = await login({
            email,
            password,
         });
         if (res.status === "success") {
            setUserInfo((res as LoginResponse).data);
            setIsAuthenticated(true);
            navigate("/", { replace: true });
         } else {
            alert("Error: " + (res as Error).message);
         }
      } catch (error) {
         console.log("Error", error);
      } finally {
         setIsLoadingAuth(false);
      }
   };

   return (
      <Box
         sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            height: "90vh",
            width: "100%",
         }}
      >
         <LeftPanel />

         <Box
            sx={{
               width: "30%",
               display: "flex",
               flexDirection: "column",
               justifyContent: "center",
               alignItems: "center",
               backgroundColor: "transparent",
               borderRadius: "0 8px 8px 0",
               px: "3%",
            }}
         >
            <Avatar
               sx={{
                  m: 1,
                  backgroundColor: "transparent",
                  color: textColor,
               }}
            >
               <LockOutlinedIcon />
            </Avatar>
            <Typography
               component="h1"
               variant="h4"
               sx={{ color: textColor, fontWeight: "bold", mb: 3 }}
            >
               {t("login")}
            </Typography>
            <LoginForm
               email={email}
               password={password}
               onEmailChange={handleEmailChange}
               onPasswordChange={handlePasswordChange}
               onLoginClick={handleLoginClick}
               textColor={textColor}
            />
            <Box
               justifyContent="center"
               sx={{
                  display: "flex",
                  // mt: 4,
                  flexDirection: "row",
                  alignItems: "center",
                  p: 2,
               }}
            >
               <Typography
                  component="h1"
                  variant="body2"
                  sx={{ color: textColor, mb: 3, mx: 1 }}
               >
                  {t("or")}
               </Typography>
               <Typography
                  component="h1"
                  variant="body1"
                  sx={{ color: textColor, fontWeight: "bold", mb: 3 }}
               >
                  <Link to="/forgotpassword" style={{ color: textColor }}>
                     {t("forgot_password")}
                  </Link>
               </Typography>
            </Box>

            <SocialLoginButtons textColor={textColor} />
            <SignUpPrompt
               textColor={textColor}
               borderColor={mode === "dark" ? "white" : "black"}
            />
         </Box>
      </Box>
   );
};

export default LoginPage;
