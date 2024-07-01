import { Container, Col, Image } from "react-bootstrap";

import Updatepassword from "../../assets/images/Updatepassword.png";
import UpdatePasswordForm from "../../components/UpdatePasswordForm";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import OfterResetPassword from "../../components/OfterResetPassword";

const UpdatePasswordLayout = () => {
  const { token } = useParams();
  const Outh = useSelector((state) => state.forgetPasswordReducer);

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center">
        <>
          <Col
            xl={6}
            lg={6}
            md={6}
            className="d-none d-xl-block d-lg-block d-md-block "
          >
            <Image
              src={Updatepassword}
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
            {Outh?.success ? (
              <OfterResetPassword
                title={"Password Changed!"}
                content={
                  <>
                    Your password has been reset <br />
                    successfully.
                  </>
                }
              />
            ) : (
              <UpdatePasswordForm token={token} />
            )}
          </Col>
        </>
      </Container>
    </>
  );
};

export default UpdatePasswordLayout;
