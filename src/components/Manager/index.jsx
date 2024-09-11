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
import moment from "moment";
import ReviewerStatus from "../UserStatus";
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
                getReviewersStatusReducer.reviewerStatus
                  ?.sort((a, b) => {
                    // Check if both users have logged in (lastseen != 0)
                    const hasLoggedInA = a.lastseen !== 0;
                    const hasLoggedInB = b.lastseen !== 0;

                    // Sort users who have logged in before those who haven't
                    if (hasLoggedInA && !hasLoggedInB) return -1;
                    if (!hasLoggedInA && hasLoggedInB) return 1;

                    // Compare timestamps to sort active users before inactive users
                    const isActiveA =
                      hasLoggedInA &&
                      moment().diff(moment.unix(a.lastseen), "minutes") < 10;
                    const isActiveB =
                      hasLoggedInB &&
                      moment().diff(moment.unix(b.lastseen), "minutes") < 10;

                    return isActiveB - isActiveA;
                  })
                  ?.map((reviewer, index) => (
                    <ReviewerStatus key={index} reviewer={reviewer} />
                  ))}
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
                    type: 2,
                  },
                })
              }
            >
              <h4>{getReviewersStatusReducer.RejectedVideos}</h4>
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
                    type: 1,
                  },
                })
              }
            >
              <h4>{getReviewersStatusReducer.AcceptedVideos}</h4>
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
                  role_id: Outh.role_id,
                }),
                navigate("/manager-review-videos")
              )}
            >
              <h4>{getReviewersStatusReducer.LimesInQueue}</h4>
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

      <Col lg={12} className="overflow-y-scroll min-vh-100 d-none d-xl-block">
        <Col
          style={{
            minHeight: "100%",
            borderRadius: "20px 0px 0px 0px",
            border: "1px solid rgba(0, 41, 255, 1)",
            background:
              "linear-gradient(180deg, rgba(51, 206, 255, 0.6) 0%, rgba(31, 124, 153, 0.6) 100%)",
          }}
        >
          <h3 className="text-start p-4 ms-5">Reviewers Status</h3>
          {!getReviewersStatusReducer.loading &&
            getReviewersStatusReducer.reviewerStatus
              ?.sort((a, b) => {
                // Check if both users have logged in (lastseen != 0)
                const hasLoggedInA = a.lastseen !== 0;
                const hasLoggedInB = b.lastseen !== 0;

                // Sort users who have logged in before those who haven't
                if (hasLoggedInA && !hasLoggedInB) return -1;
                if (!hasLoggedInA && hasLoggedInB) return 1;

                // Compare timestamps to sort active users before inactive users
                const isActiveA =
                  hasLoggedInA &&
                  moment().diff(moment.unix(a.lastseen), "minutes") < 10;
                const isActiveB =
                  hasLoggedInB &&
                  moment().diff(moment.unix(b.lastseen), "minutes") < 10;

                return isActiveB - isActiveA;
              })
              ?.map((reviewer, index) => (
                <ReviewerStatus key={index} reviewer={reviewer} />
              ))}
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
