import { CatalogViews, Product } from "src/_shared/sharedTypes";
import { default as CardFlip } from "react-card-flip";
import { Col, Row } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { AddToCartButton } from "src/_shared/Buttons/AddToCartButton";
import { applyDiscount, globalDiscount } from "src/_shared/pricing";
import { ShareButton } from "src/_shared/Buttons/ShareButton";
import { WishlistButton } from "src/_shared/Buttons/WishlistButton";
import { TextCompress } from "src/_shared/TextCompress";

interface IProductCardProps {
  product: Product;
  view: CatalogViews;
}

export const ProductCard = (props: IProductCardProps): JSX.Element => {
  const { product, view } = props;

  const [swapPrice, setSwapPrice] = useState<boolean>(false);

  const cardDisplay = (): JSX.Element => {
    switch (view) {
      case "detailed": {
        return (
          <Row>
            <Col
              xs={12}
              sm={5}
              className="my-auto">
              <Link to={`${product?.ProductUrl}`}>
                <img
                  src={product?.ImageUrl}
                  className="img-fluid"
                  alt="..."
                />
              </Link>
            </Col>
            <Col className="m-3">
              <div className="">
                <Row className="my-2">
                  <Col>
                    <h6 className="card-title mt-2 mt-sm-0 fw-semibold text-start">{product?.Name}</h6>
                  </Col>
                </Row>
                <Row className="mb-2">
                  {applyDiscount ? (
                    <Col
                      xs={4}
                      sm={3}
                      className="text-start">
                      <span className="card-text">${(product?.Price * globalDiscount).toFixed(2)}</span>
                    </Col>
                  ) : null}
                  <Col
                    xs={4}
                    sm={3}
                    className={"text-center text-secondary"}>
                    <span className={`${applyDiscount ? "text-decoration-line-through" : ""} card-text`}>
                      ${product?.Price.toFixed(2)}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextCompress
                      text={product?.Description}
                      textClasses="text-start"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col
                    className="my-2 text-sm-start"
                    xs={12}
                    sm={5}>
                    <hr className="d-sm-none" />
                    <AddToCartButton
                      product={product}
                      buttonClass="btn btn-dark rounded-0 w-100"
                    />
                  </Col>
                  <Col
                    xs={12}
                    sm={6}
                    className="my-auto">
                    <Row className="">
                      <Col
                        xs={6}
                        sm={4}
                        className="">
                        <ShareButton />
                      </Col>
                      <Col
                        xs={6}
                        sm={4}
                        className="">
                        <WishlistButton />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        );
      }
      default: {
        return (
          <>
            <Link to={`${product?.ProductUrl}`}>
              <img
                src={product?.ImageUrl}
                className="img-fluid w-100"
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
          </>
        );
      }
    }
  };

  return (
    <div
      className="card my-2 shadow-sm"
      onMouseEnter={() => {
        setSwapPrice(true);
      }}
      onMouseLeave={() => {
        setSwapPrice(false);
      }}>
      {cardDisplay()}
    </div>
  );
};
