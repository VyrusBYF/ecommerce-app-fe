import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { Banner } from "src/_shared/Banner";
import { Product } from "src/_shared/sharedTypes";
import Products from "src/_shared/Products.json";
import { RWebShare } from "react-web-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { AddToCartButton } from "src/_shared/AddToCartButton";
import { applyDiscount, globalDiscount } from "src/_shared/pricing";
import { QuantityModifier } from "src/_shared/QuantityModifier";

export const ProductDetailsPage = (): JSX.Element => {
  const { productID } = useParams();
  const initialProduct: Product = {
    Name: "",
    Category: "",
    ImageUrl: "",
    Price: 0,
    ProductID: 0,
    ProductUrl: ""
  };
  const [currentProduct, setCurrentProduct] = useState<Product>(initialProduct);

  useEffect(() => {
    setCurrentProduct(Products.find(product => product.ProductID.toString() === productID));
  }, []);

  return (
    <>
      <Banner title="Product Details" />
      <Container
        className="py-4 bg-white"
        fluid>
        <Container>
          <Row>
            <Col
              xs={12}
              md={6}
              className="p-2">
              <img
                className="img-fluid"
                src={currentProduct?.ImageUrl}
                alt="product"
              />
            </Col>
            <Col className="text-start">
              <Row>
                <Col
                  xs={12}
                  className="py-2">
                  <span className="title-text">{currentProduct?.Name}</span>
                  <br />
                  <p>
                    {applyDiscount ? (
                      <span className="card-text pe-2">
                        ${(currentProduct?.Price * (1 - globalDiscount)).toFixed(2)}
                      </span>
                    ) : null}
                    <span className={`${applyDiscount ? "text-decoration-line-through" : ""} card-text`}>
                      ${currentProduct?.Price.toFixed(2)}
                    </span>
                  </p>
                </Col>
                <hr className="" />
                <Col xs={12}>
                  <p>{currentProduct?.Description}</p>
                </Col>
                <hr />
                <Col
                  xs={12}
                  className="py-2">
                  <Row>
                    <Col md={6}>
                      <Row>
                        <Col
                          xs={3}
                          className="my-auto">
                          <span>Quantity:</span>
                        </Col>
                        <Col>
                          <QuantityModifier />
                        </Col>
                      </Row>
                    </Col>
                    <Col md={4}>
                      <AddToCartButton
                        product={currentProduct}
                        buttonClass="btn btn-outline-dark"
                      />
                    </Col>
                  </Row>
                </Col>
                <Col
                  xs={12}
                  className="py-2">
                  <RWebShare
                    data={{
                      text: "Web Share - GfG",
                      url: window.location.href,
                      title: "GfG"
                    }}>
                    <span>
                      Share:
                      <FontAwesomeIcon
                        className="ms-2"
                        icon={faShareNodes as IconProp}
                      />
                    </span>
                  </RWebShare>
                </Col>
                <Col
                  xs={12}
                  className="py-2">
                  <p>
                    Categories: <strong>{currentProduct?.Category}</strong>
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};