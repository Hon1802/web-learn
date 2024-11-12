import axios from "axios";
import {
   CurriculumMap,
   ICreateCourse,
   ICreateCourseResponse,
   IUpdateCourse,
} from "../models/Course";

const course_url = `${process.env.REACT_APP_COURSE_SERVICE}/api/v1/courses`;

export const createCourse = async (
   formData: ICreateCourse,
): Promise<ICreateCourseResponse | Error> => {
   const response = await axios
      .post(
         `${course_url}`,
         {
            ...formData,
         },
         {
            withCredentials: true,
         },
      )
      .then((res: any) => {
         console.log("idddddddddddđdddd", res.data.course_id, res.data);
         return res.data.course_id;
      })
      .catch((err: any) => {
         console.log("toannnnnnnnnnnnnnnnn", err.response.data);
         return err.response.data;
      });

   return response;
};

export const updateCourse = async (
   id: string,
   formData: IUpdateCourse,
): Promise<ICreateCourseResponse | Error> => {
   console.log(formData);
   const response = await axios
      .put(
         `${course_url}/${id}`,
         {
            ...formData,
         },
         {
            withCredentials: true,
         },
      )
      .then((res: any) => {
         console.log(res);
         return res;
      })
      .catch((err: any) => {
         console.log(err);

         return err.response.data;
      });

   return response;
};

export const getCourse = async (id: string): Promise<any | Error> => {
   const response = await axios
      .get(`${course_url}/${id}`, {
         withCredentials: true,
      })
      .then((res: any) => {
         console.log(res.data);
         return res.data;
      })
      .catch((err: any) => {
         console.log(err);
         return err.response.data;
      });
   return response;
};

export const updateCourseImage = async (id: string, file: File) => {
   const formData = new FormData();
   formData.append("file", file);

   const response = await axios
      .put(`${course_url}/update_thumbnail/${id}`, formData, {
         withCredentials: true,
         headers: {
            "Content-Type": "multipart/form-data",
         },
      })
      .then((res: any) => {
         console.log(res);
         return res;
      })
      .catch((err: any) => {
         console.log(err);
         return err;
      });

   return response;
};

export const updatePromotionalVideo = async (id: string, file: File) => {
   const formData = new FormData();
   formData.append("file", file);

   const response = await axios
      .put(`${course_url}/update_promotional_video/${id}`, formData, {
         withCredentials: true,
         headers: {
            "Content-Type": "multipart/form-data",
         },
      })
      .then((res: any) => {
         console.log(res);
         return res;
      })
      .catch((err: any) => {
         console.log(err);
         return err;
      });

   return response;
};

export const getCourseCurriculum = async (
   id: string,
): Promise<CurriculumMap[] | Error> => {
   try {
      const response = await axios.get(`${course_url}/get_curriculum/${id}`, {
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

export const updateCurriculumSection = async (
   id: string,
   sections: CurriculumMap[],
) => {
   try {
      const response = await axios.put(
         `${course_url}/${id}`,
         {
            sections: sections,
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
