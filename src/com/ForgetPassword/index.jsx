import https from "../../axios";
export const checkTokenisValid = async (params) => {
  const { token, onlyVerify } = params;
  console.log("tok" + token);
  try {
    return await https.post("/tokenvalid", {
      token,
      onlyVerify,
    });
  } catch (exception) {
    const error = exception.toJSON();
    return {
      data: { success: false, message: error.message },
    };
  }
};
export const forgetPassword = async (params) => {
  const { email } = params;
  try {
    return await https.post("/forget", {
      email,
    });
  } catch (exception) {
    const error = exception.toJSON();
    return {
      data: { success: false, message: error.message },
    };
  }
};

export const updatePassword = async (params) => {
  const { password, confirmpassword, token } = params;
  try {
    return await https.post("/updatePassword", {
      password,
      confirmpassword,
      token,
    });
  } catch (exception) {
    const error = exception.toJSON();
    return {
      data: { success: false, code: error.code, message: error.message },
    };
  }
};
