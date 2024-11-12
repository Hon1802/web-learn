import React, {
   createContext,
   ReactNode,
   useContext,
   useEffect,
   useState,
} from "react";
import { getMe } from "../services/UserServices";
import { GetUserResponse, User } from "../models/User";
// import { Error } from "../models/Error";

interface AuthContextProps {
   userInfo: Partial<User>;
   isAuthenticated: boolean;
   isLoadingAuth: boolean;
   setUserInfo: React.Dispatch<React.SetStateAction<Partial<User>>>;
   setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
   setIsLoadingAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [userInfo, setUserInfo] = useState<Partial<User>>({});
   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
   const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);

   useEffect(() => {
      const fetchMe = async () => {
         try {
            const res = await getMe();
            console.log("oke", res);
            if (res.status === "success") {
               setUserInfo((res as GetUserResponse).data);
               setIsAuthenticated(true);
            } else {
               setIsAuthenticated(false);
            }
         } catch (error) {
            setIsAuthenticated(false);
            console.log("Error", error);
         } finally {
            setIsLoadingAuth(false);
         }
      };
      fetchMe();
   }, []);

   // Provide the authentication context to the children components
   return (
      <AuthContext.Provider
         value={{
            userInfo,
            isAuthenticated,
            isLoadingAuth,
            setUserInfo,
            setIsAuthenticated,
            setIsLoadingAuth,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};

const useAuth = () => {
   const context = useContext(AuthContext);

   if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
   }

   return context;
};

export { AuthProvider, useAuth };
