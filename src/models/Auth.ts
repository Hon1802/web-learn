import { User } from "./User";

// TYPES OF ACTION REDUCER AUTH
export enum AuthAction {}

// REQUEST
export interface LoginRequest {
   email: string;
   password: string;
}

export interface SignUpRequest {
   firstName: string;
   lastName: string;
   email: string;
   password: string;
   passwordConfirm: string;
}

export interface UpdatePasswordRequest {
   passwordCurrent: string;
   password: string;
   passwordConfirm: string;
}

export interface ForgotPasswordRequest {
   email: string;
}

export interface ResetPasswordRequest {
   password: string;
   passwordConfirm: string;
   token: string | undefined;
}

// RESPONSE
export interface LoginResponse {
   status: string;
   data: Partial<User>;
}

export interface SignUpResponse {
   status: string;
   data: Partial<User>;
}

export interface LogOutResponse {
   status: string;
}

export interface UpdatePasswordResponse {
   status: string;
   data: Partial<User>;
}

export interface ForgotPasswordResponse {
   status: string;
   message: string;
}

export interface ResetPasswordResponse {
   status: string;
   data: Partial<User>;
}
