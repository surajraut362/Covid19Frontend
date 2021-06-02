import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AddHospital from "../../component/hompepage/HomePage";
import HomePage from "../../component/hompepage/HomePage";
describe("render component", () => {
  it("render correctly", () => {
    const { queryByTestId } = render(<HomePage />);
    expect(queryByTestId("homepage")).toBeTruthy();
  });
});
describe("render component", () => {
  it("render not correctly", () => {
    const { queryByTestId } = render(<HomePage />);
    expect(queryByTestId("homepge")).toBeFalsy();
  });
});
