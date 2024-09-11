import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import { getVideoLstRequest } from "../../db/action/GetVideosList";

import { UseGetScreenResolution } from "../GetScreenResolution";

import { RemoveVideoReducer } from "../../db/action/logout";
import { getVideoRequest } from "../../db/action/Getvideos";
import NodataFound from "../NodataFound";
import VideoListLoading from "../Loading/VideoListLoading";
import moment from "moment";
const VideoList1 = (props) => {
  const [currentResolution] = UseGetScreenResolution();
  const location = useLocation();
  const type = location.state?.type;
  // alert(type);
  const { VideoList } = props;
  const navigate = useNavigate();

  const Outh = useSelector((state) => state.loginReducer);
  useEffect(() => {
    props.getVideoLstRequest({ video_status: type, reviewer_role: "RR" });
  }, []);
  const [isAccepted, setIsAccepted] = useState(false);

  const handleVideoClick = (videoId) => {
    props.getVideoRequest({ role_id: Outh.role_id, id: videoId });
    navigate("/manager-review");
    // props.getVideoLstRequest({ collection, managerQuery: !isAccepted });
  };

  return (
    <>
      <Container fluid>
        {!VideoList.loading && VideoList.success ? (
          <>
            <Row>
              <Col xl={9}>
                <h2
                  className="text-center text-xl-start   ms-0 ms-xl-5  font-Poppins text-gray-200 fw-bold"
                  style={{
                    fontSize: "clamp(1px, 7vw, 35px)",
                  }}
                >
                  {VideoList.video_status == type &&
                  VideoList.reviewer_role == "RR"
                    ? `Reviewer ${
                        VideoList.video_status == 2 ? "Rejected" : "Accepted"
                      } videos`
                    : `Manager ${
                        VideoList.video_status == 2 ? "Rejected" : "Accepted"
                      } videos`}
                  {/* {message} */}
                </h2>
              </Col>
              <Col className="w-100 d-flex align-items-center  justify-content-center">
                <h2
                  className={`text-center text-xl-start font-Poppins cursor-pointer text-decoration-underline  ${
                    !isAccepted ? "text-danger" : "text-warning"
                  } fw-bold mt-5 mt-xl-0`}
                  style={{
                    fontSize: "clamp(1px, 4vw, 15px)",
                  }}
                  onClick={() =>
                    props.getVideoLstRequest({
                      video_status: type,
                      reviewer_role:
                        VideoList.reviewer_role == "RR" ? "MR" : "RR",
                    })
                  }
                >
                  {VideoList.video_status == type &&
                  VideoList.reviewer_role == "RR"
                    ? `Manager ${
                        VideoList.video_status == 2 ? "Rejected" : "Accepted"
                      } videos`
                    : `Reviewer ${
                        VideoList.video_status == 2 ? "Rejected" : "Accepted"
                      } videos`}
                </h2>
              </Col>
            </Row>

            <Row className="ms-1 ms-lg-5 d-flex   ">
              {VideoList.List?.length <= 0 ? (
                <NodataFound />
              ) : (
                <>
                  {VideoList.List?.map((item, index) => {
                    return (
                      <Col
                        key={index}
                        className={`mt-5 mt-md-4 d-flex align-items-center  justify-content-center ${
                          currentResolution < 576 && "box-shadow-video"
                        }`}
                        lg={12}
                        xl={6}
                        md={12}
                      >
                        <Col className="d-flex flex-column  flex-md-row ">
                          <Col
                            className="d-flex align-items-center  justify-content-center"
                            sm={3}
                          >
                            <Col xl={10} sm={12} xs={10}>
                              <video
                                src={`${item.video_name}#t=0.001`}
                                height={`${
                                  currentResolution < 576 ? "170px" : "119px"
                                }`}
                                playsInline
                                width={"100%"}
                                style={{ borderRadius: "30px" }}
                                className="object-fit-fill  border-vl-border  cursor-pointer"
                                onClick={() => handleVideoClick(item.id)}
                              >
                                <source
                                  src={`${item.video_name}#t=0.001`}
                                  type="video/mp4"
                                />
                              </video>
                            </Col>
                          </Col>

                          <Col className="w-100 ps-lg-3 d-flex flex-column align-items-center align-items-lg-start justify-content-center">
                            <div className="d-flex gap-2 p-0 align-items-center  justify-content-center ">
                              <p
                                className="font-Poppins m-0 text-nowrap"
                                style={{
                                  width: "140px",
                                  fontSize: "13px",
                                  fontWeight: "500",
                                }}
                              >
                                Reviewed by
                              </p>
                              <p
                                className=" font-Poppins fw-bold  p-0 m-0"
                                style={{ fontSize: "15px" }}
                              >
                                :
                              </p>
                              <div className="w-100  font-Poppins  text-truncate">
                                <p
                                  className={`${
                                    currentResolution < 340 && "mw-160"
                                  } font-Poppins m-0 text-truncate`}
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "900",
                                    color: "black",
                                  }}
                                >
                                  {item.email}
                                </p>
                              </div>
                            </div>
                            <div className="d-flex gap-2 p-0 m-0  align-items-center  justify-content-center ">
                              <p
                                className="font-Poppins m-0 text-nowrap "
                                style={{
                                  fontSize: "13px",
                                  width: "140px",
                                  fontWeight: "500",
                                }}
                              >
                                Reviewed time
                              </p>
                              <p
                                style={{ fontSize: "15px" }}
                                className=" font-Poppins fw-bold m-0 p-0"
                              >
                                :
                              </p>
                              <p
                                className="w-100 m-0 font-Poppins p-0"
                                style={{ fontSize: "13px", fontWeight: "500" }}
                              >
                                {moment
                                  .unix(item.video_status_update)
                                  .format("LLL")}
                              </p>
                            </div>
                            {item.rejected_reason !== "A" && (
                              <div className="d-flex gap-2 p-0  align-items-center  ">
                                <p
                                  className="font-Poppins  text-nowrap  p-0"
                                  style={{
                                    fontSize: "13px",
                                    width: "140px",
                                    fontWeight: "500",
                                  }}
                                >
                                  Reject reason
                                </p>
                                <p
                                  style={{ fontSize: "15px" }}
                                  className=" font-Poppins fw-bold  p-0"
                                >
                                  :
                                </p>
                                <p
                                  className="w-100  font-Poppins  "
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                >
                                  {item.rejected_reason}
                                </p>
                              </div>
                            )}
                          </Col>
                        </Col>
                      </Col>
                    );
                  })}
                </>
              )}
            </Row>
          </>
        ) : (
          <VideoListLoading />
        )}
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    VideoList: state.getVideoListReducer || {},
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getVideoLstRequest,
      RemoveVideoReducer,
      getVideoRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoList1);
