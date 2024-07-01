import { Container, Col, Row, Placeholder } from "react-bootstrap";
import LoadingPlaceholder from "../../LoadingPlaceholder";
const VideoReviewLoading = () => {
  return (
    <>
      <Container fluid>
        <Col lg={6} xl={4}>
          <LoadingPlaceholder
            className1={`w-100 d-flex flex-column   align-items-center align-items-xl-start`}
            className2={`w-75 text-center ms-0 ms-xl-5 h-20 rounded-10`}
          />
        </Col>

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
              <LoadingPlaceholder
                className1={`w-100 d-flex `}
                className2={`w-100  rounded-30 text-center  shadow border-video-border h-300`}
              />

              <LoadingPlaceholder
                className1={`w-100 d-flex align-items-center justify-content-center`}
                className2={`w-75 h-10 rounded-10`}
              />
            </Col>
            <Col
              lg={5}
              xl={5}
              sm={7}
              md={7}
              xs={12}
              className="d-flex flex-column justify-content-center align-items-center me-0  "
            >
              <LoadingPlaceholder
                className1={`w-100 d-flex mt-10`}
                className2={`w-100  rounded-30 text-center  shadow border-video-border h-450`}
              />

              <LoadingPlaceholder
                className1={`w-100 d-flex align-items-center justify-content-center mt-4 mt-xl-0 mt-lg-0 d-xl-none d-lg-none`}
                className2={`w-75 h-20 rounded-10`}
              />
            </Col>
          </Col>
          {/* other content */}
          <Col
            xl={6}
            lg={6}
            md={12}
            className="d-flex flex-column   mb-5 mb-xl-0 mb-lg-0"
          >
            <LoadingPlaceholder
              className1={`w-100 d-flex mt-10 mt-4 mt-xl-0 mt-lg-0  d-none d-lg-block`}
              className2={`w-42 h-20 rounded-10`}
            />

            <Col
              className="d-flex  align-items-center justify-content-center "
              xl={12}
              lg={12}
              md={12}
              xxl={12}
            >
              <Col
                className="pb-5  pt-5  "
                xl={9}
                lg={9}
                md={9}
                sm={12}
                xs={12}
              >
                <Placeholder
                  as="p"
                  animation="glow"
                  className="w-100 d-flex flex-column align-items-center align-items-sm-center align-items-lg-start align-items-md-start "
                >
                  <Placeholder className="w-75 h-20 rounded-10" />
                  <Placeholder className="w-50 mt-3 h-20 rounded-10" />
                </Placeholder>
              </Col>

              <Col className="ms-4 d-none d-xl-block d-lg-block d-md-block ">
                <LoadingPlaceholder
                  className1={``}
                  className2={`h-65 w-150 rounded-18`}
                />
              </Col>
            </Col>

            <Col
              xl={12}
              md={12}
              className={` mt-0 mt-xl-5 mt-lg-5 w-100 d-flex flex-column flex-lg-row flex-md-row flex-xl-row gap-4 align-items-center justify-content-center justify-content-lg-start justify-content-xl-start`}
            >
              <Col
                xl={3}
                md={4}
                lg={5}
                sm={12}
                xs={12}
                className={`d-flex flex-column `}
              >
                <LoadingPlaceholder
                  className1={`w-100`}
                  className2={`shadow w-100 h-50 rounded-1 border-bt-border`}
                />

                <LoadingPlaceholder
                  className1={`w-100`}
                  className2={`shadow  rounded-circle d-none d-lg-block d-xl-block d-md-block h-50 w-51 border-bt-border`}
                />
              </Col>
              <Col xl={3} md={4} lg={5} sm={12} xs={12}>
                <LoadingPlaceholder
                  className1={`w-100`}
                  className2={`shadow shadow w-100 h-50 rounded-1 border-bt-border`}
                />

                <LoadingPlaceholder
                  className1={`w-100`}
                  className2={`shadow  rounded-circle d-none d-lg-block d-xl-block d-md-block h-50 w-51 border-bt-border`}
                />
              </Col>

              <LoadingPlaceholder
                className1={`w-100 shadow mt-4 d-block d-md-none d-lg-none d-xl-none`}
                className2={`shadow w-100 h-50 rounded-1 border-bt-border`}
              />
            </Col>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default VideoReviewLoading;
