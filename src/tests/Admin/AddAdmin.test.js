import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AddAdmin from "../../component/admin/AddAdmin";

it("renders correctly", () => {
  const { queryByTestId } = render(<AddAdmin />);
  expect(queryByTestId("FirstName")).toBeTruthy();
  expect(queryByTestId("LastName")).toBeTruthy();
  expect(queryByTestId("Id")).toBeTruthy();
  // expect(queryByTestId("Age")).toBeTruthy();
  // expect(queryByTestId("Gender")).toBeTruthy();
});
describe("input value", () => {
  it("updates on change", () => {
    const { queryByTestId } = render(<AddAdmin />);

    const AdminFName = queryByTestId("FirstName");

    fireEvent.change(AdminFName, { target: { value: "test" } });
    expect(AdminFName.value).toBe("test");
  });
});
describe("input value", () => {
  it("updates on change", () => {
    const { queryByTestId } = render(<AddAdmin />);

    const AdminLName = queryByTestId("LastName");

    fireEvent.change(AdminLName, { target: { value: "test" } });
    expect(AdminLName.value).toBe("test");
  });
});
describe("input value", () => {
  it("updates on change", () => {
    const { queryByTestId } = render(<AddAdmin />);

    const Id = queryByTestId("Id");

    fireEvent.change(Id, { target: { value: "test" } });
    expect(Id.value).toBe("test");
  });
});
