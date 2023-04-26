import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ErrorPage = (): JSX.Element => (
  <Container className="bg-white">
    <Col>
      <Row>
        <Col>
          <img
            className="img-fluid"
            src="/media/assets-page-error.jpg"
            alt=""
          />
        </Col>
      </Row>
      <Row className="m-5">
        <Col>
          <p>Page Not Found</p>
          <h1>{"You Didn't See Anything"}</h1>
        </Col>
      </Row>
      <Row className="m-5">
        <Col>
          The page you are looking for does not exist. You can head to the homepage <Link to="/">here</Link>
        </Col>
      </Row>
    </Col>
  </Container>
);
