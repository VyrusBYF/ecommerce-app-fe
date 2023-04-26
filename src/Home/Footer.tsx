import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import brand from "../_shared/brand";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLocationDot, faMapMarker, faPhone, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { RWebShare } from "react-web-share";

export const Footer = (): JSX.Element => {
  const num = 0;
  return (
    <footer
      className="py-5 footer text-bg text-light mt-auto"
      id="footer">
      <Container className="py-5 ">
        <Row>
          <Col
            id="footer-brand-info"
            md={6}
            xs={12}
            className="text-start mb-5">
            <Row className="pb-3">
              <Col>
                <h5 className="pb-2 fw-bold">{brand.Name}</h5>
                <p>{brand.Description}</p>
              </Col>
            </Row>
            <Row className="footer-text">
              <Col
                md={12}
                className="text-start">
                <FontAwesomeIcon icon={faLocationDot as IconProp} />
                <span className="ps-3">{brand.Address}</span>
              </Col>
              <Col
                md={12}
                className="text-start">
                <FontAwesomeIcon icon={faEnvelope as IconProp} />
                <span className="ps-3">{brand.Email}</span>
              </Col>
              <Col
                md={12}
                className="text-start">
                <FontAwesomeIcon icon={faPhone as IconProp} />
                <span className="ps-3">Phone Number: (###) ###-####</span>
              </Col>
            </Row>
          </Col>
          <Col
            id="footer-information"
            md={3}
            xs={6}
            className="text-start">
            <Row>
              <Col>
                <h6 className="pb-2">Information</h6>
              </Col>
            </Row>
            <Row className="footer-text">
              <Col xs={12}>
                <p>About Us</p>
              </Col>
              <Col xs={12}>
                <p>Careers</p>
              </Col>
              <Col xs={12}>
                <p>Delivery Options</p>
              </Col>
              <Col xs={12}>
                <p>Privacy Policy</p>
              </Col>
              <Col xs={12}>
                <p>Terms &amp; Conditions</p>
              </Col>
            </Row>
          </Col>
          <Col
            id="footer-customer-service"
            md={3}
            xs={6}
            className="text-start">
            <Row>
              <Col>
                <h6 className="pb-2">Customer Service</h6>
              </Col>
            </Row>
            <Row className="footer-text">
              <Col xs={12}>
                <p>Shipping Policy</p>
              </Col>
              <Col xs={12}>
                <p>Help &amp; Contact Us</p>
              </Col>
              <Col xs={12}>
                <p>Returns &amp; Refunds</p>
              </Col>
              <Col xs={12}>
                <p>Online Stores</p>
              </Col>
              <Col xs={12}>
                <p>Terms &amp; Conditions</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <hr />
      <Container>
        <Row className="text-start pt-4">
          <Col md={9}>
            <p>
              Copyright ©️
              <strong>
                <em>{brand.Name} </em>
              </strong>
              all rights reserved.
            </p>
          </Col>
          <Col>
            <Row className="d-flex justify-content-start w-75">
              <Col xs={1}>
                <a href="https://www.twitter.com">
                  <FontAwesomeIcon icon={faTwitter as IconProp} />
                </a>
              </Col>
              <Col xs={1}>
                <a href="https://www.facebook.com">
                  <FontAwesomeIcon icon={faFacebook as IconProp} />
                </a>
              </Col>
              <Col xs={1}>
                <a href="https://www.instagram.com">
                  <FontAwesomeIcon icon={faInstagram as IconProp} />
                </a>
              </Col>
              <Col xs={1}>
                <RWebShare
                  data={{
                    text: "Web Share - GfG",
                    url: window.location.href,
                    title: "GfG"
                  }}>
                  <FontAwesomeIcon
                    className="text-primary"
                    onClick={() => console.log("Shared Successfully!")}
                    icon={faShareNodes as IconProp}
                  />
                </RWebShare>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
