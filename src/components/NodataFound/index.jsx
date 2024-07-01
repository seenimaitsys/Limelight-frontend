import { Container, Row, Col, Button } from "react-bootstrap";
import nodataimage from "../../assets/images/nodataFound.jpg";
import { useNavigate } from "react-router-dom";
const NodataFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <Row className="d-flex align-items-center justify-content-center">
          <Col
            xl={6}
            className="d-flex flex-column align-items-center justify-content-center"
          >
            <img
              src={nodataimage}
              alt="no data avaliable!"
              width={"100%"}
              height={"300px"}
            ></img>
            <p className="text-center font-Poppins text-gray-200 fw-bold fs-25">
              No data avaliable right now! <br />
              Try again later!
            </p>
            <Button
              variant="secondary"
              className="ps-5 pe-5 fw-bold fs-20"
              onClick={() => navigate("/manager")}
            >
              home
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NodataFound;
