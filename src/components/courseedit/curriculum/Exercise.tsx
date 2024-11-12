import React, { useEffect, useState } from "react";
import { CurriculumMap, IExercise } from "../../../models/Course";
import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../../theme/ThemeContext";
import { updateLessonDescription } from "../../../services/LessonService";
import RichTextBox from "../../reused/RichTextBoxComponent";
import AutoCloseAlert from "../../reused/Alert";
import { getExerciseInfo } from "../../../services/ExerciseService";
import QuestionsTab from "./questiontab/QuestionsTab";

interface ExerciseProps {
   exercise: CurriculumMap;
}

const ExerciseForm: React.FC<ExerciseProps> = ({ exercise }) => {
   const [data, setData] = useState<IExercise>();
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
         if (exercise.id) {
            const data = await getExerciseInfo(exercise.id);
            if (data) {
               setData(data);
               setEditDescription(data.description);
            }
         }
      };
      fetchData();
   }, [exercise]);

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
      if (exercise.id) {
         const response = await updateLessonDescription(
            exercise.id,
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
               {t("exercise")} {exercise.ordinal_number} : {data?.title}
            </Typography>
            <Box display={"flex"} ml={"auto"}>
               <Button sx={styleButton} onClick={() => handleChange(1)}>
                  {t("edit_question")}
               </Button>
               <Button sx={styleButton} onClick={() => handleChange(2)}>
                  {t("description")}
               </Button>
            </Box>
         </Box>
         <Box width={"100%"} height={"100%"}>
            {selectedTab === 1 && (
               <Box>
                  {data && (
                     <QuestionsTab id={data._id} questions={data.questions} />
                  )}
               </Box>
            )}
            {data && selectedTab === 2 && (
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

export default ExerciseForm;
