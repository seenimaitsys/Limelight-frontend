import https from "../../axios";
export const getUniqueVideo = async (params) => {
  const { role_id, id, idArray, videoStatus, reviewer_role } = params;

  try {
    if (!id && !videoStatus) {
      return await https.post("/api/video/getvideo", {
        role_id,
      });
    } else if (videoStatus) {
      return await https.post("/api/manager/getvideos", {
        idArray,
        videoStatus,
        reviewer_role,
      });
    } else {
      return await https.post("/api/manager/getvideobyid", {
        role_id,
        id,
      });
    }
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
export const videoReviewed = async (params) => {
  const { role_id, vidoeInfo, videostatus, requestType, reUpdate } = params;
  try {
    if (reUpdate)
      return await https.patch("/api/manager/changestatus", {
        role_id,
        vidoeInfo,
        videostatus,
      });
    else
      return await https.patch("/api/video/updatestatus", {
        role_id,
        vidoeInfo,
        videostatus,
        requestType,
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
