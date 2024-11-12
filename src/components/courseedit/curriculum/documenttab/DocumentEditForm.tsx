import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useTranslation } from "react-i18next";
import RichTextBox from "../../../reused/RichTextBoxComponent";
import { useThemeContext } from "../../../../theme/ThemeContext";
import { IDocument } from "../../../../models/Course";
import { saveDocument } from "../../../../services/LessonService";

interface DocumentEditFormProps {
   editDocument: IDocument;
   handleSave: (updateDocument: IDocument) => void;
}

const DocumentEditForm: React.FC<DocumentEditFormProps> = ({
   editDocument,
   handleSave,
}) => {
   const { t } = useTranslation();
   const { mode } = useThemeContext();

   const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
   const textColor = mode === "light" ? "#000000" : "#ffffff";
   const [selectedFile, setSelectedFile] = useState<File | null>(null);
   const [editTitle, setEditTitle] = useState<string>("");
   const [editDescription, setEditDescription] = useState<string>("");

   useEffect(() => {
      if (editDocument) {
         setEditTitle(editDocument.title);
         setEditDescription(editDocument.description);
      } else {
         setEditTitle("");
         setEditDescription("");
      }
   }, [editDocument]);

   const onSave = async () => {
      if (editDocument) {
         let file_id = "";
         if (selectedFile) {
            try {
               file_id = await saveDocument(selectedFile);
            } catch (error) {
               console.error("File upload failed:", error);
            }
         }

         const updatedDocument: IDocument = {
            title: editTitle,
            description: editDescription,
            file_url: file_id, 
         };

         console.log(updatedDocument);
         setSelectedFile(null); 

         handleSave(updatedDocument);
      }
   };

   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
         setSelectedFile(event.target.files[0]);
      }
   };

   return (
      <Box>
         <TextField
            label={t("Title")}
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            fullWidth
            margin="normal"
         />

         <RichTextBox
            text={editDescription}
            handleTextChange={(newText) => setEditDescription(newText)}
         />

         <Box display="flex" alignItems="center" mt={2}>
            <Button
               variant="outlined"
               component="label"
               sx={{ backgroundColor, color: textColor }}
            >
               {t("Upload File")}
               <input
                  type="file"
                  hidden
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
               />
            </Button>

            {selectedFile && (
               <Typography sx={{ ml: 2 }}>
                  {t("Selected File")}: {selectedFile.name}
               </Typography>
            )}
         </Box>

         <Button
            sx={{ mt: 2, backgroundColor, color: textColor }}
            startIcon={<SaveIcon />}
            onClick={onSave}
         >
            {t("Save")}
         </Button>
      </Box>
   );
};

export default DocumentEditForm;
