import { useEffect, useState } from "react";

import {
  Container,
  Col,
  Button,
  Row,
  Image,
  Alert,
  Placeholder,
} from "react-bootstrap";
import Frame_Arrow from "../../assets/images/Frame_Arrow.svg";
import Check_mark from "../../assets/images/Check_mark.svg";
import close_mark from "../../assets/images/close_mark.svg";
import { isUndefined, isEmpty, isMatch } from "lodash";
import DeclineReasonModal from "../Modal_for_declining";
import { getVideoRequest, updateVideoRequest } from "../../db/action/Getvideos";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import FindVideoAge from "../FindVideoAge/intex";
import NoImagePlaceholder from "../../assets/images/NoImagePlaceholder.svg";
// import { isUndefined } from "lodash";
import { logoutRequest } from "../../db/action/logout";
import { useNavigate } from "react-router-dom";

const VideoReview = (props) => {
  const Outh = useSelector((state) => state.loginReducer);
  const navigate = useNavigate();
  // const videodata = useSelector((state) => state.getVideoReducer);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const { getVideoReducer } = props;

  // Function to handle when video ends
  const handleVideoEnd = () => {
    setIsButtonEnabled(true);
    sessionStorage.setItem("videoEnded", getVideoReducer.id);
  };

  // Check session storage on component mount
  useEffect(() => {
    const videoEnded = sessionStorage.getItem("videoEnded");
    if (videoEnded === getVideoReducer.id) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  });
  // jwt token is notvalied the logout
  useEffect(() => {
    const { logout } = getVideoReducer;

    if (logout != undefined) {
      props.logoutRequest();
    }
  }, [getVideoReducer]);
  const { days, hours, minutes } = FindVideoAge(
    getVideoReducer.createdDate ? getVideoReducer.createdDate : false
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
      getVideoReducer.reviewedBy
        ? console.log("del alearady")
        : props.updateVideoRequest({
            videoinfo: { ...getVideoReducer },
            reviewerEmail: Outh.email,
            reviewStatus: form_Data.get("declinereason"),
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

        {getVideoReducer.loading ? (
          <Placeholder
            as="p"
            animation="glow"
            className="w-100 d-flex flex-column   align-items-center align-items-xl-start "
          >
            <Placeholder
              xs={12}
              style={{ borderRadius: "10px", height: "20px" }}
              className="w-25 text-center ms-0 ms-xl-5"
            />
          </Placeholder>
        ) : (
          <h4 className="text-center text-xl-start ms-0 ms-xl-5 fs-20  font-Poppins text-gray-200 mt-2  fw-semibold">
            You have{" "}
            <span className="fs-25 fw-900">{getVideoReducer.TotalVidos}</span>{" "}
            videos to review
          </h4>
        )}
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
              {getVideoReducer.loading ? (
                <Placeholder as="p" animation="glow" className="w-100 d-flex ">
                  <Placeholder
                    xs={12}
                    style={{ height: "300px" }}
                    className="w-100  rounded-30 text-center  shadow border-video-border"
                  />
                </Placeholder>
              ) : (
                <Image
                  width={"100%"}
                  style={{ height: "300px" }}
                  className=" rounded-30  shadow object-fit-fill border-video-border "
                  alt="Example image"
                  src={
                    isEmpty(getVideoReducer.videoPreviewURL)
                      ? NoImagePlaceholder
                      : getVideoReducer.videoPreviewURL
                  }
                ></Image>
              )}
              {getVideoReducer.loading ? (
                <Placeholder
                  as="p"
                  animation="glow"
                  className="w-100 d-flex align-items-center justify-content-center"
                >
                  <Placeholder
                    xs={12}
                    style={{ height: "10px", borderRadius: "10px" }}
                    className="w-75"
                  />
                </Placeholder>
              ) : (
                <h4 className="fw-semibold  font-Poppins fs-15">Thumbnail</h4>
              )}
            </Col>
            <Col
              lg={5}
              xl={5}
              sm={7}
              md={7}
              xs={12}
              className="d-flex flex-column justify-content-center align-items-center me-0  "
            >
              {getVideoReducer.loading ? (
                <Placeholder
                  as="p"
                  animation="glow"
                  className="w-100 d-flex mt-10 "
                >
                  <Placeholder
                    xs={12}
                    style={{ height: "450px" }}
                    className="w-100  rounded-30 text-center  shadow border-video-border"
                  />
                </Placeholder>
              ) : (
                <video
                  width="100%"
                  height="450px"
                  controls
                  className=" rounded-30 shadow object-fit-fill mt-0 mt-xl-n3 border-video-border"
                  autoPlay
                  onEnded={handleVideoEnd}
                  src={getVideoReducer.videoName}
                >
                  {/* only used for video is localy avaliable */}
                  <source src={getVideoReducer.videoName} type="video/mp4" />
                </video>
              )}
              {getVideoReducer.loading ? (
                <Placeholder
                  as="p"
                  animation="glow"
                  className="w-100 d-flex align-items-center justify-content-center mt-4 mt-xl-0 mt-lg-0 d-xl-none d-lg-none"
                >
                  <Placeholder
                    xs={12}
                    style={{ height: "20px", borderRadius: "10px" }}
                    className="w-75"
                  />
                </Placeholder>
              ) : (
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
              )}
            </Col>
          </Col>
          {/* other content */}
          <Col
            xl={6}
            lg={6}
            md={12}
            className="d-flex flex-column   mb-5 mb-xl-0 mb-lg-0"
          >
            {getVideoReducer.loading ? (
              <Placeholder
                as="p"
                animation="glow"
                className="w-100 d-flex mt-10 mt-4 mt-xl-0 mt-lg-0  d-none d-lg-block "
              >
                <Placeholder
                  xs={12}
                  style={{ height: "20px", borderRadius: "10px" }}
                  className="w-42"
                />
              </Placeholder>
            ) : (
              <h4 className="font-Poppins w-100 text-center text-lg-start  fw-semibold  d-none d-lg-block ">
                Uploaded {days > 1 && `${days || 0} days`}{" "}
                {hours > 1 && days < 1 && `${hours || 0} hours`}
                {hours < 1 && days < 1 && `${minutes || 0} minutes`} ago
              </h4>
            )}
            <Col
              className="d-flex  align-items-center justify-content-center "
              xl={12}
              lg={12}
              md={12}
              xxl={12}
            >
              <Col
                className="pb-5  pt-5  d-flex  align-items-center justify-content-center justify-content-xl-start justify-content-lg-start"
                xl={9}
                lg={9}
                md={9}
                sm={12}
                xs={12}
                style={{ overflow: "" }}
              >
                {getVideoReducer.loading ? (
                  <Placeholder as="p" animation="glow" className="w-100">
                    <Placeholder
                      style={{ height: "20px", borderRadius: "10px" }}
                      className="w-75"
                    />
                    <Placeholder
                      style={{ height: "20px", borderRadius: "10px" }}
                      className="w-50 mt-3"
                    />
                  </Placeholder>
                ) : getVideoReducer.caption === "" ? (
                  <h4 className="font-Poppins">No Caption is Available!</h4>
                ) : (
                  <h4
                    className="font-Poppins text-break"
                    style={{
                      fontSize: "clamp(1px, 6vw, 25px)",
                    }}
                  >
                    <span className="h2">Caption: </span>
                    {getVideoReducer.caption}
                  </h4>
                )}
              </Col>

              <Col className="ms-4 d-none d-xl-block d-lg-block d-md-block ">
                {getVideoReducer.loading ? (
                  <Placeholder as="p" animation="glow" className=" ">
                    <Placeholder
                      xs={12}
                      style={{
                        height: "65px",
                        width: "150px",
                        borderRadius: "18px",
                      }}
                    />
                  </Placeholder>
                ) : (
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",

                        left: "-20px",
                        height: "65px",
                        width: "150px",
                        borderRadius: "18px",
                        background: "#1DA5DF33",
                      }}
                    ></div>
                    <div
                      style={{
                        position: "absolute",

                        left: "-10px",
                        height: "65px",
                        width: "140px",
                        borderRadius: "18px",
                        background: "#1DA5DF29",
                      }}
                    ></div>
                    <Button
                      style={{
                        position: "absolute",

                        height: "65px",
                        width: "130px",
                        borderRadius: "18px",
                        background: "#1DA5DF",
                        border: "none",
                        fontSize: "25px",
                      }}
                      className="next-button shadow"
                      onClick={() => props.getVideoRequest()}
                      disabled={
                        getVideoReducer.reviewedBy ||
                        (getVideoReducer.loading && !getVideoReducer.success)
                          ? false
                          : true
                      }
                    >
                      Next <Image src={Frame_Arrow}></Image>
                    </Button>
                  </div>
                )}
              </Col>
            </Col>
            {/* Approved and Decline buttons */}
            {/* display error */}
            {/* <Alert className="w-75" variant={"warning"}>
              This is a alert—check it out!
            </Alert> */}
            <Col
              xl={12}
              md={12}
              className={` mt-0 mt-xl-5 mt-lg-5 w-100 d-flex flex-column flex-lg-row flex-md-row flex-xl-row gap-4 align-items-center justify-content-center justify-content-lg-start justify-content-xl-start`}
            >
              {getVideoReducer.reviewedBy && (
                <Col xl={9} md={12} sm={12}>
                  <Alert
                    variant={"success"}
                    className={` w-100 p-3 d-flex flex-column align-items-center justify-content-center`}
                  >
                    <Alert.Heading
                      style={{
                        fontSize: "clamp(1px, 5vw, 23px)",
                      }}
                    >
                      {" "}
                      Video Reviewed Successfully
                    </Alert.Heading>
                    <p
                      className="p-0 text-center mt-1"
                      style={{
                        fontSize: "clamp(10px, 5vw, 15px)",
                      }}
                    >
                      {getVideoReducer.DeclineReason != undefined
                        ? `Decline : ${getVideoReducer.ReviewStatus}`
                        : "Video has been Approved."}
                    </p>
                  </Alert>
                </Col>
              )}

              {getVideoReducer.alreadyUpdate && (
                <Col xl={9} md={12} sm={12}>
                  <Alert
                    variant={"warning"}
                    className={` w-100 p-3 d-flex flex-column align-items-center justify-content-center`}
                  >
                    <Alert.Heading
                      style={{
                        fontSize: "clamp(1px, 5vw, 23px)",
                      }}
                    >
                      {getVideoReducer.message}
                    </Alert.Heading>
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
                  getVideoReducer.reviewedBy && "d-none"
                }`}
              >
                {getVideoReducer.loading ? (
                  <Placeholder as="p" animation="glow" className="w-100 ">
                    <Placeholder
                      xs={12}
                      className="shadow "
                      style={{
                        width: "100%",
                        height: "50px",
                        borderRadius: "5px",
                        border: "2px solid #909090",
                      }}
                    />
                  </Placeholder>
                ) : (
                  <Button
                    className="shadow text-wrap"
                    style={{
                      backgroundColor: "#42FF00",
                      width: "100%",
                      fontWeight: "500",
                      color: "#3F3F3F",

                      fontSize: "25px",
                      letterSpacing: "1px",
                      border: "2px solid #909090",
                    }}
                    onClick={() =>
                      getVideoReducer.reviewedBy
                        ? console.log("alearsdy")
                        : props.updateVideoRequest({
                            videoinfo: { ...getVideoReducer },
                            reviewerEmail: Outh.email,
                            reviewStatus: true,
                          })
                    }
                    disabled={!isButtonEnabled}
                  >
                    Approved
                  </Button>
                )}
                {getVideoReducer.loading ? (
                  <Placeholder as="p" animation="glow" className="w-100  ">
                    <Placeholder
                      xs={12}
                      className={
                        "shadow mt-3 rounded-circle d-none d-lg-block d-xl-block d-md-block"
                      }
                      style={{
                        width: "50px",
                        height: "50px",

                        border: "2px solid #909090",
                      }}
                    />
                  </Placeholder>
                ) : (
                  <Button
                    className="shadow mt-3 rounded-circle d-none d-lg-block d-xl-block d-md-block"
                    style={{
                      backgroundColor: "#42FF00",
                      width: "50px",
                      height: "50px",
                      fontWeight: "400",
                      color: "#3F3F3F",
                      fontSize: "25px",
                      letterSpacing: "1px",
                      border: "2px solid #909090",
                      padding: "0",
                    }}
                    onClick={() =>
                      props.updateVideoRequest({
                        videoinfo: { ...getVideoReducer },
                        reviewerEmail: Outh.email,
                        reviewStatus: true,
                      })
                    }
                    disabled={!isButtonEnabled}
                    // disabled={videoEnd == getVideoReducer.id ? false : true}
                  >
                    <Image src={Check_mark}></Image>
                  </Button>
                )}
              </Col>
              <Col
                xl={3}
                md={4}
                lg={5}
                sm={12}
                xs={12}
                className={`d-flex flex-column ${
                  getVideoReducer.reviewedBy && "d-none"
                }`}
              >
                {getVideoReducer.loading ? (
                  <Placeholder as="p" animation="glow" className="w-100  ">
                    <Placeholder
                      xs={12}
                      className="shadow "
                      style={{
                        borderRadius: "5px",
                        width: "100%",
                        height: "50px",
                        border: "2px solid #909090",
                      }}
                    />
                  </Placeholder>
                ) : (
                  <Button
                    className={`shadow text-wrap`}
                    style={{
                      backgroundColor: "#FF5858",

                      width: "100%",
                      fontWeight: "500",
                      color: "white",
                      fontSize: "25px",
                      letterSpacing: "1px",
                      border: "2px solid #909090",
                    }}
                    disabled={!isButtonEnabled}
                    onClick={handleModalShow}
                  >
                    Decline
                  </Button>
                )}
                {getVideoReducer.loading ? (
                  <Placeholder as="p" animation="glow" className="w-100  ">
                    <Placeholder
                      xs={12}
                      className={`shadow mt-3 rounded-circle d-none d-lg-block d-xl-block d-md-block `}
                      style={{
                        width: "50px",
                        height: "50px",

                        border: "2px solid #909090",
                      }}
                    />
                  </Placeholder>
                ) : (
                  <Button
                    className={`shadow mt-3 rounded-circle d-none d-lg-block d-xl-block d-md-block `}
                    style={{
                      backgroundColor: "#FF5858",
                      width: "50px",
                      height: "50px",
                      fontWeight: "400",

                      color: "#3F3F3F",

                      letterSpacing: "1px",
                      border: "2px solid #909090",
                      padding: "0",
                    }}
                    onClick={handleModalShow}
                    disabled={!isButtonEnabled}
                  >
                    <Image src={close_mark}></Image>
                  </Button>
                )}
              </Col>
              {getVideoReducer.loading ? (
                <Placeholder
                  as="p"
                  animation="glow"
                  className="w-100 shadow mt-4 d-block d-md-none d-lg-none d-xl-none"
                >
                  <Placeholder
                    xs={12}
                    className="shadow "
                    style={{
                      width: "100%",
                      height: "50px",
                      borderRadius: "5px",
                      border: "2px solid #909090",
                    }}
                  />
                </Placeholder>
              ) : (
                <Button
                  className="shadow mt-4 d-block d-md-none d-lg-none d-xl-none"
                  style={{
                    backgroundColor: "#1DA5DF",

                    width: "100%",
                    fontWeight: "500",
                    color: "white",
                    fontSize: "25px",
                    letterSpacing: "1px",
                    border: "2px solid #909090",
                  }}
                  onClick={() => props.getVideoRequest()}
                  disabled={
                    getVideoReducer.reviewedBy ||
                    (getVideoReducer.loading && !getVideoReducer.success)
                      ? false
                      : true
                  }
                  // disabled={getVideoReducer.reviewedBy ? false : true}
                >
                  Next
                </Button>
              )}
            </Col>
          </Col>
        </Row>
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
