import React from 'react'
import { Video } from 'react-feather'


function Header() {
  return (
    <div className='bg-secondary' style={{}}>
        <h1 id='head'><Video color='red'></Video><span style={{color:'red'}}>Video</span>.Com </h1>
       
    </div>
  )
}

export default Header