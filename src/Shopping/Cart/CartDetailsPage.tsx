import { Button, Col, Container, Row } from "react-bootstrap";
import { useShoppingCart } from "./ShoppingCartProvider";
import { faCircleCheck, faFileLines, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QuantityModifier } from "src/_shared/QuantityModifier";
import { applyDiscount, globalDiscount } from "src/_shared/pricing";
import { useNavigate } from "react-router";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { RWebShare } from "react-web-share";

export const CartDetailsPage = (): JSX.Element => {
  const cart = useShoppingCart();
  const navigate = useNavigate();

  return (
    <Container
      className="py-4 bg-white text-start min-vh-100"
      fluid>
      <Container className="border">
        {cart?.isCartEmpty ? (
          <Col className="text-center">
            <p className="mt-4">Your cart is empty...</p>
          </Col>
        ) : (
          <Col className="">
            {cart.cartItems.length > 0
              ? cart.cartItems.map((item, id) => (
                  <>
                    <Row
                      key={id}
                      id={`cart-details-${id}`}
                      className="p-3">
                      <Col
                        xs={12}
                        sm={5}>
                        <img
                          className="img-fluid"
                          src={item.ImageUrl}
                          alt={item.Name}
                        />
                      </Col>
                      <Col>
                        <Row className="py-2">
                          <Col
                            xs={6}
                            sm={4}
                            className="my-auto">
                            <span className="fs-18 fw-semibold">{item.Name}</span>
                          </Col>
                          <Col
                            xs={6}
                            sm={4}
                            className="text-center my-auto">
                            <span>{`Price: $${(item.Price * (applyDiscount ? globalDiscount : 1)).toFixed(2)}`}</span>
                          </Col>
                          <Col
                            xs={12}
                            sm={4}
                            className="mt-3 mt-sm-0 ">
                            <QuantityModifier productID={item.ProductID} />
                          </Col>
                        </Row>
                        <Row className="py-1">
                          <Col className="mt-3">
                            <p>{item.Description}</p>
                          </Col>
                        </Row>
                        <Row className="py-1">
                          <Col>
                            <span>{`Categories: ${item.Category}`}</span>
                          </Col>
                        </Row>
                        <Row className="mt-3">
                          <Col
                            className="text-center"
                            xs={2}
                            sm={1}>
                            <FontAwesomeIcon icon={faFileLines} />
                          </Col>
                          <Col
                            className="text-center"
                            xs={2}
                            sm={1}>
                            <FontAwesomeIcon icon={faHeart as IconProp} />
                          </Col>
                          <Col
                            className="text-center"
                            xs={2}
                            sm={1}>
                            <FontAwesomeIcon icon={faCircleCheck} />
                          </Col>
                          <Col
                            className="text-center"
                            xs={2}
                            sm={1}>
                            <RWebShare
                              data={{
                                text: "Web Share - GfG",
                                url: window.location.href,
                                title: "GfG"
                              }}>
                              <FontAwesomeIcon
                                className=""
                                onClick={() => console.log("Shared Successfully!")}
                                icon={faShareNodes as IconProp}
                              />
                            </RWebShare>
                          </Col>
                        </Row>
                        <Row className="mt-5">
                          <Col>
                            <Button
                              onClick={() => {
                                cart.removeFromCart(item.ProductID);
                                if (id > 0) {
                                  document
                                    .getElementById(`cart-details-${id - 1}`)
                                    .scrollIntoView({ behavior: "smooth" });
                                } else {
                                  window.scrollTo(0, 0);
                                }
                              }}
                              variant="danger">
                              Remove Item
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Col>
                      <hr />
                    </Col>
                  </>
                ))
              : null}
          </Col>
        )}
        <Col className="text-center py-3">
          {cart.isCartEmpty ? (
            <Button
              className="w-80"
              variant="dark"
              onClick={() => {
                navigate("/shop", { replace: true });
              }}>
              Continue Shopping
            </Button>
          ) : (
            <Button
              className="w-80"
              variant="dark"
              onClick={() => {
                navigate("/checkout", { replace: true });
              }}>
              Checkout
            </Button>
          )}
        </Col>
      </Container>
    </Container>
  );
};
