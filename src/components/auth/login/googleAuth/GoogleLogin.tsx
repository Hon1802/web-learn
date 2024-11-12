import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useGoogleLogin } from "@react-oauth/google";
import React from "react";
import { googleAuth } from "../../../../services/AuthService";
import { useAuth } from "../../../../context/AuthContext";
import { LoginResponse } from "../../../../models/Auth";
import { Error } from "../../../../models/Error";
import { useNavigate } from "react-router-dom";

interface SocialLoginButtonsProps {
   textColor: string;
}

const GoogleLogin: React.FC<SocialLoginButtonsProps> = ({ textColor }) => {
   const { setUserInfo, setIsAuthenticated } = useAuth();
   const navigate = useNavigate();

   const responseGoogle = async (authResult: any) => {
      try {
         if (authResult["code"]) {
            const res = await googleAuth(authResult["code"]);
            if (res.status === "success") {
               setUserInfo((res as LoginResponse).data);
               setIsAuthenticated(true);
               navigate("/", { replace: true });
            } else {
               alert("Error: " + (res as Error).message);
            }
         }
      } catch (error) {
         console.log("Google Login Error", error);
      }
   };

   const handleClickGoogleLogin = useGoogleLogin({
      onSuccess: responseGoogle,
      onError: responseGoogle,
      flow: "auth-code",
   });

   return (
      <Button
         onClick={() => handleClickGoogleLogin()}
         fullWidth
         variant="outlined"
         startIcon={<GoogleIcon />}
         sx={{
            fontSize: "16px",
            borderColor: textColor,
            color: textColor,
            backgroundColor: "transparent",
         }}
      >
         Google
      </Button>
   );
};

export default GoogleLogin;
