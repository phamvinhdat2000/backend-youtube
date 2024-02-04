import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { getAllVideoByUserId } from "../services/video.service";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState(null);

  const { id } = useParams();

  useEffect(()=>{
    (async()=>{
      let listVideo=await getAllVideoByUserId(id);
      if(listVideo){
        setVideos(listVideo);
      }else{
        throw Error("Can't get video");
      }
    })()
    
  },[id])

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          height: '300px',
          background: 'linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)',
          zIndex: 10,
        }} />
        
        <ChannelCard channelDetail={channelDetail} marginTop="-93px" />

      </Box>

      <Box p={2} display="flex" style={{marginTop:150}}>
        <Box sx={{ mr: { sm: '100px' } }} />

        <Videos videos={videos} />

      </Box>
    </Box>
  );
};

export default ChannelDetail;
