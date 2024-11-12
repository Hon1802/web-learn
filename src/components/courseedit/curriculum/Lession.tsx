import React, { useEffect, useState } from "react";
import { CurriculumMap, ILesson } from "../../../models/Course";
import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import DocumentTab from "./DocumentTab";
import { useThemeContext } from "../../../theme/ThemeContext";
import {
   getLessonInfo,
   updateLessonDescription,
} from "../../../services/LessonService";
import UploadVideo from "./videotab/UploadVideo";
import RichTextBox from "../../reused/RichTextBoxComponent";
import AutoCloseAlert from "../../reused/Alert";

interface LessonProps {
   lesson: CurriculumMap;
}

const LessonForm: React.FC<LessonProps> = ({ lesson }) => {
   const [data, setData] = useState<ILesson>();
   const { t } = useTranslation();
   const { mode } = useThemeContext();
   const [editDescription, setEditDescription] = useState<string>("");
   const textColor = mode === "light" ? "#000000" : "#ffffff";
   const [selectedTab, setSelectedTab] = useState(0);
   const [alertOpen, setAlertOpen] = useState(false);

   const handleCloseAlert = () => {
      setAlertOpen(false);
   };
   const handleChange = (newValue: number) => {
      if (selectedTab === newValue) {
         setSelectedTab(0);
         return;
      }
      setSelectedTab(newValue);
   };

   useEffect(() => {
      const fetchData = async () => {
         if (lesson.id) {
            const data = await getLessonInfo(lesson.id);
            if (data) {
               setData(data);
               setEditDescription(data.description);
            }
         }
      };
      fetchData();
   }, [lesson]);

   const styleButton = {
      fontSize: "12px",
      mx: "5px",
      backgroundColor: mode === "dark" ? "white" : "black",
      color: mode === "dark" ? "black" : "white",
      padding: "10px 20px",
      fontWeight: "bold",
      ":hover": {
         backgroundColor: mode === "dark" ? "white" : "black",
      },
   };

   const updateDescription = async () => {
      if (lesson.id) {
         const response = await updateLessonDescription(
            lesson.id,
            editDescription,
         );
         console.log(response);
         if (response.success) {
            setAlertOpen(true);
         }
      }
   };
   return (
      <Box flexDirection={"column"} display={"flex"} width={"100%"}>
         <Box
            flexDirection={"row"}
            display={"flex"}
            justifyContent={"space-between"}
            width={"100%"}
            alignItems={"center"}
         >
            <Typography color={textColor} fontWeight={"bold"}>
               {t("lesson")} {lesson.ordinal_number} : {data?.title}
            </Typography>
            <Box display={"flex"} ml={"auto"}>
               <Button sx={styleButton} onClick={() => handleChange(1)}>
                  {t("document")}
               </Button>
               <Button sx={styleButton} onClick={() => handleChange(2)}>
                  {t("video")}
               </Button>
               <Button sx={styleButton} onClick={() => handleChange(3)}>
                  {t("description")}
               </Button>
            </Box>
         </Box>
         <Box width={"100%"} height={"100%"}>
            {selectedTab === 1 && (
               <Box>
                  {data && (
                     <DocumentTab id={data._id} documents={data.documents} />
                  )}
               </Box>
            )}
            {data && selectedTab === 2 && (
               <UploadVideo video_url={data.video_url} id={lesson.id} />
            )}
            {data && selectedTab === 3 && (
               <Box minHeight={"200px"} width={"100%"}>
                  <RichTextBox
                     text={editDescription}
                     handleTextChange={(newText) => setEditDescription(newText)}
                  />
                  <Button
                     variant="outlined"
                     onClick={updateDescription}
                     sx={styleButton}
                  >
                     {t("updateDescription")}
                  </Button>
               </Box>
            )}
            <AutoCloseAlert
               severity="success"
               message="Update description completed."
               open={alertOpen}
               onClose={handleCloseAlert}
            />{" "}
         </Box>
      </Box>
   );
};

export default LessonForm;
