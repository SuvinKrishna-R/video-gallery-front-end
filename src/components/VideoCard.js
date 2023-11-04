import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Trash2 } from 'react-feather';
import { useState } from 'react';
import { removeVideo } from '../service/allApis';

import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uniqid from 'uniqid'
import { addHistory } from '../service/allApis';
import format from 'date-fns/format';






function Videocard({video,deleteUpdate,incard}) {

    const handleDelete=async(id)=>{
      const response=await removeVideo(id)
      // console.log(response);
      if(response.status>=200 && response.status<300){
        
       
        toast.success("Video deleted", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          deleteUpdate(true)
      }
    }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async() =>{
    setShow(true);

    //id
    let id=uniqid()
    
    //url,caption-we can get url and caption from video by destructuring
    const{url,caption}=video
    // console.log(url);
    // console.log(caption);


    //date
    let date=format( new Date(),'MMMM Do yyyy,h:mm:ss a')


    if(id!="" && date!=""&& caption!=""&& url!=""){

    const body={
                id,
                cardName:caption,
                url,
                date

    }
    await addHistory(body)
  }





  }
   
    const dragStarted=(e,id)=>{
      console.log("drag started.....sourse card id"+id);
      //to store dragged data
      e.dataTransfer.setData("cardId",id)

    }

  return (
    <div>
      
         <Card draggable onDragStart={(e)=>dragStarted(e,video?.id)}
         style={{ width: '100%',height:'100%',marginTop:'10px',marginBottom:'20px' }} >
      <Card.Img style={{ height: '17rem' }} variant="top" onClick={handleShow}
       src={video?.thumbnail} />
      <Card.Body>
    
        <Card.Text>
          
          <p  style={{height:'6rem'}}>{video?.caption}
          {incard ? "" : <Trash2 className='btn' color='#b51b42' size={57} onClick={()=>handleDelete(video?.id)}></Trash2>}
          </p> 
        </Card.Text>
      </Card.Body>
    </Card>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Video Caption</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <iframe width="100%" height="300px" src={video?.url} 
        title="One Direction - What Makes You Beautiful (Official Video)" 
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen></iframe>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default Videocard