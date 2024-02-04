import { aixosWithAuth, axiosWithoutAuth } from "./config.service";

export const login = async (dataUser) => {
    try {
      const resp = await axiosWithoutAuth({
        method:"post",
        url:"/auth/login",
        data:dataUser
      });
      console.log(resp);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  };

  export const signUp = async (dataUser) => {
    try {
      const resp = await axiosWithoutAuth({
        method:"post",
        url:"/auth/sign-up",
        data:dataUser
      });
      console.log(resp.data)
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  };

  export const logout = async (idUser) => {
    try {
      const resp = await aixosWithAuth({
        method:"post",
        url:"/auth/logout",
        data:{"user_id":idUser}
      });
      console.log(resp.data)
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  };

  export const loginByFb = async (dataUser) => {
    try {
      const resp = await axiosWithoutAuth({
        method:"post",
        url:"/auth/login-facebook",
        data:dataUser
      });
      console.log(resp.data)
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  };