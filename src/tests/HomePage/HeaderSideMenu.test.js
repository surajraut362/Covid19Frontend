import React from "react";
import { render, fireEvent } from "@testing-library/react";

import HeaderSideMenu from "../../component/hompepage/HeaderSideMenu";
describe("render component", () => {
  it("render correctly", () => {
    const { queryByTestId } = render(<HeaderSideMenu location={{ key: 1 }} />);
    expect(queryByTestId("headersidemenu")).toBeTruthy();
  });
});
describe("render component", () => {
  it("render not correctly", () => {
    const { queryByTestId } = render(<HeaderSideMenu location={{ key: 1 }} />);
    expect(queryByTestId("")).toBeFalsy();
  });
});
