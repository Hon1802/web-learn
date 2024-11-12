import { useState, useEffect } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import { useThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";

const Description: React.FC = () => {
   const { mode } = useThemeContext();
   const { t } = useTranslation();
   const [markdownContent, setMarkdownContent] = useState<string>("");
   const [showMore, setShowMore] = useState<boolean>(false);

   const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
   const textColor = mode === "light" ? "#000000" : "#ffffff";
   const headerBackgroundColor = mode === "light" ? "#f0f0f0" : "#333333";

   useEffect(() => {
      fetch("/example.md")
         .then((response) => response.text())
         .then((text) => setMarkdownContent(text))
         .catch((error) =>
            console.error("Error loading markdown file:", error),
         );
   }, []);

   const handleShowMore = () => {
      setShowMore(!showMore);
   };

   return (
      <Box
         sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: backgroundColor,
            mb: 2,
         }}
      >
         <Paper
            elevation={4}
            sx={{
               width: "100%",
               maxWidth: 800,
               padding: 2,
               borderRadius: 2,
               backgroundColor: backgroundColor,
               color: textColor,
               overflow: "hidden",
               height: showMore ? "auto" : "500px", // Set height conditionally
               transition: "height 0.3s ease",
               display: "flex",
               flexDirection: "column",
            }}
         >
            <Typography
               variant="h5"
               sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  backgroundColor: headerBackgroundColor,
                  padding: "8px",
                  borderRadius: "4px",
               }}
            >
               {t("description")}
            </Typography>
            <Box
               sx={{
                  flexGrow: 1,
                  overflow: "hidden",
                  display: showMore ? "block" : "-webkit-box",
                  WebkitLineClamp: showMore ? "none" : 10,
                  WebkitBoxOrient: "vertical",
                  textOverflow: "ellipsis",
                  overflowWrap: "break-word",
               }}
            >
               <ReactMarkdown>{markdownContent}</ReactMarkdown>
            </Box>
            <Button
               onClick={handleShowMore}
               sx={{ mt: 2, alignSelf: "center" }}
            >
               {showMore ? t("show_less") : t("show_more")}
            </Button>
         </Paper>
      </Box>
   );
};

export default Description;
