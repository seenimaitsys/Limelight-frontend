import { Container, Col, Row, Placeholder } from "react-bootstrap";
import { useSelector } from "react-redux";
const ManagerHomeLoading = () => {
  const Outh = useSelector((state) => state.loginReducer);
  return (
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
          <Col className="d-flex align-items-center justify-content-center p-3">
            <Placeholder animation="glow" className={``}>
              <Placeholder
                xs={12}
                style={{
                  width: "247px",
                  height: "179px",

                  borderRadius: "20px",
                }}
              />
            </Placeholder>
          </Col>
          <Col className="d-flex align-items-center justify-content-center p-3">
            <Placeholder animation="glow" className={``}>
              <Placeholder
                xs={12}
                style={{
                  width: "247px",
                  height: "179px",

                  borderRadius: "20px",
                }}
              />
            </Placeholder>
          </Col>
          <Col className="d-flex align-items-center justify-content-center p-3">
            <Placeholder animation="glow" className={``}>
              <Placeholder
                xs={12}
                style={{
                  width: "247px",
                  height: "179px",

                  borderRadius: "20px",
                }}
              />
            </Placeholder>
          </Col>
          <Col className="d-flex align-items-center justify-content-center p-3 d-block d-xl-none">
            <Placeholder animation="glow" className={``}>
              <Placeholder
                xs={12}
                style={{
                  width: "247px",
                  height: "179px",

                  borderRadius: "20px",
                }}
              />
            </Placeholder>
          </Col>
        </Row>
      </Col>

      <Col lg={12} style={{ height: "100vh" }} className="overflow-y-scroll">
        <Placeholder animation="glow" className={``}>
          <Placeholder
            style={{
              height: "100vh",
              width: "100%",
              borderRadius: "20px 0px 0px 0px",
              border: "1px solid rgba(0, 41, 255, 1)",
            }}
          />
        </Placeholder>
      </Col>
    </Container>
  );
};

export default ManagerHomeLoading;
