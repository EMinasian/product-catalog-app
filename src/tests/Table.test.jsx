import Table from "../component/Table";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import React from "react";

describe("Table", () => {
  test("Renders the table of products for desktop", () => {
    render(<Table />);

    const filterBar = screen.getByTestId("filter-bar");
    expect(filterBar).toBeInTheDocument();
  });
});
