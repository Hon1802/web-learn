import axios from "axios";
import {
   DeleteMeResponse,
   GetUserResponse,
   UpdateUserResponse,
   UserProfile,
} from "../models/User";
import { Error } from "../models/Error";

export const getMe = async (): Promise<GetUserResponse | Error> => {
   const response = await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/me`, {
         withCredentials: true,
      })
      .then((res) => {
         return res.data;
      })
      .catch((err) => {
         return err.response.data;
      });

   return response;
};

export const updateMe = async (
   userProfile: Partial<UserProfile>,
): Promise<UpdateUserResponse | Error> => {
   return await axios
      .patch(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/updateMe`, userProfile, {
         withCredentials: true,
      })
      .then((res) => {
         return res.data;
      })
      .catch((err) => {
         return err.response.data;
      });
};

export const updatePhoto = async (
   formData: FormData,
): Promise<UpdateUserResponse | Error> => {
   return await axios
      .patch(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/updatePhoto`, formData, {
         withCredentials: true,
      })
      .then((res) => {
         return res.data;
      })
      .catch((err) => {
         return err.response.data;
      });
};

export const deleteMe = async (): Promise<DeleteMeResponse | Error> => {
   return await axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/deleteMe`, {
         withCredentials: true,
      })
      .then((res) => {
         return res.data;
      })
      .catch((err) => {
         return err.response.data;
      });
};
