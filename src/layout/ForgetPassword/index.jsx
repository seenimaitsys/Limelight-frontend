import { Container, Col, Image } from "react-bootstrap";

import ForgetPassword from "../../assets/images/ForgetPassword.png";
import { useSelector } from "react-redux";
import ForgetPasswordForm from "../../components/ForgetPasswordForm";
import OfterResetPassword from "../../components/OfterResetPassword";
const ForgetPasswordLayout = () => {
  const Outh = useSelector((state) => state.forgetPasswordReducer);
  return (
    <>
      <Container className="d-flex justify-content-center align-items-center">
        <Col
          xl={6}
          lg={6}
          md={6}
          className="d-none d-xl-block d-lg-block d-md-block "
        >
          <Image
            src={ForgetPassword}
            hight={"100%"}
            width={"80%"}
            alt="ForgetPassword"
          />
        </Col>
        <Col
          xl={6}
          lg={6}
          md={6}
          sm={10}
          xs={12}
          className="d-flex flex-column  justify-content-center mt-sm-5 mt-lg-0 "
        >
          {Outh.success ? (
            <OfterResetPassword
              title={" Reset your password"}
              content={
                <>
                  Check your email for a link to reset your
                  <br /> password. If it doesn’t appear within a
                  <br /> few minutes, check your spam folder.
                </>
              }
            />
          ) : (
            <ForgetPasswordForm />
          )}
          {/*  */}
        </Col>
      </Container>
    </>
  );
};

export default ForgetPasswordLayout;
