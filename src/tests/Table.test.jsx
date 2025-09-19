import Table from "../component/Table";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import React from "react";

describe("Table", () => {
  test("Renders the table of products for desktop", () => {
    render(<Table />);

    const filterBar = screen.getByTestId("filter-bar");
    expect(filterBar).toBeInTheDocument();

    const productsPanel = screen.getByTestId("products-panel");
    expect(productsPanel.childNodes).toHaveLength(6);

    const paginationPanel = screen.getByTestId("products-panel");
    expect(paginationPanel).toBeInTheDocument();
  });
});
