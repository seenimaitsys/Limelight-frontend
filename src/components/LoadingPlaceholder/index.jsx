import { Placeholder } from "react-bootstrap";

const loadingPlaceholder = ({ className1, className2 }) => {
  return (
    <Placeholder as="p" animation="glow" className={`${className1}`}>
      <Placeholder xs={12} className={`${className2}`} />
    </Placeholder>
  );
};

export default loadingPlaceholder;
