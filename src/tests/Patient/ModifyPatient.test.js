import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ModifyPatient from "../../component/patient/ModifyPatient";

it("renders correctly", () => {
  //
  const { queryByTestId } = render(<ModifyPatient />);
  expect(queryByTestId("FirstName")).toBeTruthy();
  expect(queryByTestId("LastName")).toBeTruthy();
  expect(queryByTestId("MobileNumber")).toBeTruthy();
  expect(queryByTestId("Age")).toBeTruthy();
  expect(queryByTestId("Gender")).toBeTruthy();
});

describe("input value", () => {
  it("updates on change", () => {
    const { queryByTestId } = render(<ModifyPatient />);

    const patientFirstNameInput = queryByTestId("FirstName");

    fireEvent.change(patientFirstNameInput, { target: { value: "test" } });
    expect(patientFirstNameInput.value).toBe("test");
  });
});

describe("input value", () => {
  it("updates on change", () => {
    const { queryByTestId } = render(<ModifyPatient />);

    const patientLastNameInput = queryByTestId("LastName");

    fireEvent.change(patientLastNameInput, { target: { value: "test" } });
    expect(patientLastNameInput.value).toBe("test");
  });
});

describe("input value", () => {
  it("updates on change", () => {
    const { queryByTestId } = render(<ModifyPatient />);

    const patientMobileInput = queryByTestId("MobileNumber");

    fireEvent.change(patientMobileInput, { target: { value: "9876543323" } });
    expect(patientMobileInput.value).toBe("9876543323");
  });
});

describe("input value", () => {
  it("updates on change", () => {
    const { queryByTestId } = render(<ModifyPatient />);

    const patientAgeInput = queryByTestId("Age");

    fireEvent.change(patientAgeInput, { target: { value: "20" } });
    expect(patientAgeInput.value).toBe("20");
  });
});

describe("input value", () => {
  it("updates on change", () => {
    const { queryByTestId } = render(<ModifyPatient />);

    const patientGenderInput = queryByTestId("Gender");

    fireEvent.change(patientGenderInput, { target: { value: "Male" } });
    expect(patientGenderInput.value).toBe("Male");
  });
});
