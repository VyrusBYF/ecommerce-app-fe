import { ReactNode, useState } from "react";
import { Button, Card, Carousel, Col, Container, Form, Row } from "react-bootstrap";
import brand from "src/_shared/brand";
import { ProductCard } from "src/Shopping/Product/ProductCard";
import { CatalogViews, Product } from "src/_shared/sharedTypes";
import Products from "src/_shared/Products.json";
import { useNavigate } from "react-router";

export const Home = (): JSX.Element => {
  // Temporary setup until database is done.
  const [products, setProducts] = useState<Product[]>(Products.slice(0, 8));
  const navigate = useNavigate();

  const placeholderCategories: ReactNode[] = [...new Array(3)].fill(
    <Col
      xs={12}
      md={3}>
      <Card
        className="my-3 mx-auto shadow-sm"
        onClick={() => navigate("/shop")}>
        <Card.Img
          className=""
          src="media/assets-product-img.png"
        />
        <Card.ImgOverlay>
          <Card.Text className="position-absolute bottom-0 start-0 end-0 fs-5">Category</Card.Text>
        </Card.ImgOverlay>
      </Card>
    </Col>,
    0,
    3
  );

  const carouselItems: { label: string; desc: string; imgLink: string }[] = [
    {
      label: "First slide",
      desc: "Nulla vitae elit libero, a pharetra augue.",
      imgLink: "media/assets-casual-long.jpg"
    },
    {
      label: "Second slide",
      desc: "Nulla vitae elit libero, a pharetra augue.",
      imgLink: "media/assets-suit-long.jpg"
    },
    {
      label: "Third slide",
      desc: "Nulla vitae elit libero, a pharetra augue.",
      imgLink: "media/assets-dress-long.jpg"
    },
    {
      label: "Fourth slide",
      desc: "Nulla vitae elit libero, a pharetra augue.",
      imgLink: "media/assets-shoes-long.jpg"
    }
  ];

  return (
    <div>
      <Container className="mx-auto">
        <Row>
          <Carousel
            className=""
            interval={3500}
            controls={false}>
            {carouselItems.map((item, id) => (
              <Carousel.Item
                className=""
                key={id}>
                <div className="img-overlay-container">
                  <img
                    className="img-fluid"
                    src={item.imgLink}
                    alt={item.label}
                  />
                </div>
                <Carousel.Caption className="">
                  <h3>{`${item.label} label`}</h3>
                  <p>{item.desc}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Row>
      </Container>
      <Container>
        <div className="mt-5 mx-5">
          <Row>
            <Col
              md={4}
              className="p-0 mx-auto">
              <h3>Popular Categories</h3>
            </Col>
          </Row>
        </div>
        <Row className="d-flex justify-content-center">{placeholderCategories.map(cat => cat)}</Row>
      </Container>
      <Container>
        <div className="mt-5">
          <Row>
            <Col>
              <hr />
            </Col>
            <Col
              md={4}
              xs={8}
              className="p-0">
              <h3>Trending Products</h3>
            </Col>
            <Col>
              <hr />
            </Col>
          </Row>
          <p>Mirum est notare quam littera gothica quam nunc putamus parum claram!</p>
        </div>
        <Row>
          <Col
            xs={12}
            sm={6}
            md={12}
            lg={6}
            className="">
            <ProductCard
              product={products[0]}
              view={CatalogViews.default}
            />
          </Col>
          <Col>
            <Row>
              {products?.slice(1, products.length - 1).map(
                (product, id): JSX.Element => (
                  <Col
                    xs={12}
                    sm={4}
                    key={id + 1}>
                    <ProductCard
                      product={product}
                      view={CatalogViews.default}
                    />
                  </Col>
                )
              )}
            </Row>
          </Col>
        </Row>
      </Container>
      <Container className="pt-5">
        <Col className="py-5 border-top">
          <Row>
            <Col>
              <h1 className="py-5">Get Discount Updates</h1>
              <p>
                Subscribe to our <span className="fw-bold fst-italic">{brand.Name}</span>&apos;s mailing list and
                receive updates on new arrivals, special offers and other promotional events
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form>
                <Form.Group>
                  <Form.Label className="mt-5 fst-italic">Subscribe to our newsletter!</Form.Label>
                  <Form.Control
                    className="border-underline footer-input mx-auto text-center"
                    placeholder="Email"
                    type="email"
                  />
                </Form.Group>
                <Button
                  variant="outline-dark"
                  type="submit"
                  className="mt-5 button-font px-5">
                  SUBSCRIBE
                </Button>
              </Form>
            </Col>
          </Row>
        </Col>
      </Container>
    </div>
  );
};
