import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AddHospitalZone from "../../component/hospital/AddHospitalZone";

describe("render component", () => {
  it("render correctly", () => {
    const { queryByTestId } = render(<AddHospitalZone />);
    expect(queryByTestId("ZoneName")).toBeTruthy();
  });
});

describe("input value", () => {
  it("update on change", () => {
    const { queryByTestId } = render(<AddHospitalZone />);
    const zoneNameInput = queryByTestId("ZoneName");
    fireEvent.change(zoneNameInput, { target: { value: "test" } });
    expect(zoneNameInput.value).toBe("test");
  });
});
