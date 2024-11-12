import {
   Box,
   List,
   ListItem,
   ListItemIcon,
   Paper,
   Typography,
} from "@mui/material";
import { useThemeContext } from "../../theme/ThemeContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTranslation } from "react-i18next";

const fakeData = [
   "No programming experience needed - I'll teach you everything you need to know",
   "A Mac or PC computer with access to the internet",
   "No paid software required - I'll teach you how to use PyCharm, Jupyter Notebooks and Google Colab",
   "I'll walk you through, step-by-step how to get all the software installed and set up",
];

const Requiments: React.FC = () => {
   const { mode } = useThemeContext();
   const { t } = useTranslation();

   const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
   const textColor = mode === "light" ? "#000000" : "#ffffff";
   const headerBackgroundColor = mode === "light" ? "#f0f0f0" : "#333333";

   return (
      <Box
         sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: backgroundColor,
            mb: "20px",
         }}
      >
         <Paper
            elevation={4}
            sx={{
               borderRadius: "12px",
               backgroundColor: backgroundColor,
               color: textColor,
               padding: 2,
            }}
         >
            <Typography
               variant="h5"
               sx={{
                  fontWeight: "bold",
                  mb: 2,
                  textAlign: "center",
                  backgroundColor: headerBackgroundColor,
                  padding: "8px",
                  borderRadius: "4px",
               }}
            >
               {t("requiments")}
            </Typography>
            <List>
               {fakeData.map((item, index) => (
                  <ListItem key={index} sx={{ marginBottom: 1 }}>
                     <ListItemIcon>
                        <CheckCircleIcon sx={{ color: "green" }} />
                     </ListItemIcon>
                     <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                        {item}
                     </Typography>
                  </ListItem>
               ))}
            </List>
         </Paper>
      </Box>
   );
};

export default Requiments;
