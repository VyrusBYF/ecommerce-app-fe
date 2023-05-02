import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useShoppingCart } from "src/Shopping/Cart/ShoppingCartProvider";
import { Product } from "../sharedTypes";
import { toast } from "react-toastify";

interface IAddToCartProps {
  product: Product;
  buttonClass: string;
}

export const AddToCartButton = (props: IAddToCartProps): JSX.Element => {
  const { product, buttonClass } = props;
  const cart = useShoppingCart();

  return (
    <button
      className={buttonClass}
      onClick={() => {
        cart.addToCart(product);
      }}>
      + Add to Cart
    </button>
  );
};
