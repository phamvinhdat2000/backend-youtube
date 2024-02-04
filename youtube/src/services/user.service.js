import axios from "axios";
import { aixosWithAuth, axiosWithoutAuth } from "./config.service";

export const updateUser = async (id,data) => {
    try {
      console.log(data);
      const resp = await axiosWithoutAuth({
        method:"post",
        url:`/user/${id}`,
        data:data,
        headers: {
            'Content-Type': 'multipart/form-data'
          }
      });
      console.log(resp.data)
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  };
  export const getUserByToken = async (token) => {
    try {
      const resp = await axios.get('http://localhost:8080/user/token', { params: { accessToken: token } })
      console.log(resp);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  };

  export const getUserById = async (id) => {
    try {
      const resp = await axiosWithoutAuth(`/user/get-by-id/${id}`);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  };
  