import { useEffect, useState } from "react";

import { Container, Col, Button, Row, Image, Alert } from "react-bootstrap";
import Frame_Arrow from "../../assets/images/Frame_Arrow.svg";

import { isEmpty } from "lodash";
import { useLocation } from "react-router-dom";
import DeclineReasonModal from "../Modal_for_declining";
import { getVideoRequest, updateVideoRequest } from "../../db/action/Getvideos";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import FindVideoAge from "../FindVideoAge";
import NoImagePlaceholder from "../../assets/images/NoImagePlaceholder.svg";

import { logoutRequest } from "../../db/action/logout";
import NodataFound from "../NodataFound";
import VideoReviewLoading from "../Loading/VideoReviewLoading";

const VideoReview = (props) => {
  const location = useLocation();
  const selectVideo = location.state?.selectVideo || {};
  const videoType = location.state?.videoType;
  const isManager = location.state?.isManager;

  const Outh = useSelector((state) => state.loginReducer);

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const { getVideoReducer } = props;

  // Function to handle when video ends
  const handleVideoEnd = () => {
    setIsButtonEnabled(true);
    sessionStorage.setItem("videoEnded", getVideoReducer.id || selectVideo.id);
  };

  // Check session storage on component mount
  useEffect(() => {
    const videoEnded = sessionStorage.getItem("videoEnded");

    if (!sessionStorage.getItem("videoEnded")) {
      setIsButtonEnabled(false);
    } else {
      if (
        videoEnded === getVideoReducer.id || !getVideoReducer.id
          ? selectVideo.id
          : ""
      ) {
        setIsButtonEnabled(true);
      } else {
        setIsButtonEnabled(false);
      }
    }
  });

  const { days, hours, minutes } = FindVideoAge(
    formatDate(getVideoReducer.reviewedDate || selectVideo.reviewedDate)
  );
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalShow = () => {
    setShowModal(true);
  };
  const [validated, setValidated] = useState(false);
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form_Data = new FormData(event.target);
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      event.stopPropagation();

      props.updateVideoRequest({
        collection: import.meta.env.VITE_NEEDREVIEW_COLLECTION,
        videoinfo: getVideoReducer.videoName
          ? { ...getVideoReducer }
          : { ...selectVideo },
        isManagerReview:
          Outh.manager_id === import.meta.env.VITE_MANAGER ? true : false,
        // videoinfo: {
        //   ...selectVideo,
        //  ||  ...getVideoReducer },
        reviewerEmail: Outh.email,
        manager_id: Outh.manager_id,

        reviewStatus: form_Data.get("declinereason"),
      });
      // sessionStorage.removeItem("videoEnded");
      setShowModal(false);
    }
    setValidated(true);
    // Add your form submission logic here
  };
  function formatDate(date) {
    const formatDate = new Date(
      date.seconds * 1000 + date.nanoseconds / 1000000
    );
    return formatDate.toLocaleTimeString("en-us", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      timeZoneName: "short",
    });
  }
  return (
    <>
      {/* {!getVideoReducer.success && !getVideoReducer.loading && <NodataFound />} */}

      <Container fluid>
        <h2
          className="text-center text-xl-start   ms-0 ms-xl-5  font-Poppins text-gray-200 fw-bold"
          style={{
            fontSize: "clamp(1px, 7vw, 35px)",
          }}
        >
          Welcome to our review system
        </h2>
        {(getVideoReducer.success && !getVideoReducer.loading) ||
        (selectVideo.id && !getVideoReducer.loading) ? (
          <Row className="d-flex  align-items-center ">
            {/* display video */}
            <Col
              xl={6}
              lg={5}
              md={12}
              className="d-flex flex-column flex-sm-row  align-items-center justify-content-center gap-5 mt-4"
            >
              <Col
                lg={5}
                md={4}
                xl={3}
                sm={4}
                xs={12}
                className="d-flex flex-column   align-items-center justify-content-center gap-2"
              >
                <Image
                  width={"100%"}
                  height={`300px`}
                  className=" rounded-30  shadow object-fit-fill border-video-border "
                  alt="Example image"
                  src={
                    isEmpty(getVideoReducer.videoPreviewURL)
                      ? NoImagePlaceholder
                      : getVideoReducer.videoPreviewURL ||
                        selectVideo.videoPreviewURL
                  }
                ></Image>

                <h4 className="fw-semibold  font-Poppins fs-15">Thumbnail</h4>
              </Col>
              <Col
                lg={5}
                xl={5}
                sm={7}
                md={7}
                xs={12}
                className="d-flex flex-column justify-content-center align-items-center me-0  "
              >
                <video
                  width="100%"
                  height="450px"
                  controls
                  className=" rounded-30 shadow object-fit-fill mt-0 mt-xl-n3 border-video-border"
                  autoPlay
                  onEnded={handleVideoEnd}
                  src={getVideoReducer.videoName || selectVideo.videoName}
                >
                  {/* only used for video is localy avaliable */}
                  <source src={getVideoReducer.videoName} type="video/mp4" />
                </video>

                <h4
                  className="font-Poppins  fw-semibold  mt-4 mt-xl-0 mt-lg-0  d-xl-none d-lg-none"
                  style={{
                    fontSize: "clamp(1px, 6vw, 23px)",
                  }}
                >
                  Uploaded {days > 1 && `${days || 0} days`}{" "}
                  {hours > 1 && days < 1 && `${hours || 0} hours`}
                  {hours < 1 && days < 1 && `${minutes || 0} minutes`} ago
                </h4>
              </Col>
            </Col>
            {/* other content */}
            <Col
              xl={6}
              lg={6}
              md={12}
              className="d-flex flex-column   mb-5 mb-xl-0 mb-lg-0"
            >
              <h4 className="font-Poppins w-100 text-center text-lg-start  fw-semibold  d-none d-lg-block ">
                {videoType == 0 ? "Rejected " : "Approved "}
                {days > 1 && `${days || 0} days`}{" "}
                {hours > 1 && days < 1 && `${hours || 0} hours`}
                {hours < 1 && days < 1 && `${minutes || 0} minutes`} ago
              </h4>

              <Col
                className="d-flex mt-5 align-items-center justify-content-center "
                xl={12}
                lg={12}
                md={12}
                xxl={12}
              >
                <Col
                  className="  d-flex flex-column   "
                  xl={9}
                  lg={9}
                  md={9}
                  sm={12}
                  xs={12}
                >
                  {/* no change */}
                  {getVideoReducer.caption === "" ? (
                    <h4 className="font-Poppins">No Caption is Available!</h4>
                  ) : (
                    <h4
                      className="font-Poppins text-break"
                      style={{
                        fontSize: "clamp(1px, 6vw, 20px)",
                      }}
                    >
                      <span className="fw-bold">Caption : </span>
                      {getVideoReducer.caption || selectVideo.caption}
                    </h4>
                  )}

                  <h4
                    className="font-Poppins text-break mt-3 "
                    style={{
                      fontSize: "clamp(1px, 4vw, 15px)",
                      fontWeight: "900",
                    }}
                  >
                    Reviewed by :
                    <a
                      href={`mailto:${
                        getVideoReducer.reviewedBy || selectVideo.reviewedBy
                      }`}
                      target="_blank"
                      className="text-decoration-none text-black ms-1"
                      style={{ fontWeight: "600" }}
                    >
                      {getVideoReducer.reviewedBy || selectVideo.reviewedBy}
                    </a>
                  </h4>
                </Col>

                <Col className="ms-4 d-none d-xl-block d-lg-block d-md-block ">
                  <div className="position-relative d-flex align-items-center">
                    <div className="position-absolute h-65 w-150 rounded-18 bg-next-btn1 ms-n20"></div>
                    <div className="position-absolute h-65 w-140 rounded-18 bg-next-btn2 ms-n10"></div>
                    <Button
                      className="position-absolute h-65 w-130 rounded-18 bg-next-btn3  fs-25 shadow border-0"
                      onClick={() =>
                        props.getVideoRequest({
                          collection:
                            videoType == 0
                              ? import.meta.env.VITE_REJECT_VIDEO_COLLECTION
                              : import.meta.env.VITE_NEEDREVIEW_COLLECTION,
                          manager_id: Outh.manager_id,
                          isManager: isManager,
                        })
                      }
                    >
                      Next <Image src={Frame_Arrow}></Image>
                    </Button>
                  </div>
                </Col>
              </Col>

              <Col xl={7} lg={7} md={12} sm={12}>
                {videoType === 0 && (
                  <Alert
                    className="w-100 mt-5 d-flex flex-column align-items-center justify-content-center"
                    variant={
                      getVideoReducer.videostatus ? `success ` : "danger"
                    }
                  >
                    <Alert.Heading
                      style={{
                        fontSize: "clamp(1px, 5vw, 23px)",
                      }}
                    >
                      {getVideoReducer.videostatus
                        ? "Video Reviewed Successfully"
                        : "Decline Reason"}
                    </Alert.Heading>
                    {getVideoReducer.videostatus
                      ? "Video has been Approved."
                      : getVideoReducer.ReviewStatus ||
                        selectVideo.ReviewStatus}
                  </Alert>
                )}
                {videoType === 1 && (
                  <Alert
                    className="w-100 mt-5 d-flex flex-column align-items-center justify-content-center"
                    variant={
                      getVideoReducer.videostatus === true ||
                      (selectVideo.videostatus === true &&
                        !getVideoReducer.videostatus)
                        ? `success `
                        : "danger"
                    }
                  >
                    <Alert.Heading
                      style={{
                        fontSize: "clamp(1px, 5vw, 23px)",
                      }}
                    >
                      {getVideoReducer.videostatus === true ||
                      (selectVideo.videostatus === true &&
                        !getVideoReducer.videostatus)
                        ? "Video is Reviewed"
                        : "Decline Reason"}
                    </Alert.Heading>
                    {getVideoReducer.videostatus === true
                      ? "Video has been Approved."
                      : getVideoReducer.ReviewStatus ||
                        selectVideo.ReviewStatus}
                  </Alert>
                )}
              </Col>

              <Col
                xl={10}
                md={12}
                className={` mt-0 mt-xl-5 mt-lg-5  d-flex   align-items-center justify-content-start `}
              >
                <Col
                  xl={4}
                  md={12}
                  lg={5}
                  sm={12}
                  xs={12}
                  className={`${videoType === 1 && "d-none"}`}
                >
                  {/* //0-> Decline videos */}
                  <Button
                    className="shadow text-wrap w-100 fw-semibold border-bt-border letterSpacing-1 fs-25 text-gray-300 bg-Approved-btn"
                    onClick={
                      () =>
                        props.updateVideoRequest({
                          collection: import.meta.env
                            .VITE_NEEDREVIEW_COLLECTION,
                          videoinfo: getVideoReducer.videoName
                            ? { ...getVideoReducer }
                            : { ...selectVideo },

                          reviewerEmail: Outh.email,
                          manager_id: Outh.manager_id,
                          reviewStatus: true,
                          isManagerReview:
                            Outh.manager_id === import.meta.env.VITE_MANAGER
                              ? true
                              : false,
                        })
                      // sessionStorage.removeItem("videoEnded")
                    }
                    disabled={
                      getVideoReducer.videostatus ||
                      (!isButtonEnabled && !getVideoReducer.videostatus)
                    }
                  >
                    Approved
                  </Button>
                </Col>
                <Col
                  xl={4}
                  md={12}
                  lg={5}
                  sm={12}
                  xs={12}
                  className={`${videoType === 0 && "d-none"}`}
                >
                  {/* //0-> Decline videos */}

                  <Button
                    className="shadow text-wrap w-100 fw-semibold fs-25 border-bt-border bg-Decline-btn letterSpacing-1 text-white"
                    onClick={handleModalShow}
                    disabled={!isButtonEnabled || getVideoReducer.ReviewStatus}
                  >
                    Decline
                  </Button>
                </Col>
              </Col>

              <Button
                className="shadow mt-4 bg-next-btn3 d-block d-md-none d-lg-none d-xl-none w-100 fw-semibold text-white fs-25 letterSpacing-1 border-bt-border"
                onClick={() =>
                  props.getVideoRequest({
                    collection:
                      videoType == 0
                        ? import.meta.env.VITE_REJECT_VIDEO_COLLECTION
                        : import.meta.env.VITE_NEEDREVIEW_COLLECTION,
                    manager_id: Outh.manager_id,
                  })
                }
                // disabled={getVideoReducer.reviewedBy ? false : true}
              >
                Next
              </Button>
            </Col>
          </Row>
        ) : (
          <VideoReviewLoading />
        )}
      </Container>

      {/* Reason for declining Modal */}
      <DeclineReasonModal
        show={showModal}
        onHide={handleModalClose}
        validated={validated}
        // Pass your validation state here
        handleSubmit={handleFormSubmit}
      />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    getVideoReducer: state.getVideoReducer || {},
    logoutReducer: state.logoutReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updateVideoRequest,
      getVideoRequest,
      logoutRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoReview);
