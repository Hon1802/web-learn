import React, { useEffect, useState } from "react";
import { MultipleChoiceQuestion } from "../../../../models/Course";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../../../theme/ThemeContext";
import { updateQuestions } from "../../../../services/ExerciseService";
import QuestionsList from "./AllQuestionsList";
import QuestionsModal from "./GenQuestionsModal";

interface QuestionsTabProps {
   id: string;
   questions: MultipleChoiceQuestion[] | undefined;
}

const QuestionsTab: React.FC<QuestionsTabProps> = ({ id, questions }) => {
   const [data, setData] = useState<MultipleChoiceQuestion[] | undefined>(
      questions,
   );
   const [editDocument, setEditDocument] =
      useState<MultipleChoiceQuestion | null>(null);
   const [editIndex, setEditIndex] = useState<number | null>(null);
   const [showModal, setShowModal] = useState(false);
   const { t } = useTranslation();
   const { mode } = useThemeContext();

   const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
   const textColor = mode === "light" ? "#000000" : "#ffffff";

   useEffect(() => {
      setData(questions);
   }, [questions]);

   const handleAddMore = async () => {
      if (data) {
         const updatedData = [
            ...data,
            {
               question_text: "New Question",
               choices: [],
               correct_explanation: "",
               related_lecture: "",
            },
         ];
         await updateQuestions(id, updatedData);
         setData(updatedData);
      }
   };

   return (
      <Box>
         {editDocument ? (
            <></>
         ) : (
            <>
               {data && (
                  <QuestionsList
                     data={data}
                     onEdit={(item, index) => {
                        setEditDocument(item);
                        setEditIndex(index);
                     }}
                  />
               )}
               <Button
                  sx={{
                     width: "fit-content",
                     mt: 2,
                     backgroundColor,
                     color: textColor,
                     "&:hover": { backgroundColor },
                  }}
                  onClick={handleAddMore}
                  startIcon={<AddIcon />}
               >
                  {t("Add_more")}
               </Button>
               <Button
                  sx={{
                     width: "fit-content",
                     mt: 2,
                     backgroundColor,
                     color: textColor,
                     "&:hover": { backgroundColor },
                  }}
                  onClick={() => setShowModal(true)}
                  startIcon={<AddIcon />}
               >
                  {t("ai_gen_question")}
               </Button>
            </>
         )}
         <QuestionsModal open={showModal} onClose={() => setShowModal(false)} />
      </Box>
   );
};

export default QuestionsTab;
