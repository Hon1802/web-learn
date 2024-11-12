import { GoogleOAuthProvider } from "@react-oauth/google";
import React, { ReactNode } from "react";

const GoogleAuthWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
   return (
      <GoogleOAuthProvider
         clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
      >
         {children}
      </GoogleOAuthProvider>
   );
};

export default GoogleAuthWrapper;
