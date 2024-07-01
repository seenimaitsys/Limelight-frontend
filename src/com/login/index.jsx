import https from "../../axios";
export const doLogin = async (params) => {
  const { email, password } = params;

  try {
    return await https.post("/auth/login", {
      email,
      password,
    });
  } catch (exception) {
    const error = exception.toJSON();
    return {
      data: {
        loading: false,
        success: false,
        message: error.message,
      },
    };
  }
};
