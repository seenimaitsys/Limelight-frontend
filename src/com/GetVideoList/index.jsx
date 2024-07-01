import https from "../../axios";

export const getVideoList = async (params) => {
  const { collection, managerQuery } = params;

  try {
    return await https.post("/getvideolist", {
      collection,
      managerQuery,
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
