import https from "../../axios";
export const doLogin = async (params) => {
  const { email, password } = params;

  try {
    return await https.post("/api/auth/login", {
      email,
      password,
    });
  } catch (exception) {
    const error = exception.toJSON();
    return {
      data: {
        loading: false,
        success: false,
        message:
          error.status === 401
            ? "Invalid Email or Password!"
            : error.message || "An error occurred",
      },
    };
  }
};
