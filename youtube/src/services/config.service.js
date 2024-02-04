import axios from "axios";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "../utils";
// import { getLocalStorage } from "src/utils";
// import { ACCESS_TOKEN } from "src/constants";

const BASE_URL="http://localhost:8080";

export const axiosWithoutAuth=axios.create({
    baseURL:BASE_URL,
    timeout:180_000,
});

export const aixosWithAuth=axios.create(
    {
        baseURL:BASE_URL,
        timeout:180_000,
    }
);

aixosWithAuth.interceptors.request.use(
    (config)=>{
        config.headers["Authorization"]=`Bearer ${getLocalStorage("ACCESS_TOKEN")}`;
        return config;
    },
    (e)=>{return Promise.reject(e);}
);
aixosWithAuth.interceptors.response.use(
    (response)=>{
        return response;
    },
    async (error)=>{
        const originalConfig=error.config;
        if(error.response && error.response.status===417){
            try {
               const result=await aixosWithAuth.post("http://localhost:8080/auth/refresh-tokens",{
                refresh_token:getLocalStorage("REFRESH_TOKEN")
               });
               console.log(result);
               const {accessToken,refreshToken}=result.data;
               console.log(accessToken)
               setLocalStorage("ACCESS_TOKEN",accessToken);
                setLocalStorage("REFRESH_TOKEN",refreshToken);
                originalConfig.headers["Authorization"]=`Bearer ${accessToken}`;
                return aixosWithAuth(originalConfig)
            } catch (err) {
                if(err.response && err.response.status===400){
                    removeLocalStorage("ACCESS_TOKEN");
                    removeLocalStorage("REFRESH_TOKEN");
                    window.location.href="/login"
                }
            }
        }
        return Promise.reject(error)
    }
)