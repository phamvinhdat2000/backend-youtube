import { aixosWithAuth, axiosWithoutAuth } from "./config.service";

export const getAllVideo = async () => {
  try {
    const resp = await axiosWithoutAuth("/video");
    console.log(resp);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllVideoByAdmin = async () => {
  try {
    const resp = await aixosWithAuth("/video/video-by-admin");
    console.log(resp);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllVideoPage = async (page,typeId,num) => {
  try {
    const resp = await axiosWithoutAuth({
      method:"get",
      url:"/video/video-by-page",
      params:{
        page:page,
        typeId:typeId,
        num:num
      }
    });
    console.log(resp);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllVideoByTypeId = async (typeId) => {
  try {
    const resp = await axiosWithoutAuth(`/video/video-type/${typeId}`);
    console.log(resp);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllVideoByUserId = async (userId) => {
  try {
    const resp = await axiosWithoutAuth(`/video/video-by-user/${userId}`);
    console.log(resp);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllVideoType = async () => {
  try {
    const resp = await axiosWithoutAuth("video/video-type");
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllVideoBySearch = async (keySearch) => {
  try {
    const resp = await axiosWithoutAuth(`video/video-by-search/${keySearch}`);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const getVideoDetailById = async (id) => {
  try {
    const resp = await aixosWithAuth(`video/video-detail/${id}`);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const getVideoLatest = async () => {
  try {
    const resp = await axiosWithoutAuth("video/video-latest");
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const uploadInfVideo = async (id,formData) => {
  try {
    const resp = await axiosWithoutAuth({
      method:"post",
      url:`/video/${id}`,
      data:formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const uploadVideo = async (id,formData) => {
  try {
    const resp = await axiosWithoutAuth({
      method:"post",
      url:`/video/upload-video/${id}`,
      data:formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateViews = async (id,data) => {
  try {
    const resp = await axiosWithoutAuth({
      method:"put",
      url:`/video/${id}`,
      data:data
    });
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteVideoByAdmin = async (id) => {
  try {
    const resp = await aixosWithAuth({
      method:"delete",
      url:`/video/delete-video-by-admin`,
      data:{"videoId":id}
    });
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};


