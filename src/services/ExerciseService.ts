import axios from "axios";
import { MultipleChoiceQuestion } from "../models/Course";

const exercise_url = `${process.env.REACT_APP_COURSE_SERVICE}/api/v1/exercise`;

export const getExerciseInfo = async (id: string) => {
   try {
      const response = await axios.get(`${exercise_url}/${id}`, {
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

export const createNewExercise = async () => {
   try {
      const response = await axios.post(
         `${exercise_url}`,
         {
            title: "New Exercise",
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

export const updateQuestions = async (
   id: string,
   questions: MultipleChoiceQuestion[],
) => {
   try {
      const response = await axios.put(
         `${exercise_url}/${id}`,
         {
            questions: questions,
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

export const genQuestion = async (
   count: number,
   lang: string,
   difficult: number,
   description: string,
) => {
   try {
      const response = await axios.post(
         `${exercise_url}/gen_questions`,
         {
            count: count,
            lang: lang,
            difficult: difficult,
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
