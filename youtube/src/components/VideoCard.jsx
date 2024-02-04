import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from "../utils/constants";

const VideoCard = ({ video }) => {
  const { source, video_id, video_name, thumbnail,type_id } = video;

  return (
    <Card
      sx={{
        width: { xs: "100%", sm: "358px", md: "320px" },
        boxShadow: "none",
        borderRadius: 0,
      }}
    >
      <Link to={video_id ? `/video/${video_id}/${type_id}` : `/video/cV2gBU6hKfY`}>
        <CardMedia
          image={thumbnail}
          alt={video_name}
          sx={{ width: { xs: "100%", sm: "358px" }, height: 180 }}
        />
      </Link>
      <CardContent sx={{ backgroundColor: "#1E1E1E", height: "106px" }}>
        <Link to={video_id ? `/video/${video_id}` : demoVideoUrl}>
          <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
            {video_name?.slice(0, 60)}
          </Typography>
        </Link>
        <Typography variant="subtitle2" color="gray">
          {source}
          <CheckCircleIcon
            sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
          />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
