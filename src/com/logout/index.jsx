import https from "../../axios";
export const doLogout = async (params) => {
  const { id } = params;

  try {
    return await https.post("/logout", {
      id,
    });
  } catch (exception) {
    return {
      loading: false,
      success: false,
      message: exception.message,
    };
  }
};
