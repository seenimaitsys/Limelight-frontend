import Content from "../Content";
// import Header from "../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import "../../src/assets/css/main.min.css"; //custome boostrap design
import Header from "../components/Header";
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
      <Container fluid className={`p-0`}>
        <Header />
        <Content />
      </Container>
    </>
  );
}

export default App;
