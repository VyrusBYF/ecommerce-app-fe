import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Banner } from "src/_shared/Banner";
import Products from "src/_shared/Products.json";
import { Product } from "src/_shared/sharedTypes";
import { ProductCard } from "./Product/ProductCard";
import { default as Paginate } from "react-responsive-pagination";
import { dropNav } from "react-responsive-pagination/narrowBehaviour";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faList } from "@fortawesome/free-solid-svg-icons";
import { CategoryFilter } from "./Filters/CategoryFilter";
import { globalDiscount, globalMaxPrice, globalMinPrice } from "src/_shared/pricing";
import { breakPoints } from "src/_shared/general";

interface ICatalogFilterForm {
  catalogMin?: string;
  catalogMax?: string;
}

export const Catalog = (): JSX.Element => {
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  const [currentItems, setCurrentItems] = useState<Product[]>([]);
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(9);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentScreenWidth, setCurrentScreenWidth] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [sortingOption, setSortingOption] = useState<string>("default");
  const [currentMinPrice, setCurrentMinPrice] = useState<string>("");
  const [currentMaxPrice, setCurrentMaxPrice] = useState<string>("");

  const endOffset = itemOffset + itemsPerPage;
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const categories = [{ Name: "Category 1" }, { Name: "Category 2" }, { Name: "Category 3" }, { Name: "Category 4" }];
  const sortingOptions = ["Price Lowest - Highest", "Price Highest - Lowest"];

  const {
    formState: { errors },
    getValues,
    setValue,
    handleSubmit,
    register
  } = useForm<ICatalogFilterForm>({
    criteriaMode: "all"
  });

  useEffect(() => {
    setProducts(Products as Product[]);
    setCurrentScreenWidth(window.innerWidth);
    window.addEventListener("resize", () => setCurrentScreenWidth(window.innerWidth));
  }, []);

  useEffect(() => {
    setCurrentItems(products.slice(itemOffset, endOffset));
  }, [products]);

  useEffect(() => {
    // Let the catalog know the price filter is applied
    filterCatalog({ catalogMin: currentMinPrice, catalogMax: currentMaxPrice });
  }, [categoryFilters, sortingOption, itemsPerPage]);

  // Control the amount of items to display when screen resizes.
  useEffect(() => {
    // Large
    if (currentScreenWidth <= breakPoints.md) {
      setItemsPerPage(8);
      return;
    }
    if (itemsPerPage < 9) {
      setItemsPerPage(9);
    }
  }, [currentScreenWidth]);

  const navigateToPage = (page: number) => {
    const newOffset = ((page - 1) * itemsPerPage) % products.length;
    setItemOffset(newOffset);
    setCurrentPage(page);
    document.getElementById("shop-banner").scrollIntoView({ behavior: "smooth" });
  };

  const filterCatalog = (data: ICatalogFilterForm) => {
    const activeDiscount = globalDiscount > 0 && globalDiscount < 1 ? globalDiscount : 1;
    const minPrice = data.catalogMin === "" ? globalMinPrice : Number(data.catalogMin);
    const maxPrice = data.catalogMax === "" ? globalMaxPrice : Number(data.catalogMax);

    // Create a copy of products
    const newProducts = [...Products];

    // Filters based on selected category and price
    const filteredProducts = newProducts.filter(product => {
      // apply discount to price
      const actualPrice = product.Price * activeDiscount;

      // check if product has category attached
      const inCategory = categoryFilters.length > 0 ? categoryFilters.includes(product.Category) : true;
      return actualPrice >= minPrice && actualPrice <= maxPrice && inCategory;
    });
    switch (true) {
      case sortingOption?.includes("Lowest - Highest"): {
        setProducts(
          filteredProducts.sort((a, b) => {
            const prevItem = a.Price * activeDiscount;
            const nextItem = b.Price * activeDiscount;
            return prevItem - nextItem;
          })
        );
        break;
      }
      case sortingOption?.includes("Highest - Lowest"): {
        setProducts(
          filteredProducts.sort((a, b) => {
            const prevItem = a.Price * activeDiscount;
            const nextItem = b.Price * activeDiscount;
            return nextItem - prevItem;
          })
        );
        break;
      }
      default: {
        setProducts(filteredProducts);
        break;
      }
    }
  };

  const resetCatalog = () => {
    setCategoryFilters([]);
    setCurrentMinPrice("");
    setCurrentMaxPrice("");
    setProducts(Products);
    setSortingOption("default");
    setValue("catalogMax", "");
    setValue("catalogMin", "");
  };

  return (
    <>
      <Banner title="Shop" />
      <Container
        className="py-4 bg-white"
        fluid>
        <Container>
          <Row className="">
            <Col
              md={12}
              xl={5}>
              <Row className="text-start p-2 mb-2 align-items-center">
                <Col xs={8}>
                  <h4 className="py-1 my-auto">Product Categories</h4>
                </Col>
                <Col
                  xs={4}
                  className="text-end">
                  <Button
                    className="btn-text-sm"
                    onClick={() => resetCatalog()}
                    variant="dark">
                    Reset Filters
                  </Button>
                </Col>
              </Row>
              <Row className="my-2 p-2">
                {categories.map((category, id) => (
                  <Col
                    xs={6}
                    sm={6}
                    lg={2}
                    xl={12}
                    key={id}>
                    <Row>
                      <CategoryFilter
                        categoryFilters={categoryFilters}
                        categoryName={category.Name}
                        setCategoryFilters={setCategoryFilters}
                      />
                    </Row>
                  </Col>
                ))}
              </Row>
              <Row className="text-start p-2 mb-3">
                <Col xs={12}>
                  <Row>
                    <Col xs={12}>
                      <h4>Filter By Price</h4>
                    </Col>
                    <Col
                      as={Form}
                      onSubmit={handleSubmit(filterCatalog)}>
                      <Row>
                        <Col
                          xs={5}
                          sm={5}
                          md={6}
                          lg={3}>
                          <Form.Control
                            {...register("catalogMin", {
                              min: { value: globalMinPrice, message: "Please enter an amount larger than $0.99" },
                              max: {
                                value: parseInt(currentMaxPrice),
                                message: `Please enter an amount less than ${currentMaxPrice}`
                              },
                              pattern: { value: /^[\d]+$/u, message: "Please enter only numbers" }
                            })}
                            onInput={e => setCurrentMinPrice(e.currentTarget.value)}
                            size="sm"
                            type="text"
                            placeholder="$1.00"
                          />
                          <Form.Label>Min</Form.Label>
                          {errors.catalogMin ? <p className="error-msg">{errors.catalogMin.message}</p> : null}
                        </Col>
                        <Col
                          xs={5}
                          sm={5}
                          md={6}
                          lg={3}>
                          <Form.Control
                            {...register("catalogMax", {
                              min: {
                                value: parseInt(currentMinPrice) + 0.99,
                                message: `Please enter an amount larger than ${currentMinPrice}`
                              },
                              max: {
                                value: globalMaxPrice,
                                message: `Please enter an amount less than ${globalMaxPrice}`
                              },
                              pattern: { value: /^[\d]+$/u, message: "Please enter only numbers" }
                            })}
                            onInput={e => setCurrentMaxPrice(e.currentTarget.value)}
                            size="sm"
                            type="text"
                            placeholder="$1000.00"
                          />
                          <Form.Label>Max</Form.Label>
                          {errors.catalogMax ? <p className="error-msg">{errors.catalogMax.message}</p> : null}
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          xs={12}
                          className="my-2">
                          <Button
                            className="btn-text-sm px-3 py-1 rounded-4 w-50"
                            type="submit"
                            disabled={currentMinPrice === "" || currentMinPrice === ""}
                            variant="dark">
                            Filter
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row
                id="catalog-sorting-controls"
                className="p-1 align-items-center">
                <Col
                  md={6}
                  className="text-start">
                  <small>{`Showing ${itemOffset + 1} - ${endOffset} of ${products.length} results`}</small>
                </Col>
                <Col
                  md={4}
                  className="px-0">
                  <Form.Select
                    className="btn-text-sm"
                    id="catalog-sorting-options"
                    value={sortingOption}
                    onChange={e => setSortingOption(e.currentTarget.value)}>
                    <option value="Default">Default</option>
                    {sortingOptions.length
                      ? sortingOptions.map((option, id) => (
                          <option
                            key={id}
                            value={option}>
                            {option}
                          </option>
                        ))
                      : null}
                  </Form.Select>
                </Col>
                <Col
                  xs={6}
                  md={1}>
                  <FontAwesomeIcon icon={faGrip} />
                </Col>
                <Col
                  xs={6}
                  md={1}>
                  <FontAwesomeIcon icon={faList} />
                </Col>
              </Row>
              <Row className="mt-3">
                {currentItems.map((product: Product, id) => (
                  <Col
                    xs={6}
                    md={4}
                    key={id}>
                    {<ProductCard product={product} />}
                  </Col>
                ))}
              </Row>
              <Paginate
                disabledLinkClassName="page-item disabled"
                nextLabel="next"
                onPageChange={page => navigateToPage(page)}
                previousLabel="previous"
                current={currentPage}
                total={pageCount}
                narrowBehaviour={dropNav}
              />
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};
