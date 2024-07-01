import { Container, Row, Col, Image } from "react-bootstrap";
import authFailedImage from "../../assets/images/expired.webp";

const AuthenticationFailedLayout = () => {
  return (
    <>
      <Container className="d-flex flex-column align-items-center justify-content-center">
        <Row className="d-flex flex-column align-items-center justify-content-center">
          <Col
            className="d-flex flex-column align-items-center justify-content-center"
            xl={12}
          >
            <Image
              width={"100%"}
              height={"400px"}
              src={authFailedImage}
              alt="authFailedImage"
            />
            <h2 className="text-center mt-5 font-Poppins">
              Authentication Failed!
              <br /> Your token has expired or is no longer active.
            </h2>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AuthenticationFailedLayout;
