import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useShoppingCart } from "src/Shopping/Cart/ShoppingCartProvider";
import { CartDetails } from "src/Shopping/Cart/CartDetails";
import brand from "src/_shared/brand";

export const Header = (): JSX.Element => {
  const location = useLocation();
  const cart = useShoppingCart();

  const siteLinks: { Name: string; Link: string; onClick?: MouseEventHandler<HTMLElement> }[] = [
    { Name: "Shop", Link: "/shop" },
    { Name: "Wishlist", Link: "/wishlist" }
  ];
  return (
    <Navbar
      bg="dark"
      className="w-100 sticky-top"
      collapseOnSelect
      expand="sm"
      variant="dark">
      <Container>
        <Navbar.Brand
          className="fs-18 my-auto"
          href="/ecommerce-app-fe">
          <img
            alt="Your Logo"
            src="media/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          {brand.Name}
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mx-auto">
            {siteLinks
              ? siteLinks.map((item, id) => (
                  <Nav.Link
                    as={Link}
                    className="p-3"
                    to={`${item.Link}`}
                    active={location.pathname.includes(item.Name.toLowerCase())}
                    onClick={item.onClick ?? null}
                    eventKey={id}
                    key={id}>
                    {item.Name}
                  </Nav.Link>
                ))
              : null}
            <Nav.Link
              className="p-3"
              href=""
              active={location.pathname.includes("contact")}
              onClick={() => {
                const element = document.getElementById("footer");
                element.scrollIntoView({ behavior: "smooth" });
              }}>
              {"Contact"}
            </Nav.Link>
            {/* <Row className="">
              <Col>
                <Nav.Link
                  className="p-3"
                  href="/login">
                  Login
                </Nav.Link>
              </Col>
              <Col>
                <Nav.Link
                  className="p-3"
                  href="/Register">
                  Register
                </Nav.Link>
              </Col>
            </Row> */}
          </Nav>
          <Nav>
            <Nav.Link
              as={Link}
              to={null}
              eventKey={siteLinks?.length + 1}
              className="py-3 my-auto text-light navbar-expand-lg">
              {/* <span className="m-3">
                <FontAwesomeIcon
                  className="me-2"
                  icon={faMagnifyingGlass as IconProp}
                />
                Search
              </span> */}
              <span
                className="m-3"
                onClick={() => {
                  cart.showToggle();
                }}>
                <FontAwesomeIcon
                  className="me-2"
                  icon={faShoppingBag}
                />
                {`Cart (${cart.cartItems.length ?? 0})`}
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <CartDetails />
    </Navbar>
  );
};
