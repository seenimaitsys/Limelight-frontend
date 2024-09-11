import { Route, Routes, Navigate } from "react-router-dom";
import ReviewerLogion from "../../layout/ReviewerLogin";
import VideoReview from "../../layout/VideoReview";
import AddNewReviewers from "../../layout/AddNewReviewers";
import PrivateRoute from "../../components/PrivateRoute";
import VideoList from "../../layout/VideoList";
import ManagerMain from "../../components/Manager";
import VideoList1 from "../../components/VideoList1";
import ManagerReview from "../../components/ManagerReview";
import ManagerPrivateRoute from "../../components/ManagerPrivateRoute";
import ForgetPasswordLayout from "../../layout/ForgetPassword";
import UpdatePasswordLayout from "../../layout/UpdatePassword";
import AuthenticationFailedLayout from "../../layout/AuthenticationFaild";
// import VideoList from "../../components/videopage";
// import LoginForm from "../../components/LoginForm";

// const Login = React.lazy(() => import("../../layout/Login"));
// const AddNewAdmin = React.lazy(() => import("../../layout/AddNewAdmin"));
// const HomePage = React.lazy(() => import("../../layout/HomePage"));

const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ReviewerLogion />} />
        <Route path="/list" element={<VideoList />} />
        <Route path="/forget" element={<ForgetPasswordLayout />} />
        <Route
          path="/authfailed/:token"
          element={<AuthenticationFailedLayout />}
        />

        <Route
          path="/reset-password/:token"
          element={<UpdatePasswordLayout />}
        />

        {/* for mamager */}
        <Route element={<ManagerPrivateRoute />}>
          <Route path="/manager" element={<ManagerMain />} />
          <Route path="/videos-list" element={<VideoList1 />} />
          <Route path="/manager-review" element={<ManagerReview />} />
          <Route path="/manager-review-videos" element={<VideoReview />} />
          <Route path="/add-reviewer" element={<AddNewReviewers />} />
        </Route>
        {/* for reviewew */}
        <Route element={<PrivateRoute />}>
          <Route path="/videos" element={<VideoReview />} />
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  );
};
export default Routers;
