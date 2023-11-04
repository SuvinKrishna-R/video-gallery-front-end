import React, { useEffect } from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { addCategory, getAllCategory, updateCategory } from '../service/allApis';
import uniqid from 'uniqid'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Trash2 } from 'react-feather';
import { removeCategory } from '../service/allApis';
import { getVideo } from '../service/allApis';
import { Col, Row } from 'react-bootstrap';
import Videocard from './VideoCard';




function Category() {


  //state for store input data in category
  const [uploadCategory, setUploadCategory] = useState(
    {
      id: "",
      name: "",
      allVideos: []
    }
  )

  const [viewCategory, SetViewCategory] = useState([])





  //function to take input data in category 
  const setCategory = (e) => {
    // console.log(e.target.value);
    let { name, value } = e.target
    // console.log(name);

    //update addCategory
    setUploadCategory({ ...uploadCategory, [name]: value })

  }

  const getCategory = async () => {
    const result = await getAllCategory()
    SetViewCategory(result.data)

  }



  console.log(viewCategory);

  useEffect(() => {
    getCategory()
  }, [])




  //function for add
  const handleAdd2 = async () => {
    let id = uniqid()
    setUploadCategory({ ...uploadCategory, ["id"]: id })

    const { name } = uploadCategory
    if (name == "") {
      toast.warn("Please input catagory name", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    else {
      const result = await addCategory(uploadCategory)
      if (result.status >= 200 && result.status < 300) {
        // setUploadCategory(result.data)
        // toast.success("category Added", {
        //   position: "top-center",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "dark",
        //   });

        setShow(false);
        //refresh
        getCategory()      }
    }
  }

  //function to delete category
  const deleteCat = async (id) => {
    const result = await removeCategory(id)
    if (result.status >= 200 && result.status < 300) {

      getCategory()
    }

  }



  console.log(uploadCategory);



  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const draggedOver=(e)=>{
    e.preventDefault()
    console.log("dragged over the category");



  }
  const dropped=async(e,id)=>{
    console.log("category id"+id);
    //access video id transfered from start drag
    let sourceCardId=e.dataTransfer.getData("cardId")
    console.log("source card id is"+sourceCardId);

    const {data}=await getVideo(sourceCardId) 
    console.log(data);

  

  //update category
  //find selected category from all category using cat id
  const selectedCategory=viewCategory.find(i=>i.id==id);//2nd id selected categorynte id aan.1st id 
  console.log(selectedCategory);

  //add video to allvideo array of selected category
  selectedCategory.allVideos.push(data)
  console.log(selectedCategory);

  //update category in db
  await updateCategory(id,selectedCategory)

  //to access updated category from db
  getCategory()


  }

  //scrollbar
    const [scrollTop, setScrollTop] = useState(0);
  
    const handleScroll = (event) => {
      setScrollTop(event.currentTarget.scrollTop);
    };
  

  return (
    <div>

      <button type='button' className='btn btn-success w-75 mb-3' onClick={handleShow}>Category</button>
    
      <div
        style={{
          border: '1px solid black',
          width: '100%',
          height: '500px',
          overflow: 'auto',
        }}
        onScroll={handleScroll}
      >

      
      {viewCategory?.map(item => (
        <div droppable onDragOver={(e)=>draggedOver(e)} 
        onDrop={(e)=>dropped(e,item?.id)}
        className='bg-dark p-2 mt-2 me-5 w-75'>
          <h4 className='ms-3 text-light'><b>{item?.name}</b><span className='float-end me-2'> <Trash2 onClick={()=>deleteCat(item?.id)} color='red' ></Trash2>
          </span></h4>

          <Row>
            {item?.allVideos.map(i=>(
              <Col>
              <Videocard incard={true} video={i}></Videocard>
              </Col>
            ))}
          </Row>
        </div>
        
        
      ))
    

      }
      </div>


      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>


          <FloatingLabel
            controlId="floatingInput"
            label="category name"
            className="mb-3"
          >
            <Form.Control type="textarea" onChange={setCategory} name="name" />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd2}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );


}

export default Category