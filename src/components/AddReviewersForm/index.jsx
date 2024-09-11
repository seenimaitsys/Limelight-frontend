import { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Button, Form, Col, Row } from "react-bootstrap";
import { addReviewerRequest } from "../../db/action/addReviewer";
import Error from "../Error";
const AddReviewersForm = (props) => {
  const [formData, setFormData] = useState({});
  const { addReviewer } = props;
  const [validated, setValidated] = useState(false);
  const [showError, setShowError] = useState(false);
  const [info, setInfo] = useState({
    content: "",
    variant: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (isManager) => {
    setFormData({
      ...formData,
      isManager: formData.isManager === isManager ? "" : isManager, // Toggle the role selection
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      event.stopPropagation();
      // console.log(formData);
      props.addReviewerRequest(formData);
      // form.reset();
    }

    setValidated(true);
  };

  useEffect(() => {
    const { success, message } = addReviewer;
    if (success === true) {
      setInfo({
        ...info,
        content: `${message}`,
        variant: "success",
      });
      message && setShowError(true);
      // Handle success case, e.g., clear form, show success message
    } else {
      setInfo({
        ...info,
        content: `${message}`,
        variant: "warning",
      });
      message && setShowError(true);
    }
  }, [addReviewer]);

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
    >
      <Col className="rounded-30 bg-login-bg" xl={8} md={10} xs={12}>
        <Row className="mt-6">
          <h3 className="text-white text-center fs-35 fw-semibold font-Poppins">
            Add employee
          </h3>
          <h6 className="text-center fw-normal fs-18 text-gray-100">
            Enter their details
          </h6>
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
              type="email"
              required
              className="login-input bg-transparent mt-4 h-44 rounded-22 border-login-input ps-4 d-flex justify-content-center text-white"
              name="email"
              placeholder="Email"
              autoComplete="off"
              pattern="[^@\s]+@twigscorp\.com"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide only twigscorp email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="text"
              required
              className="login-input bg-transparent mt-4 h-44 rounded-22 border-login-input ps-4 d-flex justify-content-center text-white"
              name="password"
              placeholder="Password"
              autoComplete="off"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Password.
            </Form.Control.Feedback>
          </Form.Group>

          <Col className="d-flex ms-2 mt-3">
            <Col>
              <Form.Check
                inline
                id="reviewer-checkbox"
                label="Reviewer"
                name="reviewer"
                type="checkbox"
                required={!formData.isManager}
                checked={formData.isManager === false}
                className="text-white"
                onChange={() => handleRoleChange(false)}
              />
            </Col>
            <Col className="d-flex align-items-center justify-content-end">
              <Form.Check
                inline
                id="manager-checkbox"
                label="Manager"
                name="manager"
                type="checkbox"
                required={formData.isManager}
                checked={formData.isManager === true}
                className="text-white"
                onChange={() => handleRoleChange(true)}
              />
            </Col>
          </Col>

          {/* {!error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )} */}

          <Button
            type="submit"
            className="w-100 h-44 rounded-30 mt-4 text-center fw-medium text-white fs-16 font-Poppins letter-spacing bg-login-submit"
          >
            {addReviewer.loading ? "loading..." : "ADD"}
          </Button>
          {/* {addReviewer.message && (
            <p className="text-black mt-5">{addReviewer.message}</p>
          )} */}
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
