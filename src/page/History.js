import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Table from 'react-bootstrap/Table';
import { getHistory } from '../service/allApis';



function History() {

    const[history,setHistory]=useState([])

    const getAllHistory=async()=>{
        const response=await getHistory()
        setHistory(response.data);
    }

    useEffect(()=>{
        getAllHistory()

    },[])
    // console.log(history);

  return (
    <div>
        <Container>
            <h2 className='text-center p-3'>Video Watch History</h2>
        <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th className='text-success'>#</th>
          <th className='text-success'>Video Title</th>
          <th className='text-success'>URL</th>
          <th className='text-success'>Date</th>
        </tr>
      </thead>
      <tbody>
        {history.length >0 ?history.map((i,index)=>(
            <tr>
            <td>{index+1}</td>
            <td>{i?.cardName}</td>
            <td>{i?.url}</td>
            <td>{i?.date}</td>
          </tr>

        )):(<h1>No Data</h1>)
        
        }
       
        
      </tbody>
    </Table>
    </Container>
  

    </div>
  )
}

export default History