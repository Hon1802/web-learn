import React, { Suspense } from "react";
import {
   BrowserRouter as Router,
   Routes,
   Route,
   Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import LoadingPage from "./pages/LoadingPage";
import MyLearningPage from "./pages/MyLearningPage";
import CourseList from "./components/mylearning/CourseList";
import GoogleDriveViewer from "./pages/ViewFile";
import LearningPage from "./pages/learning/LearningPage";

const CartPage = React.lazy(() => import("./pages/Cart"));

const ForgotPassWordPage = React.lazy(
   () => import("./pages/auth/ForgotPassword"),
);
const ResetPassWordPage = React.lazy(
   () => import("./pages/auth/ResetPassword"),
);
const InstructorLayout = React.lazy(() => import("./pages/InstructorLayout"));
const InstructorCoursePage = React.lazy(
   () => import("./components/instructor/InstructorCoursePage"),
);
const CreateCoursePage = React.lazy(
   () => import("./components/instructor/CreateCoursePage"),
);
const CourseEditLayout = React.lazy(() => import("./pages/CourseEditLayout"));
const Goals = React.lazy(() => import("./components/courseedit/Goals"));

const Curriculum = React.lazy(
   () => import("./components/courseedit/Curriculum"),
);
const CourseLanding = React.lazy(
   () => import("./components/courseedit/CourseLanding"),
);
const CoursePricing = React.lazy(
   () => import("./components/courseedit/CoursePricing"),
);

const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const NewPage = React.lazy(() => import("./pages/NewPage"));

const NotFound = React.lazy(() => import("./pages/NotFound"));
const Layout = React.lazy(() => import("./components/Layout"));
const VerticalTabs = React.lazy(() => import("./pages/VerticalTabs"));
const EditProfilePage = React.lazy(() => import("./pages/user/EditProfile"));
const EditPhotoPage = React.lazy(() => import("./pages/user/EditPhoto"));
const EditAccountPage = React.lazy(() => import("./pages/user/EditAccount"));
const EditPrivacyPage = React.lazy(() => import("./pages/user/EditPrivacy"));
const EditNotificationsPage = React.lazy(
   () => import("./pages/user/EditNotifications"),
);
const CloseAccountPage = React.lazy(() => import("./pages/user/CloseAccount"));
const LoginPage = React.lazy(() => import("./pages/auth/Login"));
const LayoutFullWidth = React.lazy(
   () => import("./components/LayoutFullWidth"),
);
const SignUpPage = React.lazy(() => import("./pages/auth/SignUp"));
const CoursePage = React.lazy(() => import("./pages/CoursePage"));

const AppRoutes: React.FC = () => {
   return (
      <AuthProvider>
         <Router>
            <Suspense fallback={<LoadingPage />}>
               <Routes>
                  <Route element={<Layout />}>
                     <Route
                        path="/drive-viewer/:itemId/:fileType"
                        element={<GoogleDriveViewer />}
                     />
                     <Route path="/about" element={<About />} />
                     {/* new route */}
                     <Route path="/learn-video" element={<NewPage />} />
                     
                     {/*  */}
                     <Route path="*" element={<NotFound />} />
                     <Route path="cart" element={<CartPage />} />
                     <Route path="/learning" element={<LearningPage />} />
                     <Route
                        path="/user"
                        element={
                           <ProtectedRoute>
                              <VerticalTabs />
                           </ProtectedRoute>
                        }
                     >
                        <Route
                           index
                           element={<Navigate replace to="public-profile" />}
                        />
                        <Route path="public-profile" element={<div></div>} />
                        
                        <Route
                           path="edit-profile"
                           element={<EditProfilePage />}
                        />
                        <Route path="edit-photo" element={<EditPhotoPage />} />
                        <Route
                           path="edit-account"
                           element={<EditAccountPage />}
                        />
                        <Route
                           path="manage-subscriptions"
                           element={<div></div>}
                        />
                        <Route
                           path="edit-payment-methods"
                           element={<div></div>}
                        />
                        <Route
                           path="edit-privacy"
                           element={<EditPrivacyPage />}
                        />
                        <Route
                           path="edit-notifications"
                           element={<EditNotificationsPage />}
                        />
                        <Route path="edit-api-clients" element={<div></div>} />
                        <Route
                           path="close-account"
                           element={<CloseAccountPage />}
                        />
                        
                     </Route>
                  </Route>

                  <Route element={<LayoutFullWidth />}>
           
                     {" "}
                     <Route
                        path="/my-course"
                        element={
                           <ProtectedRoute>
                              <MyLearningPage />
                           </ProtectedRoute>
                        }
                     >
                        <Route
                           index
                           element={<Navigate replace to="learning" />}
                        />
                        <Route path="learning" element={<CourseList />} />
                        <Route path="lists" element={<div>toan</div>} />
                        <Route path="wishlist" element={<div>toan</div>} />
                        <Route path="archived" element={<div>toan</div>} />
                        <Route
                           path="learning-tools"
                           element={<div>toan</div>}
                        />
                     </Route>
                     <Route path="/" element={<Home />} />
                     <Route path="/login" element={<LoginPage />} />
                     <Route path="/signup" element={<SignUpPage />} />
                     <Route
                        path="/forgotpassword"
                        element={<ForgotPassWordPage />}
                     />
                     <Route
                        path="/resetpassword/:token"
                        element={<ResetPassWordPage />}
                     />
                     <Route
                        path="/course/:courseName"
                        element={<CoursePage />}
                     />
                  </Route>

                  <Route path="/instructor" element={<InstructorLayout />}>
                     <Route path="course" element={<InstructorCoursePage />} />
                  </Route>
                  <Route
                     path="/instructor/course/create"
                     element={<CreateCoursePage />}
                  />

                  {/* Course management routes */}
                  <Route
                     path="/instructor/course/:id/manage"
                     element={<CourseEditLayout />}
                  >
                     <Route path="goals" element={<Goals />} />
                     <Route path="film" element={<div></div>} />
                     <Route path="curriculum" element={<Curriculum />} />
                     <Route path="basics" element={<CourseLanding />} />
                     <Route path="pricing" element={<CoursePricing />} />
                     <Route path="promotions" element={<div></div>} />
                     <Route
                        path="communications/messages"
                        element={<div></div>}
                     />
                  </Route>
               </Routes>
            </Suspense>
         </Router>
      </AuthProvider>
   );
};

export default AppRoutes;
