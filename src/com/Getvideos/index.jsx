import https from "../../axios";
export const getUniqueVideo = async (params) => {
  const { collection, manager_id, isManager } = params;
  try {
    if (manager_id === import.meta.env.VITE_MANAGER) {
      return await https.post("/managergetvideo", {
        collection,
        manager_id,
        isManager,
      });
    } else {
      return await https.post("/getvideo", {
        collection,
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
  const {
    collection,
    videoinfo,
    reviewerEmail,
    reviewStatus,
    manager_id,
    isManagerReview,
  } = params;
  try {
    if (manager_id === import.meta.env.VITE_MANAGER) {
      return await https.post("/managervideoreview", {
        collection,
        videoinfo,
        reviewerEmail,
        reviewStatus,
        manager_id,
        isManagerReview,
      });
    } else {
      return await https.post("/updatevideoreview", {
        collection,
        videoinfo,
        reviewerEmail,
        reviewStatus,
        manager_id,
        isManagerReview,
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
