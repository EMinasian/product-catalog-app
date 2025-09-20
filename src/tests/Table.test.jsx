import Table from "../component/Table";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  test("Pagination", async () => {
    render(<Table />);

    const user = userEvent.setup();
    const previousButton = screen.getByText("Previous");
    console.log(previousButton);
    expect(previousButton).toBeDisabled();

    const nextButton = screen.getByText("Next");
    await act(async () => user.click(nextButton));

    const productsPanel = screen.getByTestId("products-panel");
    expect(productsPanel.childNodes).toHaveLength(1);
    expect(nextButton).toBeDisabled();
  });
});
