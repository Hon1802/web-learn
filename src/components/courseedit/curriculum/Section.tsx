import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CurriculumMap, ISection } from "../../../models/Course";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import LessonForm from "./Lession";
import { useThemeContext } from "../../../theme/ThemeContext";
import {
   getSectionInfo,
   updateSectionLesson,
} from "../../../services/SectionService";
import AddIcon from "@mui/icons-material/Add";
import { createNewLesson } from "../../../services/LessonService";
import ExcerciseForm from "./Exercise";
import { createNewExercise } from "../../../services/ExerciseService";

type SectionProps = {
   section: CurriculumMap;
};

const Section: React.FC<SectionProps> = ({ section }) => {
   const { t } = useTranslation();
   const { mode } = useThemeContext();

   const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
   const textColor = mode === "light" ? "#000000" : "#ffffff";
   const [sectionInfo, setSectionInfo] = useState<ISection>();
   const [lessons, setLessons] = useState<CurriculumMap[]>();

   useEffect(() => {
      const fetchData = async () => {
         if (section.id) {
            const data = await getSectionInfo(section.id);
            if (data) {
               console.log(data);
               setSectionInfo(data);
               setLessons(data.lessons);
            }
         }
      };
      fetchData();
   }, [section]);

   const handleDragEnd = async (result: any) => {
      if (!result.destination) return;
      if (!lessons) return;

      const items = Array.from(lessons);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      const updatedItems = items.map((item, index) => ({
         ...item,
         ordinal_number: index + 1,
      }));

      setLessons(updatedItems);
      await updateSectionLesson(section.id, updatedItems);
   };

   const styleButton = {
      width: "fit-content",
      m: 2,
      backgroundColor,
      color: textColor,

      "&:hover": {
         backgroundColor,
      },
   };

   const handleAddNormal = async () => {
      const response = await createNewLesson();
      if (response.lesson_id) {
         const newItem: CurriculumMap = {
            id: response.lesson_id,
            ordinal_number: lessons ? lessons.length + 1 : 1,
            type: "lesson",
         };
         if (lessons) {
            const updatedItems = [...lessons, newItem];
            console.log(updatedItems);
            setLessons(updatedItems);
            await updateSectionLesson(section.id, updatedItems);
         } else {
            setLessons([newItem]);
            await updateSectionLesson(section.id, [newItem]);
         }
      }
   };

   const handleAddExcercise = async () => {
      const response = await createNewExercise();
      if (response.exercise_id) {
         const newItem: CurriculumMap = {
            id: response.exercise_id,
            ordinal_number: lessons ? lessons.length + 1 : 1,
            type: "excercise",
         };
         if (lessons) {
            const updatedItems = [...lessons, newItem];
            setLessons(updatedItems);
            await updateSectionLesson(section.id, updatedItems);
         } else {
            setLessons([newItem]);
            await updateSectionLesson(section.id, [newItem]);
         }
      }
   };

   return (
      <Box flexDirection={"column"} width={"100%"} height={"100%"}>
         <Typography ml={2} fontWeight={"bold"} variant="h6" color={textColor}>
            {t("Section")} {section.ordinal_number} : {sectionInfo?.title}
         </Typography>
         <Box p={2}>
            {lessons && (
               <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="curriculum">
                     {(provided : any) => (
                        <Box
                           {...provided.droppableProps}
                           ref={provided.innerRef}
                           sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 2,
                              backgroundColor: { backgroundColor },
                           }}
                        >
                           {lessons.map((item, index) => (
                              <Draggable
                                 key={item.id}
                                 draggableId={item.id}
                                 index={index}
                              >
                                 {(provided:any) => (
                                    <Box
                                       ref={provided.innerRef}
                                       {...provided.draggableProps}
                                       {...provided.dragHandleProps}
                                       sx={{
                                          padding: "10px",
                                          border: "1px solid",
                                          borderRadius: "4px",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "space-between",
                                       }}
                                    >
                                       {item.type === "lesson" ? (
                                          <LessonForm lesson={item} />
                                       ) : (
                                          <ExcerciseForm exercise={item} />
                                       )}
                                    </Box>
                                 )}
                              </Draggable>
                           ))}
                           {provided.placeholder}
                        </Box>
                     )}
                  </Droppable>
               </DragDropContext>
            )}
            <Box>
               <Button
                  sx={styleButton}
                  startIcon={<AddIcon />}
                  onClick={handleAddNormal}
               >
                  {t("add_normal_lesson")}
               </Button>
               <Button
                  sx={styleButton}
                  startIcon={<AddIcon />}
                  onClick={handleAddExcercise}
               >
                  {t("add_exercise")}
               </Button>
            </Box>
         </Box>
      </Box>
   );
};

export default Section;
