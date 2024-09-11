import { useEffect, useState } from "react";
import { Container, Col, Button, Row, Image, Alert } from "react-bootstrap";
import Frame_Arrow from "../../assets/images/Frame_Arrow.svg";
import Check_mark from "../../assets/images/Check_mark.svg";
import close_mark from "../../assets/images/close_mark.svg";
import { isEmpty, isEqual } from "lodash";
import DeclineReasonModal from "../Modal_for_declining";
import { getVideoRequest, updateVideoRequest } from "../../db/action/Getvideos";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import NoImagePlaceholder from "../../assets/images/NoImagePlaceholder.svg";
import { logoutRequest } from "../../db/action/logout";
import NodataFound from "../NodataFound";
import VideoReviewLoading from "../Loading/VideoReviewLoading";
import moment from "moment";
const VideoReview = (props) => {
  const { getVideoReducer } = props;
  // alert(getVideoReducer.video.id);

  const Outh = useSelector((state) => state.loginReducer);

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // Function to handle when video ends
  const handleVideoEnd = () => {
    setIsButtonEnabled(true);
    sessionStorage.setItem("videoEnded", getVideoReducer.video?.id);
  };
  // Check session storage on component mount
  useEffect(() => {
    // + used for convert to number
    isEqual(+sessionStorage.getItem("videoEnded"), +getVideoReducer.video?.id)
      ? setIsButtonEnabled(true)
      : setIsButtonEnabled(false);
  });

  // jwt token is notvalied the logout
  useEffect(() => {
    const { logout } = getVideoReducer;

    if (logout != undefined) {
      props.logoutRequest();
    }
  }, [getVideoReducer]);

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
      });

      setShowModal(false);
    }
    setValidated(true);
    // Add your form submission logic here
  };

  return (
    <>
      <Container fluid>
        <h2
          className="text-center text-xl-start   ms-0 ms-xl-5  font-Poppins text-gray-200 fw-bold"
          style={{
            fontSize: "clamp(1px, 7vw, 35px)",
          }}
        >
          Welcome to our review system
        </h2>
        {getVideoReducer.success && !getVideoReducer.loading ? (
          <>
            <h4 className="text-center text-xl-start ms-0 ms-xl-5 fs-20  font-Poppins text-gray-200 mt-2  fw-semibold">
              You have{" "}
              <span className="fs-25 fw-900">{getVideoReducer.videoCount}</span>{" "}
              videos to review
            </h4>

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
                      isEmpty(getVideoReducer.video.video_preview_url)
                        ? NoImagePlaceholder
                        : getVideoReducer.video.video_preview_url
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
                    playsInline
                    onEnded={handleVideoEnd}
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
                    Uploaded{" "}
                    {moment.unix(getVideoReducer.video?.created_time).fromNow()}
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
                  Uploaded{" "}
                  {moment.unix(getVideoReducer.video?.created_time).fromNow()}
                </h4>

                <Col
                  className="d-flex  align-items-center justify-content-center "
                  xl={12}
                  lg={12}
                  md={12}
                  xxl={12}
                >
                  <Col
                    className="pb-5  pt-5  d-flex  align-items-center justify-content-center justify-content-xl-start justify-content-lg-start"
                    md={9}
                    xs={12}
                  >
                    {getVideoReducer.video.caption === "" ? (
                      <h4 className="font-Poppins">No Caption is Available!</h4>
                    ) : (
                      <h4
                        className="font-Poppins text-break"
                        style={{
                          fontSize: "clamp(1px, 6vw, 25px)",
                        }}
                      >
                        <span className="h2">Caption: </span>
                        {getVideoReducer.video.caption}
                      </h4>
                    )}
                  </Col>

                  <Col className="ms-4 d-none d-xl-block d-lg-block d-md-block ">
                    <div className="position-relative d-flex align-items-center">
                      <div className="position-absolute h-65 w-150 rounded-18 bg-next-btn1 ms-n20"></div>
                      <div className="position-absolute h-65 w-140 rounded-18 bg-next-btn2 ms-n10"></div>
                      <Button
                        className="position-absolute h-65 w-130 rounded-18 bg-next-btn3  fs-25 shadow border-0"
                        onClick={() =>
                          props.getVideoRequest({ role_id: Outh.role_id })
                        }
                        disabled={!getVideoReducer.message}
                      >
                        Next <Image src={Frame_Arrow}></Image>
                      </Button>
                    </div>
                  </Col>
                </Col>
                <Col
                  xl={12}
                  md={12}
                  className={` mt-0 mt-xl-5 mt-lg-5 w-100 d-flex flex-column flex-lg-row flex-md-row flex-xl-row gap-4 align-items-center justify-content-center justify-content-lg-start justify-content-xl-start`}
                >
                  {getVideoReducer.message && (
                    <Col xl={9} md={12} sm={12}>
                      <Alert
                        variant={getVideoReducer.message.variant}
                        className={` w-100 p-3 d-flex flex-column align-items-center justify-content-center`}
                      >
                        <Alert.Heading
                          style={{
                            fontSize: "clamp(1px, 5vw, 23px)",
                          }}
                        >
                          {getVideoReducer.message.heading}
                        </Alert.Heading>
                        <p
                          className={`p-0 text-center mt-1 ${
                            getVideoReducer.message.title.charAt(0) == "D" &&
                            "text-danger"
                          }`}
                          style={{
                            fontSize: "clamp(10px, 5vw, 15px)",
                          }}
                        >
                          {getVideoReducer.message.title}
                        </p>
                      </Alert>
                    </Col>
                  )}
                  <Col
                    xl={3}
                    md={4}
                    lg={5}
                    sm={12}
                    xs={12}
                    className={`d-flex flex-column ${
                      getVideoReducer.message && "d-none"
                    }`}
                  >
                    <Button
                      className="shadow text-wrap w-100 fw-semibold border-bt-border letterSpacing-1 fs-25 text-gray-300 bg-Approved-btn"
                      onClick={() =>
                        props.updateVideoRequest({
                          role_id: Outh.role_id,
                          vidoeInfo: { ...getVideoReducer },
                          videostatus: null,
                        })
                      }
                      disabled={!isButtonEnabled}
                    >
                      Approved
                    </Button>

                    <Button
                      className="shadow mt-3 bg-Approved-btn rounded-circle d-none d-lg-block d-xl-block d-md-block fw-normal letterSpacing-1 h-50 w-51 fs-25 border-bt-border"
                      onClick={() =>
                        props.updateVideoRequest({
                          role_id: Outh.role_id,
                          vidoeInfo: { ...getVideoReducer },
                          videostatus: null,
                        })
                      }
                      disabled={!isButtonEnabled}
                    >
                      <Image src={Check_mark}></Image>
                    </Button>
                  </Col>
                  <Col
                    xl={3}
                    md={4}
                    lg={5}
                    sm={12}
                    xs={12}
                    className={`d-flex flex-column ${
                      getVideoReducer.message && "d-none"
                    }`}
                  >
                    <Button
                      className={`shadow text-wrap w-100 fw-semibold fs-25 border-bt-border bg-Decline-btn letterSpacing-1 text-white`}
                      disabled={!isButtonEnabled}
                      onClick={handleModalShow}
                    >
                      Decline
                    </Button>

                    <Button
                      className={`shadow mt-3 rounded-circle d-none d-lg-block d-xl-block d-md-block h-50 w-51 fw-normal letterSpacing-1 bg-Decline-btn border-bt-border`}
                      onClick={handleModalShow}
                      disabled={!isButtonEnabled}
                    >
                      <Image src={close_mark}></Image>
                    </Button>
                  </Col>

                  <Button
                    className="shadow mt-4 bg-next-btn3 d-block d-md-none d-lg-none d-xl-none w-100 fw-semibold text-white fs-25 letterSpacing-1 border-bt-border"
                    onClick={() =>
                      props.getVideoRequest({ role_id: Outh.role_id })
                    }
                    disabled={!getVideoReducer.message}
                  >
                    Next
                  </Button>
                </Col>
              </Col>
            </Row>
          </>
        ) : (
          <>
            {!getVideoReducer.success &&
              !getVideoReducer.loading &&
              isEmpty(getVideoReducer.video) && <NodataFound />}
            {getVideoReducer.loading && <VideoReviewLoading />}
          </>
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
