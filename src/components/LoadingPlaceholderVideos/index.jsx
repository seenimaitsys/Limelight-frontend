import { Placeholder, Col, Row, Container } from "react-bootstrap";

const loadingPlaceholderVideos = () => {
  return (
    <Container fluid>
      <Row className="ms-1 ms-lg-5 d-flex align-items-center justify-content-center">
        {[1, 2, 3, 4, 5, 6].map((value) => {
          return (
            <Placeholder
              as="div" //learn
              animation="glow"
              lg={12}
              xl={5}
              md={12}
              key={value}
            >
              <Col
                className={`d-flex mt-5 mt-xl-4 mt-md-4 align-items-center justify-content-center`}
              >
                <Col className="d-flex flex-column flex-md-row">
                  <Col
                    className="d-flex align-items-center justify-content-center"
                    xl={3}
                    md={3}
                    sm={4}
                  >
                    <Col xl={10} lg={12} md={12} sm={12} xs={11}>
                      <Placeholder
                        style={{
                          width: "100%",
                          height: "119px",
                          borderRadius: "30px",
                        }}
                        // height={`${currentResolution < 576 ? "170px" : "119px"}`}
                      />
                    </Col>
                  </Col>
                  <Col className="d-flex flex-column align-items-center align-items-sm-start justify-content-center">
                    <Col className="w-85 ms-0 ms-md-4 mt-4 mt-xl-3 mt-md-3 d-flex flex-column">
                      <Placeholder className="w-100 p-2 rounded-10" />
                    </Col>
                    <Col className="w-85 ms-0 ms-md-4 mt-4 mt-xl-3 mt-md-3 d-flex flex-column">
                      <Placeholder className="w-100 p-2 rounded-10" />
                    </Col>
                    <Col className="w-85 ms-0 ms-md-4 mt-4 mt-xl-3 mt-md-3 d-flex flex-column">
                      <Placeholder className="w-100 p-2 rounded-10" />
                    </Col>
                  </Col>
                </Col>
              </Col>
            </Placeholder>
          );
        })}
      </Row>
    </Container>
  );
};

export default loadingPlaceholderVideos;
