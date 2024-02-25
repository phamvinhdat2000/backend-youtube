import { Avatar, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { logo } from "../utils/constants";
import { SearchBar } from "./";
import { getLocalStorage, removeLocalStorage } from "../utils";
import { useEffect, useState } from "react";
import { getUserById, getUserByToken } from "../services/user.service";
import { logout } from "../services/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { changeStatusLogin, createUserDetail } from "../redux/slices/user.slice";

const Navbar = () => {
  const navigate=useNavigate();
  let [idUser,setIdUser]=useState(null);
  const userInf=useSelector((state)=>state.userReducer.userDetail);
  const dispatch=useDispatch();
  let token =getLocalStorage("ACCESS_TOKEN");

  useEffect(()=>{
    if(!userInf?.user_id){
      (async()=>{
        let resp=await getUserByToken(token);
        let inf=await getUserById(resp?.user_id);
        let payload={
          user_id:inf?.user_id,
          full_name:inf?.full_name,
          email:inf?.email,
          avatar:inf?.avatar,
          role:inf?.role
        };
        dispatch(changeStatusLogin(true));
        dispatch(createUserDetail(payload));
        setIdUser(resp?.user_id);
        
      })()
    }else{
      dispatch(changeStatusLogin(false));
    }
    
  },[token]);

  return (
  <Stack direction="row" alignItems="center" p={2} sx={{ background: '#000', top: 0, justifyContent: "space-between" }}>
    <Link to="/" style={{ display: "flex", alignItems: "center" }}>
      <img src={logo} alt="logo" height={45} />
    </Link>
    <SearchBar />
    <div>
      <div hidden = {token ? true : false}>
        <Link to="/login" className="text-white">Login | </Link>
        <Link to="/signup" className="text-white"> Sign Up</Link>
      </div>

      <div className="dropdown" hidden={token ? false: true}>

        <Avatar type="button" data-bs-toggle="dropdown" aria-expanded="false" src={userInf.avatar ? userInf.avatar : "http://dergipark.org.tr/assets/app/images/buddy_sample.png"} />
        <ul className="dropdown-menu">
          <Link to={`channel/${idUser}`} >
            <li><a className="dropdown-item" href="#" >Kênh cá nhân</a></li>
          </Link>
          <Link to={`info/${idUser}`} >
            <li><a className="dropdown-item" href="#" >Upload video</a></li>
          </Link>
          <li><a className="dropdown-item"
          onClick={() => {
            removeLocalStorage("ACCESS_TOKEN");
            removeLocalStorage("REFRESH_TOKEN");
             (async()=>{
              await logout(idUser);
            })();
            navigate("/");
            // render lại UI
          }}
          >Đăng xuất</a></li>
        </ul>
      </div>
    </div>
  </Stack>
)};

export default Navbar;
