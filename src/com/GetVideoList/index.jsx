import https from "../../axios";

export const getVideoList = async (params) => {
  const { video_status, reviewer_role } = params;

  try {
    return await https.post("/api/manager/videolist", {
      video_status,
      reviewer_role,
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
