import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Banner } from "src/_shared/Banner";
import { TextInputFormGroup } from "src/_shared/FormGroups/TextInputFormGroup";
import { applyDiscount, globalDiscount } from "src/_shared/pricing";
import { useState } from "react";
import { TextAreaFormGroup } from "src/_shared/FormGroups/TextAreaFormGroup";
import { useShoppingCart } from "./Cart/ShoppingCartProvider";

interface ICheckoutDetails {
  // Billing details
  billingCompanyName: string;
  billingCountry: string;
  billingEmail: string;
  billingFirstName: string;
  billingLastName: string;
  billingPhone: string;
  billingState: string;
  billingStreetAddress: string;
  billingStreetAddressExtra?: string;
  billingTown: string;
  billingZip: string;
  // Shipping details
  shippingCompanyName?: string;
  shippingCountry?: string;
  shippingEmail?: string;
  shippingFirstName?: string;
  shippingLastName?: string;
  shippingPhone?: string;
  shippingState?: string;
  shippingStreetAddress?: string;
  shippingStreetAddressExtra?: string;
  shippingTown?: string;
  shippingZip?: string;

  orderNotes?: string;
}

export const Checkout = (): JSX.Element => {
  const [shippingDetails, setShippingDetails] = useState<boolean>(false);

  const cart = useShoppingCart();
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    register
  } = useForm<ICheckoutDetails>({
    criteriaMode: "all",
    mode: "all"
  });

  const placeOrder = (data: ICheckoutDetails) => {
    console.log(data);
  };

  // Renders the different sections in the billing form
  const renderForm = (section: string): JSX.Element => (
    <>
      <Row className="my-4">
        <TextInputFormGroup
          formIdentifier={`${section.toLowerCase()}Country`}
          errors={errors}
          labelText="Country"
          register={register}
        />
      </Row>
      <Row className="my-4">
        <Col>
          <TextInputFormGroup
            formIdentifier={`${section.toLowerCase()}FirstName`}
            errors={errors}
            labelText="First Name"
            placeholderText="Jane"
            register={register}
          />
        </Col>
        <Col>
          <TextInputFormGroup
            formIdentifier={`${section.toLowerCase()}LastName`}
            errors={errors}
            labelText="Last Name"
            placeholderText="Doe"
            register={register}
          />
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <TextInputFormGroup
            formIdentifier={`${section.toLowerCase()}CompanyName`}
            errors={errors}
            labelText="Company Name"
            placeholderText="Company Name"
            register={register}
          />
        </Col>
      </Row>
      <Row className="my-4">
        <Col xs={12}>
          <TextInputFormGroup
            formIdentifier={`${section.toLowerCase()}StreetAddress`}
            errors={errors}
            labelText="Street Address"
            placeholderText="Street Address"
            register={register}
          />
        </Col>
        <Col xs={12}>
          <TextInputFormGroup
            formIdentifier={`${section.toLowerCase()}StreetAddressExtra`}
            errors={errors}
            placeholderText="Apartment, suite, unit etc. (optional)"
            register={register}
          />
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <TextInputFormGroup
            formIdentifier={`${section.toLowerCase()}Town`}
            errors={errors}
            labelText="Town / City"
            placeholderText="Town / City"
            register={register}
          />
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <TextInputFormGroup
            formIdentifier={`${section.toLowerCase()}State`}
            errors={errors}
            labelText="State"
            placeholderText="State"
            register={register}
          />
        </Col>
        <Col>
          <TextInputFormGroup
            formIdentifier={`${section.toLowerCase()}Zip`}
            errors={errors}
            labelText="Postcode / Zip"
            placeholderText="Postcode / Zip"
            register={register}
          />
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <TextInputFormGroup
            formIdentifier={`${section.toLowerCase()}Email`}
            errors={errors}
            labelText="Email"
            placeholderText="janedoe@email.com"
            register={register}
          />
        </Col>
        <Col>
          <TextInputFormGroup
            formIdentifier={`${section.toLowerCase()}Phone`}
            errors={errors}
            labelText="Phone"
            register={register}
          />
        </Col>
      </Row>
    </>
  );

  return (
    <>
      <Banner title="Checkout" />
      <Container
        className="py-4 bg-white text-start"
        fluid>
        <Container className="">
          {cart.cartItems.length > 0 ? (
            <Col id="billing-details-form">
              <Row>
                <Col
                  xs={12}
                  sm={6}>
                  <p>
                    Returning customer? <Link to="/register">Login here</Link>
                  </p>
                </Col>
                <Col>
                  <p>
                    Have a coupon? <Link to="/login">Enter your code</Link>
                  </p>
                </Col>
              </Row>
              <Row
                as={Form}
                onSubmit={handleSubmit(placeOrder)}>
                <Col
                  xs={12}
                  md={6}
                  className="border border-1 me-2"
                  id="billing-details">
                  <Row className="my-4">
                    <Col>
                      <h1 className="fs-24">Billing Details</h1>
                      <hr />
                    </Col>
                  </Row>
                  {renderForm("billing")}
                  <Row className="mt-5">
                    <Col>
                      <h1 className="fs-24">
                        Ship to a different address?{" "}
                        <input
                          type="checkbox"
                          onClick={() => setShippingDetails(!shippingDetails)}
                        />
                      </h1>
                    </Col>
                  </Row>
                  {shippingDetails ? renderForm("shipping") : null}
                  <Row className="my-4">
                    <Col>
                      <TextAreaFormGroup
                        formIdentifier="orderNotes"
                        errors={errors}
                        labelText="Order Notes"
                        placeholderText="Please leave special notes for delivery."
                        register={register}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col
                  className="border border-2 h-75 ms-sm-2 mt-3 mt-sm-0"
                  id="order-details">
                  <Row className="my-4 px-4">
                    <Col
                      xs={12}
                      sm={6}
                      className="text-center text-sm-start">
                      <h1 className="fs-24">Your Order</h1>
                    </Col>
                    <Col className="text-center text-sm-end ">
                      <Button
                        className=""
                        size="sm"
                        onClick={() => navigate("/cart", { replace: true })}
                        variant="dark">
                        Edit Cart
                      </Button>
                    </Col>
                    <hr className="mt-2" />
                  </Row>
                  <Row className="px-4">
                    <Col>
                      <Row>
                        <Col
                          className="fw-semibold fs-18 my-auto"
                          xs={6}>
                          <span>Product</span>
                        </Col>
                        <Col
                          className="fw-semibold fs-18 my-auto"
                          xs={6}>
                          <span>Total</span>
                        </Col>
                      </Row>
                      <hr />

                      {cart.cartItems
                        .sort((a, b) => b.Quantity - a.Quantity)
                        .map((cartItem, id) => {
                          const { Name, Price, Quantity } = cartItem;
                          return (
                            <>
                              <Row
                                key={id}
                                className="fs-14">
                                <Col
                                  className="my-auto"
                                  xs={6}>
                                  <span>{Name}</span>
                                </Col>
                                <Col
                                  className="my-auto"
                                  xs={6}>
                                  <span>
                                    ${`${(Price * (applyDiscount ? globalDiscount : 1)).toFixed(2)}`}
                                    <strong className="ms-2">{`x${Quantity}`}</strong>
                                  </span>
                                </Col>
                              </Row>
                              <hr />
                            </>
                          );
                        })}
                      <Row className="fw-semibold">
                        <Col
                          xs={6}
                          sm={6}>
                          <span>Taxes:</span>
                        </Col>
                        <Col>
                          <span>$0.00</span>
                        </Col>
                      </Row>
                      <Row className="fw-semibold">
                        <Col
                          xs={6}
                          sm={6}>
                          <span>Subtotal:</span>
                        </Col>
                        <Col>
                          <span>
                            {`$${cart.cartItems
                              .map(({ Price, Quantity }) => Price * (applyDiscount ? globalDiscount : 1) * Quantity)
                              .reduce((accumulator, currentValue) => accumulator + currentValue)
                              .toFixed(2)}`}
                          </span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="p-4">
                      <Button
                        className="w-100"
                        type="submit"
                        variant="outline-dark">
                        Place Order
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          ) : (
            <Col className="mt-5 min-vh-50 text-center">
              <p className="fs-28">Seems like your cart is empty...</p>
              <Button
                variant="dark"
                onClick={() => navigate("/shop", { replace: true })}>
                Continue Shopping
              </Button>
            </Col>
          )}
        </Container>
      </Container>
    </>
  );
};
