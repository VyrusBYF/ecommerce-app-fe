import { Button, Col, Offcanvas, Row } from "react-bootstrap";
import { useShoppingCart } from "./ShoppingCartProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { applyDiscount, globalDiscount } from "src/_shared/pricing";
import { QuantityModifier } from "src/_shared/QuantityModifier";

export const CartDetails = (): JSX.Element => {
  const cart = useShoppingCart();
  const navigate = useNavigate();

  return (
    <Offcanvas
      placement="end"
      show={cart?.showCart}>
      <Row
        className="d-flex align-content-center"
        onClick={() => cart?.showToggle()}>
        <Col className="">
          <Button className="w-100 border-0 rounded-0 bg-dark py-3">
            <div>
              <span className="">Close</span>
              <FontAwesomeIcon
                className="ms-2 text-danger fs-14"
                icon={faMultiply}
              />
            </div>
          </Button>
        </Col>
      </Row>
      {cart?.cartItems.length > 0 ? (
        <Col
          className=""
          style={{ overflowY: "scroll" }}>
          {cart.cartItems.length > 0
            ? cart.cartItems.map((item, id) => (
                <>
                  <Row
                    key={id}
                    className="p-3">
                    <Col xs={5}>
                      <img
                        className="img-fluid"
                        src={item.ImageUrl}
                        alt={item.Name}
                      />
                    </Col>
                    <Col>
                      <Row>
                        <Col>
                          <span className="fs-18 fw-semibold">{item.Name}</span>
                          <FontAwesomeIcon
                            className="text-danger ms-4 fs-18"
                            onClick={() => cart.removeFromCart(item.ProductID)}
                            icon={faMultiply}
                          />
                        </Col>
                      </Row>
                      <Row className="py-2">
                        <Col className="">
                          <span>{`Price: $${(item.Price * (applyDiscount ? globalDiscount : 1)).toFixed(2)}`}</span>
                        </Col>
                        {/* <Col>
                          <span>{`Qty: ${item.Quantity}`}</span>
                        </Col> */}
                      </Row>
                      <Row className="mt-3">
                        <Col xs={10}>
                          <QuantityModifier productID={item.ProductID} />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <hr />
                </>
              ))
            : null}
        </Col>
      ) : (
        <Col className="text-center">
          <p className="mt-4">Your cart is empty...</p>
        </Col>
      )}
      {cart.cartItems.length > 0 ? (
        <Row className="px-4 pb-4">
          <Col
            xs={6}
            className="fs-18 text-end">
            <span>
              <strong>Order Subtotal:</strong>
            </span>
          </Col>
          <Col className="fs-18">
            <span>
              <strong>
                {`$${cart.cartItems
                  .map(({ Price, Quantity }) => Price * (applyDiscount ? globalDiscount : 1) * Quantity)
                  .reduce((accumulator, currentValue) => accumulator + currentValue)
                  .toFixed(2)}`}
              </strong>
            </span>
          </Col>
        </Row>
      ) : null}
      <Row className="p-3">
        <Col>
          <Row className="">
            <Col className="d-flex justify-content-center">
              <Button
                className="w-80"
                variant="outline-dark"
                onClick={() => {
                  navigate("/cart", { replace: true });
                  cart.showToggle();
                }}>
                View Cart
              </Button>
            </Col>
          </Row>
          <Row className="py-3">
            <Col className="d-flex justify-content-center">
              {cart.isCartEmpty ? (
                <Button
                  className="w-80"
                  variant="dark"
                  onClick={() => {
                    navigate("/shop", { replace: true });
                    cart.showToggle();
                  }}>
                  Continue Shopping
                </Button>
              ) : (
                <Button
                  className="w-80"
                  variant="dark"
                  onClick={() => {
                    navigate("/checkout", { replace: true });
                    cart.showToggle();
                  }}>
                  Checkout
                </Button>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Offcanvas>
  );
};
