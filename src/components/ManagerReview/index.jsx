import { useState } from "react";

import { Container, Col, Button, Row, Image, Alert } from "react-bootstrap";
import Frame_Arrow from "../../assets/images/Frame_Arrow.svg";

import { isEmpty } from "lodash";
import DeclineReasonModal from "../Modal_for_declining";
import { getVideoRequest, updateVideoRequest } from "../../db/action/Getvideos";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import NoImagePlaceholder from "../../assets/images/NoImagePlaceholder.svg";
import { logoutRequest } from "../../db/action/logout";
import VideoReviewLoading from "../Loading/VideoReviewLoading";
import NodataFound from "../NodataFound";
import moment from "moment";

const VideoReview = (props) => {
  const Outh = useSelector((state) => state.loginReducer);
  const { getVideoReducer } = props;
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
        role_id: Outh.role_id,
        vidoeInfo: { ...getVideoReducer },
        videostatus: form_Data.get("declinereason"),
        reUpdate: true,
      });
      // sessionStorage.removeItem("videoEnded");
      setShowModal(false);
    }
    setValidated(true);
    // Add your form submission logic here
  };

  return (
    <>
      <Container fluid>
        {getVideoReducer.success && !getVideoReducer.loading ? (
          getVideoReducer.success &&
          !getVideoReducer.loading &&
          isEmpty(getVideoReducer.video) ? (
            <NodataFound />
          ) : (
            <>
              <h2
                className="text-center text-xl-start  ms-0 ms-xl-5  font-Poppins text-gray-200 fw-bold"
                style={{
                  fontSize: "clamp(1px, 7vw, 35px)",
                }}
              >
                {getVideoReducer.video.role_type === "RR"
                  ? `Reviewer `
                  : `Manager `}
                {getVideoReducer.video.video_status !== 1
                  ? `Rejected `
                  : `accepted `}
                video
              </h2>
              <Row className="d-flex  align-items-center ">
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
                        isEmpty(getVideoReducer.video.video_preview_url)
                          ? NoImagePlaceholder
                          : getVideoReducer.video.videoPreviewURL
                      }
                    ></Image>

                    <h4 className="fw-semibold  font-Poppins fs-15">
                      Thumbnail
                    </h4>
                  </Col>
                  <Col
                    lg={5}
                    sm={7}
                    xs={12}
                    className="d-flex flex-column justify-content-center align-items-center me-0  "
                  >
                    <video
                      width="100%"
                      height="450px"
                      controls
                      className=" rounded-30 shadow object-fit-fill mt-0 mt-xl-n3 border-video-border"
                      autoPlay
                      src={getVideoReducer.video.video_name}
                    >
                      {/* only used for video is localy avaliable */}
                      <source
                        src={getVideoReducer.video.video_name}
                        type="video/mp4"
                      />
                    </video>

                    <h4
                      className="font-Poppins  fw-semibold  mt-4 mt-xl-0 mt-lg-0  d-xl-none d-lg-none"
                      style={{
                        fontSize: "clamp(1px, 6vw, 23px)",
                      }}
                    >
                      {getVideoReducer.video.video_status !== 1
                        ? "Rejected "
                        : "Approved "}
                      {moment
                        .unix(getVideoReducer.video?.video_status_update)
                        .fromNow()}
                    </h4>
                  </Col>
                </Col>
                {/* other content */}
                <Col
                  lg={6}
                  md={12}
                  className="d-flex flex-column  mb-5  mb-lg-0"
                >
                  <h4 className="font-Poppins w-100 text-center text-lg-start  fw-semibold  d-none d-lg-block ">
                    {getVideoReducer.video.video_status !== 1
                      ? "Rejected "
                      : "Approved "}
                    {moment
                      .unix(getVideoReducer.video?.video_status_update)
                      .fromNow()}
                  </h4>

                  <Col className="d-flex mt-5 align-items-center justify-content-center ">
                    <Col className="  d-flex flex-column" md={9} xs={12}>
                      {/* no change */}
                      {isEmpty(getVideoReducer.video.caption) ? (
                        <h4 className="font-Poppins">
                          No Caption is Available!
                        </h4>
                      ) : (
                        <h4
                          className="font-Poppins text-break"
                          style={{
                            fontSize: "clamp(1px, 6vw, 20px)",
                          }}
                        >
                          <span className="fw-bold">Caption : </span>
                          {getVideoReducer.video.caption}
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
                          href={`mailto:${getVideoReducer.video.email}`}
                          target="_blank"
                          className="text-decoration-none text-black ms-1"
                          style={{ fontWeight: "600" }}
                        >
                          {getVideoReducer.video.email}
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
                              idArray: getVideoReducer.idArray || [],
                              videoStatus: getVideoReducer.video.video_status,
                              reviewer_role: getVideoReducer.video.role_type,
                            })
                          }
                        >
                          Next <Image src={Frame_Arrow}></Image>
                        </Button>
                      </div>
                    </Col>
                  </Col>

                  <Col lg={7} sm={12}>
                    <Alert
                      className="w-100 mt-5 d-flex flex-column align-items-center justify-content-center text-center"
                      variant={getVideoReducer.AlertMessage.variant}
                    >
                      <Alert.Heading
                        style={{
                          fontSize: "clamp(1px, 5vw, 20px)",
                        }}
                      >
                        {getVideoReducer.AlertMessage.heading}
                      </Alert.Heading>
                      <p className={`m-0`}>
                        {getVideoReducer.AlertMessage.title}
                      </p>
                      {getVideoReducer.AlertMessage.email && (
                        <p className={`m-0`}>
                          {getVideoReducer.AlertMessage.email}
                        </p>
                      )}
                    </Alert>
                  </Col>

                  <Col
                    xl={10}
                    md={12}
                    className={` mt-0 mt-lg-3  d-flex   align-items-center justify-content-start `}
                  >
                    {getVideoReducer.AlertMessage.variant !== "success" ? (
                      <Col xl={4} lg={5} xs={12}>
                        <Button
                          className="shadow text-wrap w-100 fw-semibold border-bt-border letterSpacing-1 fs-25 text-gray-300 bg-Approved-btn"
                          onClick={() =>
                            props.updateVideoRequest({
                              role_id: Outh.role_id,
                              vidoeInfo: { ...getVideoReducer },
                              videostatus: null,
                              reUpdate: true,
                            })
                          }
                          // disabled={

                          // }
                        >
                          Approved
                        </Button>
                      </Col>
                    ) : (
                      <Col xl={4} lg={5} xs={12}>
                        <Button
                          className="shadow text-wrap w-100 fw-semibold fs-25 border-bt-border bg-Decline-btn letterSpacing-1 text-white"
                          onClick={handleModalShow}
                          // disabled={!isButtonEnabled }
                        >
                          Decline
                        </Button>
                      </Col>
                    )}
                  </Col>

                  <Button
                    className="shadow mt-4 bg-next-btn3 d-block d-md-none d-lg-none d-xl-none w-100 fw-semibold text-white fs-25 letterSpacing-1 border-bt-border"
                    onClick={() =>
                      props.getVideoRequest({
                        idArray: getVideoReducer.idArray || [],
                        videoStatus: getVideoReducer.video.video_status,
                        reviewer_role: getVideoReducer.video.reviewer_role,
                      })
                    }
                    // disabled={getVideoReducer.reviewedBy ? false : true}
                  >
                    Next
                  </Button>
                </Col>
              </Row>
            </>
          )
        ) : (
          <>{getVideoReducer.loading && <VideoReviewLoading />}</>
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
