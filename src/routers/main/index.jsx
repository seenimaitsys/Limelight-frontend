import { Route, Routes, Navigate } from "react-router-dom";
import ReviewerLogion from "../../layout/ReviewerLogin";
import VideoReview from "../../layout/VideoReview";
import AddNewReviewers from "../../layout/AddNewReviewers";
import PrivateRoute from "../../components/PrivateRoute";
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
        <Route element={<PrivateRoute />}>
          <Route path="/videos" element={<VideoReview />} />
          <Route path="/add-reviewer" element={<AddNewReviewers />} />
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  );
};
export default Routers;
