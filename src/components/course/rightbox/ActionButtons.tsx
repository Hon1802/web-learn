import React from "react";
import { Button, Stack } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PaymentIcon from "@mui/icons-material/Payment";
import { useTranslation } from "react-i18next";

interface ActionButtonsProps {
   textColor: string;
   backgroundColor: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
   textColor,
   backgroundColor,
}) => {
   const { t } = useTranslation();

   return (
      <Stack spacing={2} sx={{ mt: 3 }}>
         <Button
            variant="contained"
            sx={{
               backgroundColor: textColor,
               color: backgroundColor,
               "&:hover": {
                  backgroundColor: backgroundColor,
                  color: textColor,
               },
            }}
            startIcon={<ShoppingCartIcon />}
            fullWidth
         >
            {t("add_to_cart")}
         </Button>
         <Button
            variant="outlined"
            sx={{
               color: textColor,
               borderColor: textColor,
               "&:hover": {
                  backgroundColor: textColor,
                  color: backgroundColor,
               },
            }}
            startIcon={<FavoriteIcon />}
            fullWidth
         >
            {t("add_to_favorite")}
         </Button>
         <Button
            variant="contained"
            sx={{
               backgroundColor: textColor,
               color: backgroundColor,
               "&:hover": {
                  backgroundColor: backgroundColor,
                  color: textColor,
               },
            }}
            startIcon={<PaymentIcon />}
            fullWidth
         >
            {t("buy_now")}
         </Button>
      </Stack>
   );
};

export default ActionButtons;
