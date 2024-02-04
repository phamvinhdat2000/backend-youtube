import React from "react";
import { Stack, Box } from "@mui/material";

import { VideoCard } from "./";
import NoneData from "./NoneData";

const Videos = ({ videos, direction }) => {
  if (!videos?.length) return <NoneData />;
  console.log(videos);

  return (
    <>
      <Stack
        direction={direction || "row"}
        flexWrap="wrap"
        justifyContent="start"
        alignItems="start"
        gap={2}
      >
        {videos?.map((item, idx) => {
          return (
            <Box key={idx}>{item.video_id && <VideoCard video={item} />}</Box>
          );
        })}
      </Stack>
    </>
  );
};

export default Videos;
