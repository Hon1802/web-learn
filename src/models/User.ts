// USER MODEL
export interface User {
   id: number;
   firstName: string;
   lastName: string;
   email: string;
   headline: string;
   description: string;
   photo: string;
   googleLink: string;
   facebookLink: string;
   websiteLink: string;
   twitterLink: string;
   linkedInLink: string;
   youtubeLink: string;
   role: string;
   DateChangePass: Date;
   passwordResetToken: String;
   passwordResetExpires: Date;
}

// INPUT TYPE
export interface UserProfile {
   firstName: string;
   lastName: string;
   headline: string;
   photo: string;
   googleLink: string;
   facebookLink: string;
   websiteLink: string;
   twitterLink: string;
   linkedInLink: string;
   youtubeLink: string;
}

// CRUD Users RESPONSE
export interface GetUserResponse {
   status: string;
   data: Partial<User>;
}

export interface UpdateUserResponse {
   status: string;
   data: Partial<User>;
}

export interface DeleteMeResponse {
   status: string;
   data: null;
}
