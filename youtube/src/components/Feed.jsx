import React, { useEffect, useState } from "react";
import {
  Box,
  Pagination,
  PaginationItem,
  Stack,
  Typography,
} from "@mui/material";
import { Videos, Sidebar } from "./";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  getAllVideo,
  getAllVideoByTypeId,
  getAllVideoPage,
  getVideoLatest,
} from "../services/video.service";
import { getLocalStorage, removeLocalStorage } from "../utils";
import { PageviewRounded } from "@mui/icons-material";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [videos, setVideos] = useState(null);
  const [videosPerPage, setVideosPerPage] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  let param = useParams();
  let videoTypeId = param.videoTypeId;
  console.log("get params:", videoTypeId);
//   <PaginationItem
//   component={Link}
//   to={`/${item.page === 1 ? "" : `?page=${item.page}`}`}
//   {...item}
// />
 const urlToPage=(item,videoTypeId)=>{
    let url="";
    if(item.page==1 && !videoTypeId){
      url=`/`;
    }else if(item.page!=1 && !videoTypeId){
      url=`/?page=${item.page}`;
    }else if(item.page==1 && videoTypeId){
      url=`/listVideoType/${videoTypeId}`
    }else if(item.page!=1 && videoTypeId){
      url=`/listVideoType/${videoTypeId}/?page=${item.page}`
    }
    return url;
 }

  useEffect(() => {
    if (videoTypeId && videoTypeId != 1) {
      getAllVideoByTypeId(videoTypeId).then((result) => {
        setVideos(result);
        getAllVideoPage(page,videoTypeId,3).then((rs)=>{
          setVideosPerPage(rs);
        })
      });
    } else if (videoTypeId == 1) {
      getVideoLatest().then((result) => {
        setVideos(result);
        getAllVideoPage(page,videoTypeId,3).then((rs)=>{
          setVideosPerPage(rs);
        })
      });
    } else {
      getAllVideo().then((result) => {
        setVideos(result);
        getAllVideoPage(page,videoTypeId,3).then((rs)=>{
          setVideosPerPage(rs);
        })
      });
      setSelectedCategory("All");
      removeLocalStorage("current_category");
    }

  }, [videoTypeId,page]);
  // useEffect(()=>{
  //   getAllVideoPage(page).then((rs)=>{
  //     setVideosPerPage(rs);
  //   })
  // },[page])

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <Typography
          className="copyright"
          variant="body2"
          sx={{ mb: 1.5, color: "#fff" }}
        >
          Copyright © 2050 Media
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {getLocalStorage("current_category") || selectedCategory}{" "}
          <span style={{ color: "#FC1503" }}>videos</span>
        </Typography>

        <Videos videos={videosPerPage} />
        {videos?.length > 3 ? (
          <Pagination
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={urlToPage(item,videoTypeId)}
                {...item}
              />
            )}
            color="primary"
            page={page}
            count={Math.ceil(videos?.length / 3)}
          />
        ) : (
          ""
        )}
      </Box>
    </Stack>
  );
};

export default Feed;
