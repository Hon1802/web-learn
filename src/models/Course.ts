export interface ICreateCourse {
   title: string;
   type: string;
   category: string[];
   time_spend: number;
}

export interface ICreateCourseResponse {
   id: string;
}

export interface IGoal {
   learningObjectives: string[];
   requirements: string[];
   intendedLearners: string[];
}

export interface IPrice {
   amount: string;
   currency: string;
}

export interface IUpdateCourse {
   title?: string;
   type?: string;
   category?: string[];
   time_spend?: number;

   goals?: IGoal;

   subtitle?: string;
   description?: string;
   language?: string[];
   level?: string[];
   objectives?: string;

   thumbnail?: string;
   promotional_video?: string;

   price?: IPrice;
}

export interface CurriculumMap {
   id: string;
   ordinal_number: number;
   type?: string;
}

export interface ISection {
   _id: string;
   title: string;
   lessons: CurriculumMap[];
}

export interface IDocument {
   title: string;
   file_url: string;
   file_type?: string;
   description: string;
}

export interface ILesson {
   _id: string;
   title: string;
   description?: string;
   video_url?: string;
   duration?: number;
   documents?: IDocument[];
}
export interface Choice {
   option_text: string;
   is_correct: boolean;
}

export interface MultipleChoiceQuestion {
   question_text: string;
   choices: Choice[];
   correct_explanation: string;
   related_lecture?: string;
}

export interface IExercise {
   _id: string;
   title: string;
   description: string;
   questions: MultipleChoiceQuestion[];
}
