import { Box } from "@mui/material";
import { useState } from "react";
import FileUploadButton from "./FileUploadButton";
import { updateLessonVideo } from "../../../../services/LessonService";
import AutoCloseAlert from "../../../reused/Alert";

interface UploadVideoProps {
   video_url: string | undefined;
   id: string;
}

const UploadVideo: React.FC<UploadVideoProps> = ({ video_url, id }) => {
   const [file, setFile] = useState<File | null>(null);
   const [alertOpen, setAlertOpen] = useState(false);
   const handleCloseAlert = () => {
      setAlertOpen(false);
   };
   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
         const selectedFile = event.target.files[0];
         setFile(selectedFile);
      }
   };

   const updateVideo = async () => {
      if (!file || !id) {
         return;
      }
      const response = await updateLessonVideo(id, file);
      if (response.success) {
         setAlertOpen(true);
      } else {
      }
   };

   return (
      <Box minHeight={"200px"} width={"100%"}>
         <FileUploadButton
            onFileChange={handleFileChange}
            id={video_url}
            updateVideo={updateVideo}
         />
         <AutoCloseAlert
            severity="success"
            message="Upload video completed."
            open={alertOpen}
            onClose={handleCloseAlert}
         />{" "}
      </Box>
   );
};

export default UploadVideo;
