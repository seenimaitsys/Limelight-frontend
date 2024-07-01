import { Container, Col, Image } from "react-bootstrap";
import AddReviewersForm from "../../components/AddReviewersForm";
import Addemployee from "../../assets/images/Addemployee.png";
const AddNewReviewers = () => {
  return (
    <>
      <Container className="d-flex justify-content-center align-items-center">
        <Col xl={6} lg={6} className="d-none d-xl-block d-lg-block">
          <Image hight={"50%"} width={"90%"} src={Addemployee} />
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
