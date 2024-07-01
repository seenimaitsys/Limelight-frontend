import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
const Error = (props) => {
  const { content, variant, setShowError } = props;
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
      setShowError(false);
    }, 4000);
    return () => {
      clearTimeout(timeId);
    };
  }, [props]);

  if (!isEmpty(content) && !show) {
    return null;
  }
  return (
    <Alert key={variant} variant={variant}>
      {" "}
      {content}{" "}
    </Alert>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Error);
