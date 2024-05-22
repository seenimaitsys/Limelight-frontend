import https from "../../axios";
export const doInsertNewReviewer = async (params) => {
  const { name, email, mobile, password } = params;
  try {
    return await https.post("/create", {
      name,
      mobile,
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
