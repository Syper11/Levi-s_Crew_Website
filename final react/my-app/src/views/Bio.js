import React from 'react';
import BioPic from '../helper/BioPic';
import { Card, Container, Row, Col } from 'react-bootstrap';

export default function Bio() {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card >
            <Card.Img
              variant="top"
              src={BioPic[0].image}
              alt="Levi Fish"
              style={{ maxWidth: '675px', maxHeight: "900px" }} // Add this line to set the max width of the image
            />
            <Card.Body>
              <Card.Text className="card-text">
                Levi was born with two congenital heart conditions that were discovered when he was 5 months.
                First, his aorta (the main artery in the heart) was narrow in the middle, shaped like an hourglass,
                and inhibiting blood flow. Second, the ventricles of his heart, and their associated arteries and veins, were "flip-flopped," opposite of where they should be in a normal heart.
                Doctors were able to repair the aorta, cutting out the weakened middle part and splicing together the two larger-diameter ends.
                But repairing the flipped-flopped heart chambers was a little trickier, and levi had to be strong enough to survive the major open-heart surgery.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
