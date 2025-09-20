import Table from "../component/Table";
import {
  render,
  screen,
  act,
  cleanup,
  fireEvent,
  within,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import mockData from "../mock/data.json";
import { isSorted } from "./utils";

import React from "react";

jest.mock("../utils/getData", () => {
  return {
    __esModule: true,
    default: jest.fn(() => {
      return { data: mockData };
    }),
  };
});

describe("Table", () => {
  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  beforeEach(async () => {
    render(<Table />);
    await waitFor(() => {
      const productsPanel = screen.getByTestId("products-panel");
      expect(productsPanel.childNodes).toHaveLength(6);

      const filterBar = screen.getByTestId("filter-bar");
      expect(filterBar).toBeInTheDocument();

      const paginationPanel = screen.getByTestId("pagination-panel");
      expect(paginationPanel).toBeInTheDocument();
    });
  });

  test("Pagination", async () => {
    const user = userEvent.setup();

    const previousButton = screen.getByText("Previous");
    expect(previousButton).toBeDisabled();

    const nextButton = screen.getByText("Next");
    await act(async () => user.click(nextButton));

    const productsPanel = screen.getByTestId("products-panel");
    expect(productsPanel.childNodes).toHaveLength(1);
    expect(nextButton).toBeDisabled();
  });

  test("Discrete filtering", async () => {
    const user = userEvent.setup();

    const categoryFilter = screen.getAllByTestId("category-filter");
    await act(async () => user.selectOptions(categoryFilter[0], "Electronics"));

    // Effect of single filter
    const productsPanel = screen.getByTestId("products-panel");
    expect(productsPanel.childNodes).toHaveLength(5);

    // Simultanoius effect of filters
    const brandFilter = screen.getAllByTestId("brand-filter");
    await act(async () => user.selectOptions(brandFilter[0], "Brand A"));

    expect(productsPanel.childNodes).toHaveLength(1);

    // Display not found message
    await act(async () => user.selectOptions(brandFilter[0], "Brand C"));
    const notFound = screen.getByText("No products found!");
    expect(notFound).toBeInTheDocument();
  });

  test("Range filtering", async () => {
    const ratingFilter = screen.getAllByTestId("rating-filter");
    fireEvent.change(ratingFilter[0], { target: { value: 4 } });

    // Effect of single filter
    expect(productsPanel.childNodes).toHaveLength(5);

    const priceFilter = screen.getAllByTestId("price-filter");
    fireEvent.change(priceFilter[0], { target: { value: 500 } });

    // Effect of single filter
    const notFound = screen.getByText("No products found!");
    expect(notFound).toBeInTheDocument();
  });

  test("Sorting", async () => {
    const user = userEvent.setup();

    const sortingCriteria = screen.getAllByTestId("test-sorting-criteria");
    await act(async () => user.selectOptions(sortingCriteria[0], "rating"));

    const sortingDirection = screen.getAllByTestId("test-sorting-direction");
    await act(async () => user.selectOptions(sortingDirection[0], "ascending"));

    const productsPanel = screen.getByTestId("products-panel");

    const rates = Array.from(productsPanel.childNodes).map(
      (post) => within(post).getByTestId("rating").textContent
    );
    expect(isSorted(rates, "asc")).toBeTruthy();

    localStorage.clear();

    await act(async () => user.selectOptions(sortingCriteria[0], "price"));
    await act(async () =>
      user.selectOptions(sortingDirection[0], "descending")
    );

    const prices = Array.from(productsPanel.childNodes).map((post) =>
      Number(within(post).getByTestId("price").textContent)
    );
    expect(isSorted(prices, "des")).toBeTruthy();
  });
});
