import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
    'token': localStorage.getItem("LOGIN_USER")
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};

export const getListVideoApi = async () => {
  const {data} = await axios.get(`${BASE_URL}/api/video/getListVideo`);

  return data;
};

export const getListVideoTypeApi = async () => {
  const {data} = await axios.get(`${BASE_URL}/api/video/getVideoType`);
  return data;
}

export const getListVideoTypeIdApi = async (videoTypeId) => {
  const {data} = await axios.get(`${BASE_URL}/api/video/getListVideo/${videoTypeId}`)
  return data;
}

export const getVideoDetailApi = async (videoId) => {
  const {data} = await axios.get(`${BASE_URL}/api/video/getVideoDetail/${videoId}`)
  return data;
}

export const signUpApi = async (model) => {
  const {data} = await axios.post(`${BASE_URL}/api/user/sign-up`, model);

  return data;
}

export const loginApi = async (model) => {
  const {data} = await axios.post(`${BASE_URL}/api/user/login`, model);

  return data;
}

export const loginFacebookApi = async (model) => {
  const {data} = await axios.post(`${BASE_URL}/api/user/login-facebook`, model);

  return data;
}

// export const updateUser = async (model) => {
//   const {data} = await axios.put(`${BASE_URL}/api/user/update-user`, model, options);

//   return data;
// }
