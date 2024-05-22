import { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Button, Form, Col, Row } from "react-bootstrap";
import { addReviewerRequest } from "../../db/action/addReviewer";
const AddReviewersForm = (props) => {
  const [formData, setFormData] = useState({});
  const { addReviewer } = props;
  // const { loading, error } = useSelector((state) => state.user);

  // const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      event.stopPropagation();

      props.addReviewerRequest(formData);
    }

    setValidated(true);
  };
  useEffect(() => {
    const { success } = addReviewer;
    if (success === true) {
      // alert("add");
    }
  }, [addReviewer]);
  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
    >
      <Col className=" rounded-30  bg-login-bg " xl={8} md={10} xs={12}>
        <Row className="mt-6">
          <h3 className=" text-white text-center fs-35 fw-semibold  font-Poppins">
            Welcome
          </h3>
          <h6 className=" text-center fw-normal fs-18 text-gray-100">
            Enter your details <br /> to start reviewing
          </h6>
        </Row>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="login-form w-100 p-3 p-lg-5 p-xl-5 p-xxl-5 p-md-5"
        >
          <Form.Group>
            <Form.Control
              type="text"
              required={true}
              className="login-input bg-transparent mt-2 h-44 rounded-22 border-login-input ps-4 d-flex justify-content-center text-white"
              name="name"
              placeholder="name"
              autoComplete="off"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="email"
              required={true}
              className="login-input bg-transparent mt-4 h-44 rounded-22 border-login-input ps-4 d-flex justify-content-center text-white"
              name="email"
              placeholder="Email"
              autoComplete="off"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              required={true}
              className="login-input bg-transparent mt-4 h-44 rounded-22 border-login-input ps-4 d-flex justify-content-center text-white"
              name="mobile"
              placeholder="Mobile Number"
              autoComplete="off"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Mobile.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              required={true}
              className="login-input bg-transparent mt-4 h-44 rounded-22 border-login-input ps-4 d-flex justify-content-center text-white"
              name="password"
              placeholder="password"
              autoComplete="off"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Password.
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            type="submit"
            className="w-100 h-44 rounded-30 mt-4  text-center fw-medium text-white fs-16 font-Poppins letter-spacing bg-login-submit"
          >
            Sign in
          </Button>
          {addReviewer.message && (
            <p className="text-black mt-5">{addReviewer.message}</p>
          )}
        </Form>
      </Col>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    addReviewer: state.addReviewer || {},
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addReviewerRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddReviewersForm);
