import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Videos, Loader } from "./";
import {
  fetchFromAPI,
  getVideoDetail,
  getVideoDetailApi,
} from "../utils/fetchFromAPI";
import {
  getAllVideoByTypeId,
  getVideoDetailById,
  updateViews,
} from "../services/video.service";
import { useSelector } from "react-redux";
import { createComment, getAllComment } from "../services/comment.service";

export const handleTime=(dateCreate)=>{
  let dateStart=new Date(dateCreate);
  let dateCurrent=new Date();
  let timeMinus=dateCurrent.getTime()-dateStart.getTime();
  let seconds = Math.floor(timeMinus / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  let months = Math.floor(days / 30.436875);
  let years = Math.floor(months / 12);
  seconds %= 60;
  minutes %= 60;
  hours %= 24;
  days %= 30.436875;
  months %= 12;
  let timeArrRef=["year","month","day","hour","minute","second"];
  let timeArr=[years,months,days,hours,minutes,seconds];
  for(let i=0;i<timeArr.length;i++){
    if(timeArr[i]==0){
      continue;
    }else{
      return `${timeArr[i]} ${timeArrRef[i]} ago`
    }
  }
}
const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [comments, setComments] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id, videoTypeId } = useParams();
  const navigate = useNavigate();
  const userInf = useSelector((state) => state.userReducer.userDetail);

  useEffect(() => {
    (async () => {
      let resp = await getVideoDetailById(id);
      if (resp) {
        setVideoDetail(resp);
      } else {
        alert("Bạn cần phải đăng nhập để xem video");
        navigate("/login");
      }
    })();
    getAllVideoByTypeId(videoTypeId).then((result) => {
      let listVideoRelate = result.filter((video) => {
        return video.video_id != id;
      });
      setVideos(listVideoRelate);
    });

    // setVideoDetail(item);
  }, [id]);

  useEffect(() => {
    (async () => {
      let dataComment = await getAllComment(id);
      if (dataComment) {
        setComments(dataComment);
      }
    })();
  }, [id]);
  const handleRenderComment = () => {
    return comments?.map((comment,index) => {
      return <div key={index} className="d-flex flex-start ">
         <img
          className="rounded-circle shadow-1-strong me-3"
          src={comment.users?.avatar ? comment.users?.avatar:"http://dergipark.org.tr/assets/app/images/buddy_sample.png"}
          alt="avatar"
          width={60}
          height={60}
        />

        <p className="mb-4 pb-2">
          <h6 className="fw-bold text-white mb-1">{comment.users.full_name}</h6>
          {comment.content}

          <div className=" d-flex justify-content-start ">
            <p>Create at: {handleTime(comment.date_create)} </p>
          </div>
        </p>
      </div>;
    });
  };
   
//"http://dergipark.org.tr/assets/app/images/buddy_sample.png"
  // if(!videoDetail) return <Loader />;

  if (videoDetail) {
    // let {dataVideo, dataComment} = videoDetail
    const { video_name, description, views, url } = videoDetail;
    // const {content} = dataComment;
    // let user = dataComment.user;
    // const {full_name, avatar} = user;

    return (
      <Box className="p-5" minHeight="95vh">
        <Stack direction={{ xs: "column", md: "row" }}>
          <Box flex={1}>
            <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
              {/* video main */}
              <ReactPlayer
                url={url}
                className="react-player"
                controls
                onProgress={(progress) => {
                  if (Math.floor(progress.playedSeconds) == 5) {
                    (async () => {
                      try {
                        await updateViews(id, { numViewIncrease: 1 });
                      } catch (error) {
                        console.log(error);
                      }
                    })();
                  }
                }}
              />
              <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
                {video_name}
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ color: "#fff" }}
                py={1}
                px={2}
              >
                <div>
                  <i className="fa-solid fa-comments pe-3"></i>

                  <Link to={`/channel/${description}`}>
                    <Typography
                      variant={{ sm: "subtitle1", md: "h6" }}
                      color="#fff"
                    >
                      <b>{description}</b>

                      <CheckCircleIcon
                        sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                      />
                    </Typography>
                  </Link>
                </div>
                <Stack direction="row" gap="20px" alignItems="center">
                  <Typography variant="body1" sx={{ opacity: 0.7 }}>
                    <i className="far fa-eye me-2" />{" "}
                    {parseInt(views).toLocaleString()}
                  </Typography>

                  <div>
                    <a
                      href="#!"
                      className=" text-white rounded-start p-2 border"
                    >
                      <i className="far fa-thumbs-up me-2" />
                      {parseInt(0).toLocaleString()}
                    </a>
                    <a href="#!" className=" text-white rounded-end p-2 border">
                      <i className="far fa-thumbs-down me-2" />
                    </a>
                  </div>
                </Stack>
              </Stack>

              <div className="text-white bg-dark rounded p-3">
                {description}
              </div>

              {/* comment */}
              <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                  <div className="card border-0">
                    <div
                      className="card-footer py-3 border-0 text-white"
                      style={{ backgroundColor: "#000" }}
                    >
                      <div className="d-flex flex-start w-100">
                        <img
                          className="rounded-circle shadow-1-strong me-3"
                          src={
                            userInf.avatar
                              ? userInf.avatar
                              : "http://dergipark.org.tr/assets/app/images/buddy_sample.png"
                          }
                          alt="avatar"
                          width={40}
                          height={40}
                        />
                        <div className="form-outline w-100">
                          <textarea
                            className="form-control text-white"
                            id="textAreaExample"
                            rows={4}
                            style={{ background: "#000" }}
                            defaultValue={""}
                          />
                          <label
                            className="form-label text-danger"
                            htmlFor="textAreaExample"
                          >
                            Validate
                          </label>
                        </div>
                      </div>
                      <div className="float-end mt-2 pt-1">
                        <button
                          type="button"
                          className="btn btn-outline-light btn-sm me-3"
                          onClick={async () => {
                            let content =
                              document.getElementById("textAreaExample").value;
                            // let currentDate=getCurrentDate();
                            let data = {
                              content,
                              video_id: +id,
                              user_id: userInf?.user_id,
                            };
                            let comment = await createComment(data);
                            if (comment) {
                              alert("Bạn đã tạo comment thành công");
                              //  setComment(comment);

                            }
                          }}
                        >
                          Post comment
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>

                    <div
                      className="card-body text-white"
                      style={{ backgroundColor: "#000" }}
                    >
                      {/* <div className="d-flex flex-start ">
                        <img
                          className="rounded-circle shadow-1-strong me-3"
                          src={
                            "http://dergipark.org.tr/assets/app/images/buddy_sample.png"
                          }
                          alt="avatar"
                          width={60}
                          height={60}
                        />

                        <p className="mb-4 pb-2">
                          <h6 className="fw-bold text-white mb-1">
                            {"Phạm vĩnh đạt"}
                          </h6>
                          {"hay lắm"}

                          <div className=" d-flex justify-content-start ">
                            <p>Create at: </p>
                          </div>
                        </p>
                      </div> */}
                      {handleRenderComment()}
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </Box>

          <Box
            px={2}
            py={{ md: 1, xs: 5 }}
            justifyContent="center"
            alignItems="center"
          >
            {/* list video random */}
            <Typography color="#fff" variant="h6" fontWeight="bold" p={2}>
              {"Related videos:"}
            </Typography>
            <Videos videos={videos} direction="column" />
          </Box>
        </Stack>
      </Box>
    );
  }
};

export default VideoDetail;
