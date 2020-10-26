import React from "react";
import Content from "./content";
import { usePagination } from "../hooks/use-pagination";
​
export default function Pagination({ items: _items = [], order }) {
  const {
    items,
    currentPage,
    numberOfPages,
    shouldDisplayNext,
    shouldDisplayPrev,
    goToPrevPage,
    goToNextPage
  } = usePagination({ items: _items, numberToDisplayPerPage: 6, order });
​
  return (
    <React.Fragment>
      <div className="img-grid">
        {items.map(item => (
          <Content key={item.id} {...item} />
        ))}
      </div>
      <p>
        {currentPage} page of {numberOfPages}
      </p>
      <div>
        {shouldDisplayPrev && <button onClick={goToPrevPage}>Prev</button>}
        {shouldDisplayNext && <button onClick={goToNextPage}>Next</button>}
      </div>
    </React.Fragment>
  );
}