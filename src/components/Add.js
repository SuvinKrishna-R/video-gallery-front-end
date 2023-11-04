import React from "react";
import { MdAddTask, MdPlaylistAdd } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import uniqid from 'uniqid'
import { addVideo } from "../service/allApis";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Add({SetAddUpdate}) {

  //state for store input data
  const [uploadData, setUploadData] = useState({
    id: "",
    caption: "",
    thumbnail: "",
    url: ""
  })

  //function to take the input data
  const setInput = (e) => {
    // console.log(e.target.value);
    // let value=e.target.value
    let { name, value } = e.target
    //update the key value with the existing object
    setUploadData({ ...uploadData, [name]: value })

  }

  const extractUrl = (e) => {
    let videoUrl = e.target.value

    //check the url contain v=
    if (videoUrl.includes("v=")) {
      let index = videoUrl.indexOf("v=")
      let extractUrl = videoUrl.substring(index + 2, index + 13)//
      // console.log(extractUrl);
      // console.log(index);

      //make full url
      let fullUrl = `https://www.youtube.com/embed/${extractUrl}`

      //update with uploadData
      setUploadData({ ...uploadData, [e.target.name]: fullUrl })


    }

  }

  //function to add
  const handleAdd = async () => {
    let id = uniqid()
    // console.log(uniqid());
    setUploadData({ ...uploadData, ["id"]: id })

    //validation
    const { caption, thumbnail, url } = uploadData
    if (caption == "") {
     
      toast.warn("Please input caption", {
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
    else if (thumbnail == "") {
      toast.warn("Please input thumbnail", {
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
    else if (url == "") {
      toast.warn("Please input url", {
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
      const result = await addVideo(uploadData)
      if (result.status >= 200 && result.status < 300) {
        SetAddUpdate(result.data)
        toast.success("Video added", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        setShow(false)//to close the modal
      }

    }


  }

  console.log(uploadData);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <label>Add</label>
      <MdAddTask />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <MdPlaylistAdd
          size={"5rem"}
          style={{ margin: "0rem 0rem" }}
          variant="primary"
          onClick={handleShow}
        />
      </div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>


          <FloatingLabel
            controlId="floatingInput"
            label="Video Caption"
            className="mb-3"
          >
            <Form.Control name='caption' onChange={setInput} type="textarea" />
          </FloatingLabel>


          <FloatingLabel
            controlId="floatingInput"
            label="Video Cover Image Url"
            className="mb-3"
          >
            <Form.Control name='thumbnail' onChange={setInput} type="textarea" />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Youtube Video Url"
            className="mb-3"
          >
            <Form.Control name="url" onChange={extractUrl} type="textarea" />
          </FloatingLabel>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add
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
  );
}

export default Add;