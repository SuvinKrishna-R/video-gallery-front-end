import React, { useEffect, useState } from 'react'
import { Row,Col } from 'react-bootstrap'
import VideoCard from './VideoCard'
import { getAllVideos } from '../service/allApis'




function View({addUpdate}) {



  const[videos,setVideos]=useState([])//store full videos
  const[deleteStatus,setDeleteStatus]=useState(false)


  const getVideos=async()=>{
    const result=await getAllVideos()
    setVideos(result.data);

    }

   

    console.log(videos);

    useEffect(()=>{
      getVideos()
    },[addUpdate,deleteStatus])

 

  return (
    <div className='border p-3 rounded mb-4'style={{height:'100%',width:"100%"}}>
        <Row>
          {videos?.map(video=>(
            <Col sm={12} md={6}>
            <VideoCard deleteUpdate={setDeleteStatus} video={video}></VideoCard>
             
          </Col>
          ))
            }
            
        </Row>
    </div>
  )
}

export default View