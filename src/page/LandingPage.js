import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';



function LandingPage() {
  return (
    <Container>
    <Row>
        <Col>
<h1>Easy Video Uploader</h1>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam minima placeat dolorem cum assumenda ipsum? Nam exercitationem aut dolorum et recusandae suscipit, quod cumque animi. Non sequi vero veniam quia?

</p>
<Link to={'./home'}>
<Button variant="danger">View More</Button>
</Link>


</Col>
<Col>
<img src="https://i.postimg.cc/Fs0pj6nz/Media-Video-Player-PNG-Free-Download.png" alt="" />
</Col>
</Row>
</Container>
  )
}

export default LandingPage