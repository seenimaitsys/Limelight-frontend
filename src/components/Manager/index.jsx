import { Container, Col, Row, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import { getVideoLstRequest } from "../../db/action/GetVideosList";
import { useState, useEffect } from "react";
import { getVideoRequest } from "../../db/action/Getvideos";
import ReviewersIcon from "../../assets/images/ReviewersIcon.svg";
import { getReviewerStatusRequest } from "../../db/action/GetReviewersStatus";
import ManagerHomeLoading from "../Loading/ManagerHomeLoading";

const ManagerMain = (props) => {
  const { getReviewersStatusReducer } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    props.getReviewerStatusRequest();
  }, []);

  const navigate = useNavigate();
  const Outh = useSelector((state) => state.loginReducer);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const convertTimestampToElapsedTime = (timestamp) => {
    const now = new Date();
    const lastSeen = new Date(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
    );
    const diff = now - lastSeen;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes };
  };
  return getReviewersStatusReducer.loading ? (
    <ManagerHomeLoading />
  ) : (
    <Container fluid className="d-flex overflow-hidden">
      <Col xl={9} md={12} sm={12} xs={12}>
        <h2
          className="text-center text-xl-start ms-0 ms-xl-5 font-Poppins text-gray-200 fw-bold"
          style={{ fontSize: "clamp(1px, 7vw, 35px)" }}
        >
          Welcome {Outh.email.split("@")[0]} ,
        </h2>

        <h4 className="text-center text-xl-start ms-0 ms-xl-5 fs-20 font-Poppins text-gray-200 mt-2 fw-semibold">
          Manage lime videos
        </h4>

        <Row className="d-flex mt-xl-8 mt-md-4" xl={12}>
          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title style={{ fontWeight: "700" }}>
                Reviewers Status
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="overflow-y-scroll">
              {!getReviewersStatusReducer.loading &&
                getReviewersStatusReducer.list
                  ?.sort((a, b) => {
                    // Convert status to boolean for sorting
                    return (
                      (b.status === true ? 1 : 0) - (a.status === true ? 1 : 0)
                    );
                  })
                  .filter((items) => items.isManager === false)
                  .map((value, index) => {
                    let elapsedTime = { days: 0, hours: 0, minutes: 0 };
                    if (value.status !== true && value.status.seconds) {
                      elapsedTime = convertTimestampToElapsedTime(value.status);
                    }

                    return (
                      <div
                        className="d-flex gap-2 align-items-center"
                        key={index}
                      >
                        <p
                          className="font-Poppins p-0 text-truncate"
                          style={{
                            fontSize: "15px",
                            fontWeight: "500",
                            width: "140px",
                          }}
                        >
                          {value.email.split("@")[0]}
                        </p>
                        <p
                          className="font-Poppins fw-bold p-0"
                          style={{ fontSize: "15px" }}
                        >
                          -
                        </p>
                        <p
                          className="font-Poppins text-truncate"
                          style={{
                            fontSize: "12px",
                            maxWidth: "155px",
                            fontWeight: "300",
                          }}
                        >
                          {value.status === true && (
                            <div className="d-flex align-items-center gap-2 shadow ">
                              <div className="d-flex align-items-center">
                                Active
                              </div>
                              <div
                                style={{
                                  width: "10px",
                                  height: "10px",
                                  backgroundColor: "rgba(66, 255, 0, 1)",
                                  borderRadius: "50px",
                                }}
                              ></div>
                            </div>
                          )}
                          {value.status !== true &&
                            `Last Seen ${
                              elapsedTime.days > 1
                                ? `${elapsedTime.days} days`
                                : ""
                            } ${
                              elapsedTime.hours > 1 && elapsedTime.days < 1
                                ? `${elapsedTime.hours} hours`
                                : ""
                            } ${
                              elapsedTime.hours < 1 &&
                              elapsedTime.days < 1 &&
                              elapsedTime.minutes > 1
                                ? `${elapsedTime.minutes} minutes`
                                : ""
                            }${
                              elapsedTime.hours < 1 &&
                              elapsedTime.days < 1 &&
                              elapsedTime.minutes < 1
                                ? `few seconds`
                                : ""
                            } ago`}
                        </p>
                      </div>
                    );
                  })}
            </Offcanvas.Body>
          </Offcanvas>
          <Col className="d-flex align-items-center justify-content-center p-3">
            <div
              className="shadow gap-5 cursor-pointer"
              style={{
                width: "247px",
                height: "179px",
                backgroundColor: "#743C3C99",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() =>
                navigate("/videos-list", {
                  state: {
                    collection: import.meta.env.VITE_REJECT_VIDEO_COLLECTION,
                    message: "Reviewer Rejected Videos",
                  },
                })
              }
            >
              <h4>{getReviewersStatusReducer.RejectVideosLength}</h4>
              <h4>Rejected videos</h4>
            </div>
          </Col>
          <Col className="d-flex align-items-center justify-content-center p-3">
            <div
              className="shadow gap-5 cursor-pointer"
              style={{
                width: "247px",
                height: "179px",
                backgroundColor: "#00FFB299",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() =>
                navigate("/videos-list", {
                  state: {
                    collection: import.meta.env.VITE_NEEDREVIEW_COLLECTION,
                    message: "Reviewer Accepted videos",
                    acceptedcollection: true,
                  },
                })
              }
            >
              <h4>
                {getReviewersStatusReducer.AllVideosLength -
                  (getReviewersStatusReducer.LimesVideosLength +
                    getReviewersStatusReducer.RejectVideosLength)}
              </h4>
              <h4>Accepted videos</h4>
            </div>
          </Col>
          <Col className="d-flex align-items-center justify-content-center p-3">
            <div
              className="shadow gap-5 cursor-pointer"
              style={{
                width: "247px",
                height: "179px",
                backgroundColor: "#A28C1A99",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => (
                props.getVideoRequest({
                  collection: import.meta.env.VITE_NEEDREVIEW_COLLECTION,
                }),
                navigate("/manager-review-videos")
              )}
            >
              <h4>{getReviewersStatusReducer.LimesVideosLength}</h4>
              <h4>Limes in queue</h4>
            </div>
          </Col>
          <Col className="d-flex align-items-center justify-content-center p-3 d-block d-xl-none">
            <div
              className="shadow gap-4 cursor-pointer"
              style={{
                width: "247px",
                height: "179px",
                backgroundColor: "#00FFB299",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={handleShow}
            >
              <img
                width={"50%"}
                height={"50%"}
                src={ReviewersIcon}
                alt="Reviewers"
              />
              <h4>Reviewers Status</h4>
            </div>
          </Col>
        </Row>
      </Col>

      <Col lg={12} style={{ height: "100vh" }} className="overflow-y-scroll">
        <Col
          style={{
            minHeight: "100%",
            marginLeft: "2vh",
            borderRadius: "20px 0px 0px 0px",
            border: "1px solid rgba(0, 41, 255, 1)",
            background:
              "linear-gradient(180deg, rgba(51, 206, 255, 0.6) 0%, rgba(31, 124, 153, 0.6) 100%)",
          }}
        >
          <h3 className="text-start p-4 ms-5">Reviewers Status</h3>
          {!getReviewersStatusReducer.loading &&
            getReviewersStatusReducer.list
              ?.sort((a, b) => {
                // Convert status to boolean for sorting
                return (
                  (b.status === true ? 1 : 0) - (a.status === true ? 1 : 0)
                );
              })
              .filter((items) => items.isManager === false)
              .map((value, index) => {
                // let elapsedTime = { days: 0, hours: 0, minutes: 0 };
                // if (value.status !== true && value.status.seconds) {
                //   elapsedTime = convertTimestampToElapsedTime(
                //     value.status
                //   );
                // }
                let elapsedTime = convertTimestampToElapsedTime(value.status);
                elapsedTime = elapsedTime || { days: 0, hours: 0, minutes: 0 };
                return (
                  <div
                    className="d-flex gap-2 ps-4 p-2 align-items-center"
                    key={index}
                  >
                    <div
                      className="font-Poppins p-0 text-truncate"
                      style={{
                        fontSize: "15px",
                        fontWeight: "500",
                        width: "150px",
                      }}
                    >
                      {value.email.split("@")[0]}
                    </div>
                    <div
                      className="font-Poppins fw-bold p-0"
                      style={{ fontSize: "15px" }}
                    >
                      -
                    </div>
                    <div
                      className="font-Poppins text-truncate"
                      style={{
                        fontSize: "12px",
                        maxWidth: "165px",
                        fontWeight: "300",
                      }}
                    >
                      {value.status === true ? (
                        <div className="d-flex align-items-center gap-2 shadow">
                          <div className="d-flex align-items-center">
                            Active
                          </div>
                          <div
                            style={{
                              width: "10px",
                              height: "10px",
                              backgroundColor: "rgba(66, 255, 0, 1)",
                              borderRadius: "50px",
                            }}
                          ></div>
                        </div>
                      ) : (
                        `Last Seen ${
                          elapsedTime.days > 1 ? `${elapsedTime.days} days` : ""
                        } ${
                          elapsedTime.hours >= 1 && elapsedTime.days < 1
                            ? `${elapsedTime.hours} hours`
                            : ""
                        } ${
                          elapsedTime.hours < 1 &&
                          elapsedTime.days < 1 &&
                          elapsedTime.minutes >= 1
                            ? `${elapsedTime.minutes} minutes`
                            : ""
                        }${
                          elapsedTime.hours < 1 &&
                          elapsedTime.days < 1 &&
                          elapsedTime.minutes < 1
                            ? `few seconds`
                            : ""
                        } ago`
                      )}
                    </div>
                  </div>
                );
              })}
        </Col>
      </Col>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    loginReducer: state.loginReducer || {},
    getVideoReducer: state.getVideoReducer || {},
    getReviewersStatusReducer: state.getReviewersStatusReducer || {},
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getVideoLstRequest,
      getVideoRequest,
      getReviewerStatusRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerMain);
