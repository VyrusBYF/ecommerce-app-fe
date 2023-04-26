import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Col } from "react-bootstrap";

interface ICategoryFilterProps {
  categoryFilters: string[];
  categoryName: string;
  setCategoryFilters: Function;
}

export const CategoryFilter = (props: ICategoryFilterProps): JSX.Element => {
  const { categoryFilters, setCategoryFilters, categoryName } = props;
  const active = categoryFilters.includes(categoryName);

  return (
    <Col className="text-start">
      <button
        className={`border-0 bg-body ${active ? "text-blue" : ""}`}
        onClick={() => {
          const prevList = [...categoryFilters];
          if (!active) {
            setCategoryFilters([...prevList, categoryName].sort());
            return;
          }
          setCategoryFilters(
            [...categoryFilters.filter(filter => filter.toLowerCase() !== categoryName.toLowerCase())].sort()
          );
        }}>
        {`${categoryName}`}
        <FontAwesomeIcon
          icon={faBagShopping}
          size={"xs"}
          className="ms-2"
        />
      </button>
    </Col>
  );
};
