import { Button, Offcanvas } from "react-bootstrap";
import Products from "src/_shared/Products.json";
import { useShoppingCart } from "./ShoppingCartProvider";

export const Cart = (): JSX.Element => {
  const products = [...Products];
  const cart = useShoppingCart();

  return (
    <Offcanvas
      show={false}
      placement="end">
      <Offcanvas.Header>Cart</Offcanvas.Header>
      <Offcanvas.Body>
        <Button
          variant="success"
          onClick={() => cart.addToCart(products[0])}>
          Add To Cart
        </Button>
        <Button
          variant="danger"
          onClick={() => cart.removeFromCart(products[0].ProductID)}>
          Remove From Cart
        </Button>
        <Button
          variant="info"
          onClick={() => cart.increaseItemQuantity(products[0].ProductID)}>
          Increase Quantity
        </Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
