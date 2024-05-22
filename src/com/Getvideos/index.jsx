import https from "../../axios";
export const getUniqueVideo = async () => {
  try {
    return await https.post("/getvideo");
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
export const videoReviewed = async (params) => {
  const { videoinfo, reviewerEmail, reviewStatus } = params;
  try {
    return await https.post("/updatevideoreview", {
      videoinfo,
      reviewerEmail,
      reviewStatus,
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
