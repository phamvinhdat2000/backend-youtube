import { Button, Typography } from "@mui/material";
import { GridDeleteIcon } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { deleteVideoByAdmin, getAllVideoByAdmin } from "../services/video.service";
import { useNavigate } from "react-router-dom";


export  function Admin() {
  const [videos,setVideos]=useState(null);
  const navigate=useNavigate();
  useEffect(()=>{
    (async()=>{
      let dataVideo=await getAllVideoByAdmin();
      if(!dataVideo){
        navigate("/")
      }
      setVideos(dataVideo);

    })()
  },[]);
  const handleRenderVideo=()=>{
    return videos?.map((video,index)=>{
      return <tr key={index}>
      <th scope="row">{index}</th>
      <td>{video.video_id}</td>
      <td>{video.video_name}</td>
      <td>{video.users.full_name}</td>
      <td>{<Button onClick={()=>{
        handleDelete(video.video_id)
      }} variant="outlined" startIcon={<GridDeleteIcon />}>
  Delete
</Button>}</td>
    </tr>
    })
  }
  const handleDelete= async (id)=>{
    let checkDelete=window.confirm("Bạn có chắc muốn xóa video?");
    if(checkDelete){
      await deleteVideoByAdmin(id);
      let newListVideo=videos?.filter((video)=>{
        return video.video_id != id
      });
      setVideos(newListVideo);
    }
   }
  return (
    <>
    <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">STT</th>
      <th scope="col">Video_id</th>
      <th scope="col">Video_name</th>
      <th scope="col">Creator</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
   {handleRenderVideo()}
  </tbody>
</table>
</>
  );
}