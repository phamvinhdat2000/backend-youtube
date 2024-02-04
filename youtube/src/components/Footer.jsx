import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  createMessage,
  deleteAllMess,
  getAllMessageByAdmin,
  getAllMessageByUser,
  getAllRoomIdByAdmin,
} from "../services/message.service";
import { handleTime } from "./VideoDetail";
import { Hidden } from "@mui/material";

const Footer = () => {
  const userInf = useSelector((state) => state.userReducer.userDetail);
  const isLogin = useSelector((state) => state.userReducer.isLogin);
  const [messages, setMessages] = useState(null);
  const [roomId, setRoomId] = useState(null);
  useEffect(() => {
    if (userInf.role == "user") {
      (async () => {
        let dataMess = await getAllMessageByUser(userInf?.user_id);
        console.log(dataMess);
        if (dataMess) {
          setMessages(dataMess);
        }
      })();
    } else if (userInf.role == "admin") {
      (async () => {
        let dataMess = await getAllMessageByAdmin();
        if (dataMess) {
          setMessages(dataMess[0].data);
          setRoomId(dataMess[0].roomId);
        }
      })();
    }
  }, [userInf.user_id]);

  const showChat = (show) => {
    document.getElementById("formChat").style.display = show;
  };
  const renderMess = (messages) => {
    if (userInf.role == "user") {
      return messages?.map((mess, index) => {
        if (mess.role == "user") {
          return (
            <li className="self" key={index}>
              <div className="avatar">
                <img
                  src={
                    !userInf.avatar
                      ? "http://dergipark.org.tr/assets/app/images/buddy_sample.png"
                      : userInf.avatar
                  }
                />
              </div>
              <div className="messages">
                <p>{mess.content}</p>
                <time>{handleTime(mess.create_at)}</time>
              </div>
            </li>
          );
        } else {
          return (
            <li className="other" key={index}>
              <div className="avatar">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHTEFMnih7ZgOPIZej2dclAphUeOhVR1OIFaPoYCOqm9fY1Fv7" />
              </div>
              <div className="messages">
                <p>{mess.content}</p>
                <time>{handleTime(mess.create_at)}</time>
              </div>
            </li>
          );
        }
      });
    } else if (userInf?.role == "admin") {
      return messages?.map((mess, index) => {
        if (mess.role == "admin") {
          return (
            <li className="self" key={index}>
              <div className="avatar">
                <img
                  src={
                    !userInf.avatar
                      ? "http://dergipark.org.tr/assets/app/images/buddy_sample.png"
                      : userInf.avatar
                  }
                />
              </div>
              <div className="messages">
                <p>{mess.content}</p>
                <time >{handleTime(mess.create_at)}</time>
              </div>
            </li>
          );
        } else {
          return (
            <li className="other" key={index}>
              <div className="avatar">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHTEFMnih7ZgOPIZej2dclAphUeOhVR1OIFaPoYCOqm9fY1Fv7" />
              </div>
              <div className="messages">
                <p>{mess.content}</p>
                <time>{handleTime(mess.create_at)}</time>
              </div>
            </li>
          );
        }
      });
    }
  };
  const handleDeleteAllMess=async (id)=>{
    let confirmDelete=window.confirm("Bạn có chắc muốn đóng lượt chat này không?");
    if(confirmDelete){
      let deleteMess=await deleteAllMess(id);
      if(deleteMess && userInf?.role=="admin"){
        setMessages(null)
      };
      if(deleteMess && userInf?.role=="user"){
        setMessages([])
      }
    }
    
  }

  return (
    <div>
      {
        isLogin&&messages?<><button id="btnChat" className="open-button" onClick={() =>
          showChat("block")}>
          <i className="fa fa-comments" aria-hidden="true" />
        </button>
        <div className="chat-popup" id="formChat">
        <div className="chatHead">
          <p className="chatName">{roomId?`User room ${roomId}`:"Admin"}</p>
          <button
            type="button"
            className="chatClose"
            onClick={() => showChat("none")}
          >
            <span aria-hidden="true">_</span>
          </button>
          <button
            type="button"
            className="chatClose"
            onClick={() => {
              showChat("none");
              if(userInf?.role=="user"){
                handleDeleteAllMess(userInf?.user_id);
              }else{
                handleDeleteAllMess(roomId);
              }
            }
             
            }
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <ol className="discussion" id="chat-noiDung">
          {/* <li className="other">
            <div className="avatar">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHTEFMnih7ZgOPIZej2dclAphUeOhVR1OIFaPoYCOqm9fY1Fv7" />
            </div>
            <div className="messages">
              <p>
                yeah, they do early flights cause they connect with big
                airports. they wanna get u to your connection
              </p>
              <time dateTime="2009-11-13T20:00">Timothy • 51 min</time>
            </div>
          </li>
          <li className="self">
            <div className="avatar">
              <img src="https://amp.businessinsider.com/images/5947f16889d0e20d5e04b3d9-750-562.jpg" />
            </div>
            <div className="messages">
              <p>That makes sense.</p>
              <p>It's a pretty small airport.</p>
              <time dateTime="2009-11-13T20:14">37 mins</time>
            </div>
          </li> */}
          {renderMess(messages)}
        </ol>
        <div className="chatBottom">
          <input
            id="txt-chat"
            className="sentText"
            type="text"
            placeholder="Your Text"
            style={{
              flex: 1,
              border: "1px solid #0374d8",
              borderRadius: 20,
              padding: "0 20px",
            }}
          />
          <button
            id="btn-send"
            type="button"
            onClick={() => {
              let content = document.getElementById("txt-chat").value.trim();
              let role;
              userInf?.role=="user"?role="user":role="admin";
              let data = {
                room_id: userInf?.role == "user" ? userInf?.user_id : roomId,
                content,
                role: role,
              };
              (async () => {
                let messCreate = await createMessage(data);
                if (!messCreate && content!="") {
                  alert("Bạn đang trong hàng đợi, vui lòng thử lại sau");
                }else if(!messCreate && content==""){
                  alert("Bạn vui lòng nhập nội dung tin nhắn")
                }
                document.getElementById("txt-chat").value = "";
              })();
            }}
            className="sendbtn"
            aria-label="Close"
          >
            <span aria-hidden="true">
              <i className="fa-regular fa-paper-plane"></i>
            </span>
          </button>
        </div>
      </div></>
        :""
      }
      {/* <button className="open-button" onClick={() =>
        showChat("block")}>
        <i className="fa fa-comments" aria-hidden="true" />
      </button> */}
      
    </div>
  );
};

export default Footer;
