import { useState, useEffect } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Button, Form, Col, Row } from "react-bootstrap";

import Error from "../Error";

import { forgetPasswordRequest } from "../../db/action/forgetPassword";

const ForgetPasswordForm = (props) => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({});
  const [showError, setShowError] = useState(false);
  const [info, setInfo] = useState({
    content: "",
    variant: "",
  });

  const { forgetPasswordReducer } = props;
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
      props.forgetPasswordRequest(formData);
    }

    setValidated(true);
  };
  useEffect(() => {
    const { success, message } = forgetPasswordReducer;

    if (!success) {
      setInfo({
        ...info,
        content: `${message}`,
        variant: "danger",
      });
      message && setShowError(true);
    } else {
      setInfo({
        ...info,
        content: `${message}`,
        variant: "danger",
      });
      message && setShowError(true);
    }
  }, [forgetPasswordReducer]);

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
    >
      <Col className=" rounded-30  bg-login-bg " xl={8} md={10} xs={12}>
        <Row className="mt-6">
          <h3 className=" text-white text-center fs-35 fw-semibold  font-Poppins">
            Change Password
          </h3>
          <h6 className=" text-center fw-normal fs-18 text-gray-100">
            Please enter your twigs address
          </h6>
        </Row>

        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="login-form w-100 p-3 p-lg-5 p-xl-5 p-xxl-5 p-md-5"
        >
          {/* {error && <Alert variant="danger">{error}</Alert>} */}
          {showError && (
            <Error
              content={info.content}
              variant={info.variant}
              setShowError={setShowError}
            />
          )}
          <Form.Group>
            <Form.Control
              type="email"
              required={true}
              className="login-input text-lowercase bg-transparent mt-2 h-44 rounded-22 border-login-input ps-4 d-flex justify-content-center text-white"
              name="email"
              placeholder="Enter address"
              autoComplete="off"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Email is a required field.
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            type="submit"
            disabled={forgetPasswordReducer.loading}
            className="w-100 h-44 rounded-30 mt-5  text-center fw-medium text-white fs-16 font-Poppins letter-spacing bg-login-submit"
          >
            {forgetPasswordReducer.loading
              ? "loading..."
              : "Send password reset email"}
          </Button>
        </Form>
      </Col>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    forgetPasswordReducer: state.forgetPasswordReducer || {},
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      forgetPasswordRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordForm);
