// import React from 'react'
// import { Container,Row,Col } from 'react-bootstrap';
// import Category from '../components/Category';
// import Add from '../components/Add';
// import View from '../components/View';

// function Home() {
//   return (
//     <div>
//       <header className="my-5 text-center">All Video Cards</header>
//       <Container>
//         <Row className='text-center'>
//           <Col lg={1}>
//             <Add/>
//           </Col>
//           <Col lg={7}>
//             <View/>
//           </Col>
//           <Col lg={4}>
//             <Category/>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   )
// }

// export default Home


import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import View from '../components/View'
import Add from '../components/Add'
import Category from '../components/Category'
import { Link } from 'react-router-dom'



function Home() {
  const [addUpdate, SetAddUpdate] = useState({})

  return (
    <div>
      <div>
        <Link to={"/watch-history"} style={{ textDecoration: 'none' }}>
          <h3 className='text-info mt-3 ms-5 fs-4 p-3'>Check watch history
            <i class="fa-regular ms-2 mt-1 fa-clock fa-spin"></i></h3>
        </Link>
      </div>
      <Container>
        <Row className='text-center'>
          <Col lg={2}>
            <Add SetAddUpdate={SetAddUpdate}></Add>

          </Col>
          <Col lg={6}>
            <View addUpdate={addUpdate}></View>
          </Col>
          <Col lg={4}>
            <Category></Category>
          </Col>
        </Row>
      </Container>


    </div>
  )
}

export default Home
