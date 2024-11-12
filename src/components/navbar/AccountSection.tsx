import React from "react";
import { Box, Tooltip } from "@mui/material";
import AccountMenu from "./menu/AccountMenu";

const AccountSection: React.FC = () => {
   return (
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
         <Tooltip title="Account settings">
            <div>
               <AccountMenu />
            </div>
         </Tooltip>
      </Box>
   );
};

export default AccountSection;
