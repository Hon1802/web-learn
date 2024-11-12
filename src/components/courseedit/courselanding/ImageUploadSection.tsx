import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../../theme/ThemeContext";

interface ImageUploadSectionProps {
   label: string;
   name: string;
   id: string | undefined;
   handleFileUpload: (name: string, file: File) => void;
}

const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({
   label,
   name,
   id,
   handleFileUpload,
}) => {
   const { t } = useTranslation();
   const { mode } = useThemeContext();
   const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
   const textColor = mode === "light" ? "#000000" : "#ffffff";
   const [previewSrc, setPreviewSrc] = useState<string | null>(null);

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
         const file = e.target.files[0];
         const fileUrl = URL.createObjectURL(file);
         setPreviewSrc(fileUrl);

         handleFileUpload(name, file);
      }
   };

   return (
      <Box display="flex" flexDirection="row" alignItems="center" my={2}>
         <Box
            width="50%"
            height="300px"
            mr={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
               border: `1px solid ${textColor}`,
               borderRadius: "8px",
               overflow: "hidden",
               backgroundColor: backgroundColor,
            }}
         >
            {previewSrc ? (
               <img
                  src={previewSrc}
                  alt={label}
                  style={{
                     width: "100%",
                     height: "100%",
                     objectFit: "cover",
                  }}
               />
            ) : (
               id && (
                  <img
                     src={`https://drive.google.com/thumbnail?id=${id}`}
                     alt={label}
                     style={{
                        width: "100%",
                        height: "100%",
                     }}
                  />
               )
            )}
         </Box>

         <Box width="50%" display="flex" flexDirection="column">
            <Box
               sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 3,
                  border: "2px dashed",
                  borderColor: "divider",
                  borderRadius: 2,
                  bgcolor: "background.default",
                  "&:hover": {
                     bgcolor: "action.hover",
                  },
               }}
            >
               <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id={`file-upload-${name}`}
                  type="file"
                  onChange={handleFileChange}
               />
               <label htmlFor={`file-upload-${name}`}>
                  <Button
                     variant="contained"
                     component="span"
                     startIcon={<CloudUploadIcon />}
                     sx={{ mb: 2 }}
                  >
                     {t("uploadLabel", {
                        label: t(label.toLowerCase()),
                     })}
                  </Button>
               </label>
               <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
               >
                  {t("dragAndDropText")}
               </Typography>
               <Typography
                  variant="caption"
                  color="text.secondary"
                  align="center"
                  sx={{ mt: 1 }}
               >
                  {t("acceptedImageFormats")}
               </Typography>
               {previewSrc && (
                  <Button
                     variant="outlined"
                     onClick={() => setPreviewSrc(null)}
                     sx={{
                        mt: 2,
                        backgroundColor: backgroundColor,
                        color: textColor,
                        borderColor: textColor,
                        "&:hover": {
                           backgroundColor: textColor,
                           color: backgroundColor,
                        },
                     }}
                  >
                     {t("removePreview")}
                  </Button>
               )}
            </Box>
         </Box>
      </Box>
   );
};
export default ImageUploadSection;
