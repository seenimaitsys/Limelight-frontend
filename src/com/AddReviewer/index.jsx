import https from "../../axios";
export const doInsertNewReviewer = async (params) => {
  const { email, password, isManager } = params;
  try {
    return await https.post("/api/auth/create", {
      email,
      password,
      isManager,
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
