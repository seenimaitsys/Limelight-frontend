import https from "../../axios";
export const doGetReviewerStatus = async () => {
  try {
    return await https.post("/getstatus");
  } catch (exception) {
    return {
      loading: false,
      success: false,
      message: exception.message,
    };
  }
};
