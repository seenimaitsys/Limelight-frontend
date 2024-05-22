import { Container, Col, Image } from "react-bootstrap";
import VideoWatching from "../../assets/images/videoWatching.svg";
import Ellipse1 from "../../assets/images/Ellipse1.svg";
import Ellipse2 from "../../assets/images/Ellipse2.svg";
import AddReviewersForm from "../../components/AddReviewersForm";
const AddNewReviewers = () => {
  return (
    <>
      <Container className="d-flex justify-content-center align-items-center">
        <Col
          xl={6}
          lg={6}
          className="d-none d-xl-block d-lg-block"
          style={{ position: "relative" }}
        >
          <Image
            hight={"50%"}
            width={"90%"}
            src={Ellipse1}
            style={{
              position: "absolute",

              left: "-20vh",
              zIndex: 1,
            }}
          />
          <Image
            src={VideoWatching}
            hight={"50%"}
            width={"90%"}
            style={{ position: "relative", zIndex: 2 }}
          />
          <Image
            src={Ellipse2}
            hight={"50%"}
            width={"90%"}
            style={{
              position: "absolute",

              top: "25vh",
              left: "5rem",
              zIndex: 0,
            }}
          />
        </Col>
        <Col
          xl={6}
          lg={6}
          sm={10}
          xs={12}
          className="d-flex flex-column  justify-content-center mt-sm-5 mt-lg-0 "
        >
          <AddReviewersForm />
        </Col>
      </Container>
    </>
  );
};

export default AddNewReviewers;
