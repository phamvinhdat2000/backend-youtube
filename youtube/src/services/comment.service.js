import { aixosWithAuth, axiosWithoutAuth } from "./config.service";

export const createComment = async (data) => {
    try {
      const resp = await aixosWithAuth({
        method:"post",
        url:"/comment",
        data
      });
      console.log(resp);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  };

  export const getAllComment = async (videoId) => {
    try {
      const resp = await aixosWithAuth({
        method:"get",
        url:`/comment/${videoId}`,
      });
      console.log(resp);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  };