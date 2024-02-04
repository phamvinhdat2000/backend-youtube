import { aixosWithAuth, axiosWithoutAuth } from "./config.service";

export const createMessage = async (data) => {
    try {
      const resp = await aixosWithAuth({
        method:"post",
        url:"/message",
        data:data
      });
      console.log(resp);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  };

  export const getAllMessageByUser = async (room_id) => {
    try {
      const resp = await aixosWithAuth({
        method:"get",
        url:"/message",
        params:{
            room_id
        }
      });
      console.log(resp);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  };

  export const getAllMessageByAdmin = async () => {
    try {
      const resp = await aixosWithAuth({
        method:"get",
        url:"/message/admin",
      });
      console.log(resp);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  };

  export const deleteAllMess = async (id) => {
    try {
      const resp = await aixosWithAuth({
        method:"delete",
        url:'/message',
        data:{"id":id}
      });
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  };