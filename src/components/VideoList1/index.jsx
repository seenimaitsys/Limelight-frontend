import { useEffect, useState, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getVideoLstRequest } from "../../db/action/GetVideosList";
import { Pagination } from "../DataTable";
import { UseGetScreenResolution } from "../GetScreenResolution";

import { RemoveVideoReducer } from "../../db/action/logout";
import LoadingPlaceholder from "../LoadingPlaceholder";
import NodataFound from "../NodataFound";
import VideoListLoading from "../Loading/VideoListLoading";
const VideoList1 = (props) => {
  const [currentResolution] = UseGetScreenResolution();
  const { VideoList } = props;
  const ITEMS_PER_PAGE = import.meta.env.VITE_ITEMS_PER_PAGE;

  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsData = useMemo(() => {
    let computedComments = VideoList?.VideoList;

    setTotalItems(computedComments?.length || 0);

    // Current Page slice
    return computedComments?.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [VideoList?.VideoList, currentPage, VideoList.loading]);

  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message || "";
  const collection = location.state?.collection || "";
  const acceptedcollection = location.state?.acceptedcollection || false;

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
      hour12: true,
    });
  }
  useEffect(() => {
    props.getVideoLstRequest({ collection, managerQuery: false });
    props.RemoveVideoReducer();
    sessionStorage.removeItem("videoEnded");
  }, []);
  const [isAccepted, setIsAccepted] = useState(false);

  const handleClick = () => {
    setIsAccepted(!isAccepted);
    props.getVideoLstRequest({ collection, managerQuery: !isAccepted });
  };

  return (
    <>
      {!VideoList.success && !VideoList.loading && <NodataFound />}
      {(VideoList.success || VideoList.loading) && (
        <Container fluid>
          <Row>
            <Col xl={9}>
              <h2
                className="text-center text-xl-start   ms-0 ms-xl-5  font-Poppins text-gray-200 fw-bold"
                style={{
                  fontSize: "clamp(1px, 7vw, 35px)",
                }}
              >
                {isAccepted
                  ? `Manager ${message.split(" ")[1]} videos`
                  : `Reviewer ${message.split(" ")[1]} videos`}
                {/* {message} */}
              </h2>
            </Col>
            <Col className="w-100 d-flex align-items-center  justify-content-center">
              {VideoList.loading ? (
                <LoadingPlaceholder
                  className1={`w-100 mt-5 mt-xl-0 `}
                  className2={`w-75 h-20 rounded-10 `}
                />
              ) : (
                <h2
                  className={`text-center text-xl-start font-Poppins cursor-pointer text-decoration-underline  ${
                    !isAccepted ? "text-danger" : "text-warning"
                  } fw-bold mt-5 mt-xl-0`}
                  style={{
                    fontSize: "clamp(1px, 4vw, 15px)",
                  }}
                  onClick={handleClick}
                >
                  {!isAccepted
                    ? `Manager ${message.split(" ")[1]} videos`
                    : `Reviewer ${message.split(" ")[1]} videos`}
                </h2>
              )}
            </Col>
          </Row>

          {VideoList.loading ? (
            <VideoListLoading />
          ) : (
            <Row className="ms-1 ms-lg-5 d-flex   ">
              {commentsData?.length <= 0 ? (
                <NodataFound />
              ) : (
                <>
                  {commentsData?.map((item, index) => {
                    return (
                      <Col
                        key={index}
                        className={`d-flex mt-5 mt-xl-4 mt-md-4 align-items-center  justify-content-center ${
                          currentResolution < 576 && "box-shadow-video"
                        }`}
                        lg={12}
                        xl={6}
                        md={12}
                      >
                        <Col className="d-flex flex-column  flex-md-row ">
                          <Col
                            className="d-flex align-items-center  justify-content-center"
                            xl={3}
                            md={3}
                            sm={3}
                          >
                            <Col xl={10} lg={12} md={12} sm={12} xs={10}>
                              <video
                                src={`${item.videoName}#t=0.001`}
                                height={`${
                                  currentResolution < 576 ? "170px" : "119px"
                                }`}
                                playsInline
                                width={"100%"}
                                style={{ borderRadius: "30px" }}
                                onClick={() =>
                                  navigate("/manager-review", {
                                    state: {
                                      selectVideo: item,
                                      videoType: !acceptedcollection ? 0 : 1,
                                      isManager: isAccepted, //false -> reviewer
                                    },
                                  })
                                }
                                className="object-fit-fill  border-vl-border  cursor-pointer"
                              >
                                <source
                                  src={`${item.videoName}#t=0.001`}
                                  type="video/mp4"
                                />
                              </video>
                            </Col>
                          </Col>

                          <Col className="w-100 ms-0 ms-md-4   mt-4 mt-xl-3 mt-md-3">
                            <div className="d-flex gap-2 p-0 align-items-center  justify-content-center ">
                              <p
                                className="font-Poppins   text-nowrap"
                                style={{
                                  width: "140px",
                                  fontSize: "13px",
                                  fontWeight: "500",
                                }}
                              >
                                Reviewed by
                              </p>
                              <p
                                className=" font-Poppins fw-bold  p-0"
                                style={{ fontSize: "15px" }}
                              >
                                :
                              </p>
                              <div className="w-100  font-Poppins  text-truncate">
                                <p
                                  className={`${
                                    currentResolution < 340 && "mw-160"
                                  } font-Poppins  text-truncate`}
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "900",
                                    color: "black",
                                  }}
                                >
                                  {/* {"seenivasan.t@kjdkljdkda"} */}
                                  {item.reviewedBy}
                                </p>
                              </div>
                            </div>
                            <div className="d-flex gap-2 p-0  align-items-center  justify-content-center ">
                              <p
                                className="font-Poppins   text-nowrap "
                                style={{
                                  fontSize: "13px",
                                  width: "140px",
                                  fontWeight: "500",
                                }}
                              >
                                Review time
                              </p>
                              <p
                                style={{ fontSize: "15px" }}
                                className=" font-Poppins fw-bold  p-0"
                              >
                                :
                              </p>
                              <p
                                className="w-100  font-Poppins   p-0"
                                style={{ fontSize: "13px", fontWeight: "500" }}
                              >
                                {/* {item.reviewedDate} */}
                                {formatDate(item.reviewedDate)}
                              </p>
                            </div>
                            {!acceptedcollection && (
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
                                  {item.ReviewStatus}
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
          )}
          <Col
            xl={12}
            className="d-flex align-items-center  justify-content-center mt-5"
          >
            {!VideoList?.loading && VideoList.VideoList?.length > 8 && (
              <Pagination
                total={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            )}
          </Col>
        </Container>
      )}
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
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoList1);
