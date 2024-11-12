import React from "react";
import {
   ListItem,
   ListItemText,
   ListItemIcon,
   Box,
   Typography,
   Link,
} from "@mui/material";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import DescriptionIcon from "@mui/icons-material/Description";

interface Content {
   type: string;
   at: number;
   title: string;
   canReview: boolean;
   textColor: string;
}

const ContentItem: React.FC<Content> = ({
   type,
   at,
   title,
   canReview,
   textColor,
}) => {
   return (
      <ListItem sx={{ justifyContent: "space-between" }}>
         <Box sx={{ display: "flex", alignItems: "center" }}>
            <ListItemIcon>
               {type === "video" ? (
                  <VideoLibraryIcon sx={{ color: textColor }} />
               ) : (
                  <DescriptionIcon sx={{ color: textColor }} />
               )}
            </ListItemIcon>
            <ListItemText
               primary={
                  canReview ? (
                     <Link
                        href="#"
                        sx={{
                           color: textColor,
                           textDecoration: "underline",
                           "&:hover": { textDecoration: "none" },
                        }}
                     >
                        {`${title}`}
                     </Link>
                  ) : (
                     `${title}`
                  )
               }
               primaryTypographyProps={{ color: textColor }}
            />
         </Box>
         <Typography
            variant="body2"
            sx={{ color: textColor, minWidth: "50px", textAlign: "right" }}
         >
            {`${String(Math.floor(at)).padStart(2, "0")}:${String(
               Math.round((at % 1) * 60),
            ).padStart(2, "0")}`}
         </Typography>
      </ListItem>
   );
};

export default ContentItem;
