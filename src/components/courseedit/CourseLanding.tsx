import { Box, Button, Typography } from "@mui/material";
import { useThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import Head from "./Head";
import { useEffect, useState } from "react";
import TitleSubtitleSection from "./courselanding/TitleSubtitleSection";
import DropdownSection from "./courselanding/DropdownSection";
import TextFieldSection from "./courselanding/TextFieldSection";
import { useParams } from "react-router-dom";
import {
   getCourse,
   updateCourse,
   updateCourseImage,
   updatePromotionalVideo,
} from "../../services/CourseService";
import { IUpdateCourse } from "../../models/Course";
import AutoCloseAlert from "../reused/Alert";
import ImageUploadSection from "./courselanding/ImageUploadSection";
import VideoUploadSection from "./courselanding/VideoUploadSection";
import { categories, language, level } from "../data";
import RichTextBox from "../reused/RichTextBoxComponent";
const CourseLanding: React.FC = () => {
   const { t } = useTranslation();
   const { mode } = useThemeContext();
   const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
   const textColor = mode === "light" ? "#000000" : "#ffffff";

   const [formValue, setFormValue] = useState<IUpdateCourse>({
      title: "",
      subtitle: "",
      description: "",
      language: [""],
      level: [""],
      category: [""],
      objectives: "",
      thumbnail: "",
      promotional_video: "",
   });
   const { id } = useParams<{ id: string }>();
   const [alertOpen, setAlertOpen] = useState(false);

   const [img, setImg] = useState<File>();
   const [video, setVideo] = useState<File>();

   useEffect(() => {
      const fetchData = async () => {
         if (id) {
            const data: IUpdateCourse = await getCourse(id);
            console.log(data);
            const collection = {
               title: data.title || "",
               subtitle: data.subtitle || "",
               description: data.description || "",
               language: data.language || [""],
               level: data.level || [""],
               category: data.category || [""],
               objectives: data.objectives || "",
               thumbnail: data.thumbnail || "",
               promotional_video: data.promotional_video || "",
            };
            console.log("collection");
            console.log(collection);

            setFormValue(collection);
         }
      };

      fetchData();
   }, [id]);

   useEffect(() => {
      console.log(formValue);
   }, [formValue]);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormValue({
         ...formValue,
         [name]: value,
      });
   };

   const handleSelectChange = (name: string, value: any) => {
      setFormValue({
         ...formValue,
         [name]: value,
      });
   };

   const handleDescriptionChange = (value: string) => {
      setFormValue({
         ...formValue,
         description: value,
      });
   };

   const handleSave = async () => {
      console.log("Form values saved:", formValue);

      if (id) {
         const responne = await updateCourse(id, formValue);
         if (img) {
            await updateCourseImage(id, img);
         }
         if (video) {
            await updatePromotionalVideo(id, video);
         }
         console.log(responne);
         setAlertOpen(true);
      }
   };

   const commonTextFieldStyles = {
      width: "100%",
      mb: "20px",
      borderRadius: 5,
      fontSize: "20px",
   };

   const handleFileUpload = (name: string, file: File) => {
      console.log(`${name} uploaded:`, file);
      setImg(file);
   };
   const handleVideoUpload = (name: string, file: File) => {
      console.log(`${name} uploaded:`, file);
      setVideo(file);
   };
   const handleCloseAlert = () => {
      setAlertOpen(false);
   };

   return (
      <Box
         width={"100%"}
         height={"100%"}
         sx={{
            border: "0.5px groove",
            backgroundColor: backgroundColor,
            color: textColor,
            padding: "20px",
            borderRadius: "8px",
         }}
      >
         <Head title={"course_landing_page"} />
         <Box mx={"20px"}>
            <AutoCloseAlert
               severity="success"
               message="Save change completed."
               open={alertOpen}
               onClose={handleCloseAlert}
            />
            <TitleSubtitleSection
               title={formValue.title}
               subtitle={formValue.subtitle}
               handleInputChange={handleInputChange}
               commonTextFieldStyles={commonTextFieldStyles}
            />

            <Typography variant="h6" fontWeight={"bold"}>
               {t("course_description")}
            </Typography>
            <RichTextBox
               text={formValue.description}
               handleTextChange={handleDescriptionChange}
            />

            <Box
               display={"flex"}
               flexDirection={"row"}
               justifyContent={"space-between"}
               width={"100%"}
            >
               <DropdownSection
                  label={t("language")}
                  name="language"
                  value={formValue.language}
                  options={language}
                  handleSelectChange={handleSelectChange}
               />
               <DropdownSection
                  label={t("level")}
                  name="level"
                  value={formValue.level}
                  options={level}
                  handleSelectChange={handleSelectChange}
               />
               <DropdownSection
                  label={t("course_categories")}
                  name="category"
                  value={formValue.category}
                  options={categories}
                  handleSelectChange={handleSelectChange}
               />
            </Box>

            <TextFieldSection
               label={t("primary_taught")}
               name="objectives"
               value={formValue.objectives}
               handleInputChange={handleInputChange}
               commonTextFieldStyles={commonTextFieldStyles}
            />

            <Box>
               <Typography variant="h6" fontWeight={"bold"}>
                  {t("image")}
               </Typography>{" "}
               <ImageUploadSection
                  label="course_image"
                  name="thumbnail"
                  id={formValue.thumbnail}
                  handleFileUpload={handleFileUpload}
               />{" "}
               <Typography variant="h6" fontWeight={"bold"}>
                  {t("promotional_video")}
               </Typography>{" "}
               <VideoUploadSection
                  label="promotional_video"
                  name="promotionaVideo"
                  id={formValue.promotional_video}
                  handleVideoUpload={handleVideoUpload}
               />
            </Box>
         </Box>
         <Button
            sx={{
               fontSize: "16px",
               my: "15px",
               ml: "15px",
               backgroundColor: mode === "dark" ? "white" : "black",
               color: mode === "dark" ? "black" : "white",
               padding: "10px 20px",
               fontWeight: "bold",
               ":hover": {
                  backgroundColor: mode === "dark" ? "white" : "black",
               },
               width: "200px",
            }}
            onClick={handleSave}
         >
            {t("save_changed")}
         </Button>
      </Box>
   );
};

export default CourseLanding;
