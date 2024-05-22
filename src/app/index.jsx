import Content from "../Content";
// import Header from "../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import "../../src/assets/css/main.min.css"; //custome boostrap design
import Header from "../components/Header";

function App() {
  return (
    <>
      <Header />

      <Content />
    </>
  );
}

export default App;
