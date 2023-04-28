import { Product } from "src/_shared/sharedTypes";
import { default as CardFlip } from "react-card-flip";
import { Col, Row } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { AddToCartButton } from "src/_shared/AddToCartButton";
import { applyDiscount, globalDiscount } from "src/_shared/pricing";

interface IProductCardProps {
  product: Product;
}

export const ProductCard = (props: IProductCardProps): JSX.Element => {
  const { product } = props;

  const [swapPrice, setSwapPrice] = useState<boolean>(false);

  return (
    <div
      className="card my-2 shadow-sm"
      onMouseEnter={() => {
        setSwapPrice(true);
      }}
      onMouseLeave={() => {
        setSwapPrice(false);
      }}>
      <Link to={`${product?.ProductUrl}`}>
        <img
          src={product?.ImageUrl}
          className="card-img-top"
          alt="..."
        />
      </Link>
      <div className="card-body">
        <h6 className="card-title py-2 fw-light">{product?.Name}</h6>
        <CardFlip
          isFlipped={swapPrice}
          flipSpeedFrontToBack={0.7}
          flipDirection="vertical">
          <Col
            key="front"
            className="add-btn-swap text-start text-secondary">
            <Row className="">
              {applyDiscount ? (
                <Col className="text-center">
                  <span className="card-text">${(product?.Price * globalDiscount).toFixed(2)}</span>
                </Col>
              ) : null}
              <Col className={"text-center text-secondary"}>
                <span className={`${applyDiscount ? "text-decoration-line-through" : ""} card-text`}>
                  ${product?.Price.toFixed(2)}
                </span>
              </Col>
            </Row>
          </Col>
          <Col
            key="back"
            className="">
            <AddToCartButton
              product={product}
              buttonClass="btn-product-card"
            />
          </Col>
        </CardFlip>
      </div>
    </div>
  );
};
