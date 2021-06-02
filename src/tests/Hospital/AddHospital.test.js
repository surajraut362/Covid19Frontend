import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AddHospital from "../../component/hospital/AddHospital";

it("renders correctly", () => {
  const { queryByTestId } = render(<AddHospital />);
  expect(queryByTestId("HospitalName")).toBeTruthy();
  expect(queryByTestId("GeneralBed")).toBeTruthy();
  expect(queryByTestId("ICUBed")).toBeTruthy();
});

describe("input value", () => {
  it("updates on change", () => {
    const { queryByTestId } = render(<AddHospital />);

    const HospitalName = queryByTestId("HospitalName");

    fireEvent.change(HospitalName, { target: { value: "test" } });
    expect(HospitalName.value).toBe("test");
  });
});

describe("input value", () => {
  it("updates on change", () => {
    const { queryByTestId } = render(<AddHospital />);

    const GeneralBed = queryByTestId("GeneralBed");

    fireEvent.change(GeneralBed, { target: { value: 1 } });
    expect(GeneralBed.value).toBe("1");
  });
});

describe("input value", () => {
  it("updates on change", () => {
    const { queryByTestId } = render(<AddHospital />);

    const ICUBed = queryByTestId("ICUBed");

    fireEvent.change(ICUBed, { target: { value: 1 } });
    expect(ICUBed.value).toBe("1");
  });
});
