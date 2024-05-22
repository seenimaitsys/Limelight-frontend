import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Button, Form, Col, Row, Alert } from "react-bootstrap";
import { loginRequest } from "../../db/action/login";
import { getVideoRequest } from "../../db/action/Getvideos";

const LoginForm = (props) => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, seterror] = useState("");
  const navigate = useNavigate();
  const { loginReducer } = props;
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      // event.stopPropagation();
      // alert("yes");
      props.loginRequest(formData);
    }

    setValidated(true);
  };
  useEffect(() => {
    const { success, message } = loginReducer;
    if (success === true) {
      // alert("yes");
      props.getVideoRequest();
      navigate("/videos");
    } else {
      seterror(message);
    }
  }, [loginReducer]);
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
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group>
            <Form.Control
              type="text"
              required={true}
              className="login-input bg-transparent mt-2 h-44 rounded-22 border-login-input ps-4 d-flex justify-content-center text-white"
              name="email"
              placeholder="User ID"
              autoComplete="off"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              required={true}
              className="login-input bg-transparent mt-4 h-44 rounded-22 border-login-input ps-4 d-flex justify-content-center text-white"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              autoComplete="off"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Password.
            </Form.Control.Feedback>

            <div className=" d-flex align-items-center justify-content-end font-Poppins text-white fw-normal fs-13 p-1 text-decoration-underline cursor-pointer">
              Forgot password?
            </div>
          </Form.Group>

          <Button
            type="submit"
            className="w-100 h-44 rounded-30 mt-4  text-center fw-medium text-white fs-16 font-Poppins letter-spacing bg-login-submit"
          >
            {loginReducer.loading ? "loading..." : "Sign in"}
          </Button>
        </Form>
      </Col>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    loginReducer: state.loginReducer || {},
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      loginRequest,
      getVideoRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
