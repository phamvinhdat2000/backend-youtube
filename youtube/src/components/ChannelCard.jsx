import React, { useEffect, useState } from 'react';
import { Box, CardContent, CardMedia, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link, useParams } from 'react-router-dom';
import { getUserById, getUserByToken } from '../services/user.service';
import { getLocalStorage } from '../utils';

const ChannelCard = (props) => {
  let {id}=useParams();
  let [infUser,setInfUser]=useState(null);

  useEffect(()=>{
    (async ()=>{
      let data=await getUserById(id);
      setInfUser(data);

    })()
  },[id])
  let item = {
    demoProfilePicture: "http://dergipark.org.tr/assets/app/images/buddy_sample.png",
    title: "title",
    subscriberCount: 100,
    channelId: 1
  }

  return <Box
    sx={{
      boxShadow: 'none',
      borderRadius: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: { xs: '356px', md: '320px' },
      height: '50px',
      margin: 'auto',
    }}
  >

    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', color: '#fff' }}>
      <CardMedia
        image={infUser?.avatar?infUser.avatar:`${item.demoProfilePicture}`}
        alt={item.title}
        sx={{ borderRadius: '50%', height: '180px', width: '180px', mb: 2, border: '1px solid #e3e3e3' }}
      />
      <Typography variant="h6">
        {infUser?.full_name}{' '}
        <CheckCircleIcon sx={{ fontSize: '14px', color: 'gray', ml: '5px' }} />

        <br />
        <Link to={`/info/${id}`} className='text-secondary fs-6'>
          Update info   <i className='fa fa-edit'></i>
        </Link>


      </Typography>
      {item.subscriberCount && (
        <Typography sx={{ fontSize: '15px', fontWeight: 500, color: 'gray' }}>
          {parseInt(item?.subscriberCount).toLocaleString('en-US')} Subscribers
        </Typography>
      )}
    </CardContent>
  </Box>
};

export default ChannelCard;
