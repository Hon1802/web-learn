import axios from "axios";
import { CurriculumMap } from "../models/Course";

const section_url = `${process.env.REACT_APP_COURSE_SERVICE}/api/v1/sections`;

export const getSectionInfo = async (id: string) => {
   try {
      const response = await axios.get(`${section_url}/${id}`, {
         withCredentials: true,
      });

      return response.data; // Return the data on success
   } catch (error: any) {
      // Handle error and check for response status
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

export const updateSectionLesson = async (
   id: string,
   lessons: CurriculumMap[],
) => {
   console.log(lessons);
   try {
      const response = await axios.put(
         `${section_url}/${id}`,
         {
            lessons: lessons,
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

export const createNewSection = async () => {
   try {
      const response = await axios.post(
         `${section_url}`,
         {
            title: "New Section",
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
