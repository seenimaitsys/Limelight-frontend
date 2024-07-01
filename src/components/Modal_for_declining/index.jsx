import { Modal, Form, Col, Button } from "react-bootstrap";

const DeclineReasonModal = ({ show, onHide, validated, handleSubmit }) => {
  return (
    <Modal
      show={show}
      style={{
        backdropFilter: "blur(10px)",
      }}
      centered
      onHide={onHide}
    >
      <Col
        lg={12}
        className="gap-4 p-15 rounded border-modal-border bg-decline_Reason d-flex flex-column justify-content-center align-items-center"
      >
        <h3 className="text-white">Reason for declining</h3>
        <Form
          noValidate
          validated={validated}
          onSubmit={(event) => handleSubmit(event)}
          className="d-flex flex-column w-100 gap-4"
        >
          <Form.Group>
            <Form.Select
              required
              style={{ backgroundColor: "#D9D9D91A", color: "white" }}
              className="h-40 bg-select-custom-icon  d-flex border-0 rounded "
              autoComplete="off"
              name="declinereason"
              role="input"
            >
              <option value="Your video contains inappropriate content" hidden>
                Contains nudity or sexual activity
              </option>
              <option value="Inappropriate words" className="text-black">
                Inappropriate words
              </option>
              <option value="Scam/Sale of illegal goods" className="text-black">
                Scam/Sale of illegal goods
              </option>
              <option value="Drugs Usage" className="text-black">
                Drugs Usage
              </option>
              <option value="Violence" className="text-black">
                Violence
              </option>
            </Form.Select>
            <Form.Control.Feedback type="invalid" className="text-start">
              required field.
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end align-items-center">
            <Button
              type="submit"
              className="bg-transparent border-0"
              style={{ color: "#00FFB2" }}
            >
              Send
            </Button>
          </div>
        </Form>
      </Col>
    </Modal>
  );
};

export default DeclineReasonModal;
