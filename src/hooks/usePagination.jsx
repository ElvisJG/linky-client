import React from "react";
​
/**
 * @param {Array} items - the
 */
function getNextItems(items, numberToDisplay, page) {
  if (items.length < numberToDisplay) {
    return items;
  }
​
  const startAt = numberToDisplay * page;
  const upTo = numberToDisplay * (page + 1);
​
  return items.slice(startAt, upTo);
}
​
const initialState = {
  numberToDisplayPerPage: 1,
  currentPage: 0,
  numberOfPages: 0
};
​
function paginationReducer(
  state = initialState,
  action = { type: "INVALID_ACTION" }
) {
  switch (action.type) {
    case "RESET": {
      return getInitialState({
        ...action.payload,
        currentPage: state.currentPage
      });
    }
    case "GO_TO_NEXT_PAGE": {
      const currentPage =
        state.currentPage < state.numberOfPages - 1
          ? state.currentPage + 1
          : state.currentPage;
​
      return {
        ...state,
        currentPage
      };
    }
    case "GO_TO_PREV_PAGE": {
      const currentPage =
        state.currentPage > 0 ? state.currentPage - 1 : state.currentPage;
      return {
        ...state,
        currentPage
      };
    }
    case "GO_TO_FIRST_PAGE": {
      const currentPage = 0;
​
      return {
        ...state,
        currentPage
      };
    }
    case "GO_TO_LAST_PAGE": {
      const currentPage = state.numberOfPages - 1;
​
      return {
        ...state,
        currentPage
      };
    }
    default:
      return state;
  }
}
​
const getOrder = (items, order) => {
  if (order === "reverse") {
    return [...items].reverse();
  } else {
    return items;
  }
};
​
function getInitialState({ items, numberToDisplayPerPage, currentPage = 0 }) {
  const numberOfPages = Math.ceil(items.length / numberToDisplayPerPage);
​
  return {
    numberToDisplayPerPage,
    currentPage,
    numberOfPages
  };
}
​
export function usePagination({ items, numberToDisplayPerPage, order }) {
  const [state, dispatch] = React.useReducer(
    paginationReducer,
    { items, numberToDisplayPerPage, order },
    getInitialState
  );
​
  React.useEffect(() => {
    dispatch({
      type: "RESET",
      payload: {
        items,
        numberToDisplayPerPage
      }
    });
  }, [items, numberToDisplayPerPage]);
​
  return {
    items: getNextItems(
      getOrder(items, order),
      numberToDisplayPerPage,
      state.currentPage
    ),
    // We are zero indexing for calculation purposes but we probably want to
    // start at 1 for display purposes
    currentPage: state.currentPage + 1,
    numberOfPages: state.numberOfPages,
    shouldDisplayPrev: state.currentPage > 0 && state.numberOfPages > 1,
    shouldDisplayNext: state.currentPage + 1 < state.numberOfPages,
    goToNextPage: () => dispatch({ type: "GO_TO_NEXT_PAGE" }),
    goToPrevPage: () => dispatch({ type: "GO_TO_PREV_PAGE" }),
    goToFirstPage: () => dispatch({ type: "GO_TO_FIRST_PAGE" }),
    goToLastPage: () => dispatch({ type: "GO_TO_LAST_PAGE" })
  };
}