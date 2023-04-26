import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useShoppingCart } from "src/Shopping/Cart/ShoppingCartProvider";
import { CartDetails } from "src/Shopping/Cart/CartDetails";
import brand from "src/_shared/brand";

export const Header = (): JSX.Element => {
  const location = useLocation();
  const cart = useShoppingCart();

  const siteLinks: { Name: string; Link: string; onClick?: MouseEventHandler<HTMLElement> }[] = [
    { Name: "Shop", Link: "/shop" },

    { Name: "Wishlist", Link: "/wishlist" },
    {
      Name: "Contact",
      Link: "",
      onClick: () => {
        const element = document.getElementById("footer");
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  ];
  return (
    <Navbar
      bg="dark"
      className="w-100 sticky-top"
      expand="lg"
      variant="dark">
      <Container>
        <Navbar.Brand
          className="fs-18 my-auto"
          href="/">
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
                    className="p-3"
                    href={`${process.env.PUBLIC_URL}${item.Link}`}
                    active={location.pathname.includes(item.Name.toLowerCase())}
                    onClick={item.onClick ?? null}
                    key={id}>
                    {item.Name}
                  </Nav.Link>
                ))
              : null}
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
            <Nav.Item className="py-3 my-auto text-light navbar-expand-lg">
              {/* <span className="m-3">
                <FontAwesomeIcon
                  className="me-2"
                  icon={faMagnifyingGlass as IconProp}
                />
                Search
              </span> */}
              <span
                className="m-3"
                onClick={() => cart.showToggle()}>
                <FontAwesomeIcon
                  className="me-2"
                  icon={faShoppingBag}
                />
                {`Cart (${cart.cartItems.length ?? 0})`}
              </span>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <CartDetails />
    </Navbar>
  );
};
