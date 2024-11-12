import axios from "axios";
import { IDocument } from "../models/Course";

const lesson_url = `${process.env.REACT_APP_COURSE_SERVICE}/api/v1/lessons`;

export const getLessonInfo = async (id: string) => {
   try {
      const response = await axios.get(`${lesson_url}/${id}`, {
         withCredentials: true,
      });

      return response.data;
   } catch (error: any) {
      if (error.response) {
         console.log("Error Status Code:", error.response.status);
         console.log("Error Data:", error.response.data);
         return error.response.data; // Return error data
      } else {
         console.log("Request failed:", error.message);
         return new Error(error.message); // Return generic error if no response
      }
   }
};

export const updateDocuments = async (id: string, documents: IDocument[]) => {
   try {
      const response = await axios.put(
         `${lesson_url}/${id}`,
         {
            documents: documents,
         },
         {
            withCredentials: true,
         },
      );
      return response.data;
   } catch (error: any) {
      if (error.response) {
         console.log("Error Status Code:", error.response.status);
         console.log("Error Data:", error.response.data);
         return error.response.data; // Return error data
      } else {
         console.log("Request failed:", error.message);
         return new Error(error.message); // Return generic error if no response
      }
   }
};

export const saveDocument = async (file: File) => {
   const formData = new FormData();

   formData.append("file", file);

   try {
      const response = await axios.post(
         `${lesson_url}/save_document`,
         formData,
         {
            withCredentials: true,
            headers: {
               "Content-Type": "multipart/form-data",
            },
         },
      );
      console.log(response);
      return response.data.data.id;
   } catch (error: any) {
      if (error.response) {
         console.log("Error Status Code:", error.response.status);
         console.log("Error Data:", error.response.data);
         return error.response.data; // Return error data
      } else {
         console.log("Request failed:", error.message);
         return new Error(error.message); // Return generic error if no response
      }
   }
};
export const updateLessonVideo = async (id: string, file: File) => {
   const formData = new FormData();

   formData.append("file", file);
   formData.append("lesson_id", id);

   try {
      const response = await axios.post(
         `${lesson_url}/update_video`,
         formData, // Pass formData directly
         {
            withCredentials: true,
            headers: {
               "Content-Type": "multipart/form-data",
            },
         },
      );
      return response.data;
   } catch (error: any) {
      if (error.response) {
         console.log("Error Status Code:", error.response.status);
         console.log("Error Data:", error.response.data);
         return error.response.data; // Return error data
      } else {
         console.log("Request failed:", error.message);
         return new Error(error.message); // Return generic error if no response
      }
   }
};

export const updateLessonDescription = async (
   id: string,
   description: string,
) => {
   try {
      const response = await axios.put(
         `${lesson_url}/${id}`,
         {
            description: description,
         },
         {
            withCredentials: true,
         },
      );
      return response.data;
   } catch (error: any) {
      if (error.response) {
         console.log("Error Status Code:", error.response.status);
         console.log("Error Data:", error.response.data);
         return error.response.data; // Return error data
      } else {
         console.log("Request failed:", error.message);
         return new Error(error.message); // Return generic error if no response
      }
   }
};

export const createNewLesson = async () => {
   try {
      const response = await axios.post(
         `${lesson_url}`,
         {
            title: "New Lesson",
         },
         {
            withCredentials: true,
         },
      );
      return response.data;
   } catch (error: any) {
      if (error.response) {
         console.log("Error Status Code:", error.response.status);
         console.log("Error Data:", error.response.data);
         return error.response.data; // Return error data
      } else {
         console.log("Request failed:", error.message);
         return new Error(error.message); // Return generic error if no response
      }
   }
};
