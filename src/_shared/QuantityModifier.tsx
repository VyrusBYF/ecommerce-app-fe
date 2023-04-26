import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useShoppingCart } from "src/Shopping/Cart/ShoppingCartProvider";

interface IQuantityModifierProps {
  productID?: number;
}

export const QuantityModifier = (props: IQuantityModifierProps): JSX.Element => {
  const { productID } = props;
  const [quantity, setQuantity] = useState<number>(1);

  const cart = useShoppingCart();
  useEffect(() => {
    if (productID >= 0) {
      setQuantity(cart.getItemQuantity(productID));
    }
  }, []);
  return (
    <Row className="">
      <Col className="d-flex justify-content-center">
        <Button
          variant="dark"
          size="sm"
          onClick={() => {
            setQuantity(quantity + 1);
            if (productID >= 0) {
              cart.increaseItemQuantity(productID);
            }
          }}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        <input
          className="w-100 mx-1 rounded border border-1 border-dark text-center"
          type="text"
          value={quantity}
        />
        <Button
          variant="dark"
          size="sm"
          onClick={() => {
            if (quantity > 1) {
              setQuantity(quantity - 1);
              if (productID >= 0) {
                cart.decreaseItemQuantity(productID);
              }
            }
          }}>
          <FontAwesomeIcon icon={faMinus} />
        </Button>
      </Col>
    </Row>
  );
};
