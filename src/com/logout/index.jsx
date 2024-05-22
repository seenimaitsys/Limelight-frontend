import https from "../../axios";
export const doLogout = async () => {
  try {
    return await https.post("/logout");
  } catch (exception) {
    const error = exception.toJSON();
    return {
      data: {
        loading: false,
        success: true,
        message: error.message,
      },
    };
  }
};
