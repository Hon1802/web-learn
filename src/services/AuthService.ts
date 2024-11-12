import axios from "axios";
import {
   LoginRequest,
   SignUpRequest,
   LoginResponse,
   SignUpResponse,
   LogOutResponse,
   UpdatePasswordResponse,
   UpdatePasswordRequest,
   ForgotPasswordRequest,
   ForgotPasswordResponse,
   ResetPasswordRequest,
   ResetPasswordResponse,
} from "../models/Auth";
import { Error } from "../models/Error";

export const login = async ({
   email,
   password,
}: LoginRequest): Promise<LoginResponse | Error> => {
  return await axios
    .post(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/users/login`,
      { email, password }, // Sending email and password in the body
      { withCredentials: true }
    )
    .then((res:any) => {
      return res.data;
    })
    .catch((err:any) => {
      return err.response.data;
    });
};

export const signUp = async ({
   email,
   password,
   passwordConfirm,
   firstName,
   lastName,
}: SignUpRequest): Promise<SignUpResponse | Error> => {
   console.log(process.env.REACT_APP_SERVER_URL);
   console.log("process.env.REACT_APP_SERVER_URL");

   return await axios
      .post(
         `${process.env.REACT_APP_SERVER_URL}/api/v1/users/signup`,
         { email, password, passwordConfirm, firstName, lastName },
         { withCredentials: true },
      )
      .then((res: any) => {
         return res.data;
      })
      .catch((err: any) => {
         return err.response.data;
      });
};

export const logOut = async (): Promise<LogOutResponse | Error> => {
   return await axios
      .post(
         `${process.env.REACT_APP_SERVER_URL}/api/v1/users/logout`,
         {},
         {
            withCredentials: true,
         },
      )
      .then((res: any) => {
         return res.data;
      })
      .catch((err: any) => {
         return err.response.data;
      });
};

export const updatePassword = async ({
   passwordCurrent,
   password,
   passwordConfirm,
}: UpdatePasswordRequest): Promise<UpdatePasswordResponse | Error> => {
   return await axios
      .patch(
         `${process.env.REACT_APP_SERVER_URL}/api/v1/users/updatePassword`,
         { passwordCurrent, password, passwordConfirm },
         {
            withCredentials: true,
         },
      )
      .then((res: any) => {
         return res.data;
      })
      .catch((err: any) => {
         return err.response.data;
      });
};

export const forgotPassword = async ({
   email,
}: ForgotPasswordRequest): Promise<ForgotPasswordResponse | Error> => {
   return await axios
      .post(
         `${process.env.REACT_APP_SERVER_URL}/api/v1/users/forgotPass`,
         { email },
         {
            withCredentials: true,
         },
      )
      .then((res: any) => {
         return res.data;
      })
      .catch((err: any) => {
         return err.response.data;
      });
};

export const resetPassword = async ({
   password,
   passwordConfirm,
   token,
}: ResetPasswordRequest): Promise<ResetPasswordResponse | Error> => {
   return await axios
      .patch(
         `${process.env.REACT_APP_SERVER_URL}/api/v1/users/resetPassword/${token}`,
         { password, passwordConfirm },
         {
            withCredentials: true,
         },
      )
      .then((res: any) => {
         return res.data;
      })
      .catch((err: any) => {
         return err.response.data;
      });
};

export const googleAuth = async (
   code: string,
): Promise<LoginResponse | Error> => {
   return await axios
      .get(
         `${process.env.REACT_APP_SERVER_URL}/api/v1/users/auth/google?code=${code}`,
         { withCredentials: true },
      )
      .then((res: any) => {
         return res.data;
      })
      .catch((err: any) => {
         return err.response.data;
      });
};

export const facebookAuth = async (
   id: string,
   name: string,
   email: string,
): Promise<LoginResponse | Error> => {
   return await axios
      .post(
         `${process.env.REACT_APP_SERVER_URL}/api/v1/users/auth/facebook`,
         { id, name, email },
         {
            withCredentials: true,
         },
      )
      .then((res: any) => {
         return res.data;
      })
      .catch((err: any) => {
         return err.response.data;
      });
};
