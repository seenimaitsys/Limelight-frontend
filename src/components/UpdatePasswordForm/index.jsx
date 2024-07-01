import { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Button, Form, Col, Row, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import loading_gif from "../../assets/images/loading-gif.gif";
import Error from "../Error";
import {
  checkTokenisValidRequest,
  updatePasswordRequest,
} from "../../db/action/forgetPassword";

const UpdatePasswordForm = (props) => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const [formData, setFormData] = useState({});
  const [showError, setShowError] = useState(false);
  const [info, setInfo] = useState({
    content: "",
    variant: "",
  });

  const { validJWTReducer, forgetPasswordReducer, token } = props;
  useEffect(() => {
    props.checkTokenisValidRequest({ token: token, onlyVerify: true });
  }, []);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isStrongPassword = (password) => {
    const minLength = 5;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasDigit &&
      hasSpecialChar
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      if (formData.password !== formData.confirmpassword) {
        setInfo({
          content: "Passwords  not match",
          variant: "danger",
        });
        setShowError(true);
      } else if (!isStrongPassword(formData.password)) {
        setInfo({
          content:
            "Password is not strong enough. It must be at least 8 characters long and include uppercase, lowercase, digits, and special characters.",
          variant: "danger",
        });
        setShowError(true);
      } else {
        props.updatePasswordRequest({ ...formData, token: token });
      }
    }
    setValidated(true);
  };

  useEffect(() => {
    const { valid } = validJWTReducer;

    if (valid === false) {
      navigate(`/authfailed/${token}`);
    }
  }, [validJWTReducer]);

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
    >
      {validJWTReducer.loading ? (
        <Col>
          <Image src={loading_gif} alt="loading" width={"50%"} height={"50%"} />
        </Col>
      ) : (
        <Col className="rounded-30 bg-login-bg" xl={8} md={10} xs={12}>
          <Row className="mt-6">
            <h3 className="text-white text-center fs-35 fw-semibold font-Poppins">
              Change Password
            </h3>
          </Row>

          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="login-form w-100 p-3 p-lg-5 p-xl-5 p-xxl-5 p-md-5"
          >
            {showError && (
              <Error
                content={info.content}
                variant={info.variant}
                setShowError={setShowError}
              />
            )}
            <Form.Group>
              <Form.Control
                type="password"
                required
                className="login-input text-lowercase bg-transparent mt-2 h-44 rounded-22 border-login-input ps-4 d-flex justify-content-center text-white"
                name="password"
                placeholder="New password"
                autoComplete="off"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid" className="ms-2">
                New Password is a required field
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                required
                className="login-input text-lowercase bg-transparent mt-4 h-44 rounded-22 border-login-input ps-4 d-flex justify-content-center text-white"
                name="confirmpassword"
                placeholder="Confirm new password"
                autoComplete="off"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid" className="ms-2">
                Confirm password is a required field.
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              type="submit"
              disabled={forgetPasswordReducer.loading}
              className="w-100 h-44 rounded-30 mt-4 text-center fw-medium text-white fs-16 font-Poppins letter-spacing bg-login-submit"
            >
              {forgetPasswordReducer.loading ? "Loading..." : "Reset password"}
            </Button>
          </Form>
        </Col>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    forgetPasswordReducer: state.forgetPasswordReducer || {},
    validJWTReducer: state.validJWTReducer || {},
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updatePasswordRequest,
      checkTokenisValidRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePasswordForm);
