import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AddPatient from "../../component/patient/AddPatient";

it("renders correctly", () => {
  //
  const { queryByTestId } = render(<AddPatient />);
  expect(queryByTestId("FirstName")).toBeTruthy();
  expect(queryByTestId("LastName")).toBeTruthy();
  expect(queryByTestId("MobileNumber")).toBeTruthy();
  expect(queryByTestId("Age")).toBeTruthy();
  expect(queryByTestId("Gender")).toBeTruthy();
});

// it("renders corectly",()=>{
//     const{queryByTestId} = render(<AddPatient/>)
//     expect(queryByTestId("HospitalId")).toBeTruthy();
// })

describe("input value", () => {
  it("updates on change", () => {
    const { queryByTestId } = render(<AddPatient />);

    const patientFirstNameInput = queryByTestId("FirstName");

    fireEvent.change(patientFirstNameInput, { target: { value: "test" } });
    expect(patientFirstNameInput.value).toBe("test");
  });
});

describe("input value", () => {
  it("updates on change", () => {
    const { queryByTestId } = render(<AddPatient />);

    const patientLastNameInput = queryByTestId("LastName");

    fireEvent.change(patientLastNameInput, { target: { value: "test" } });
    expect(patientLastNameInput.value).toBe("test");
  });
});

describe("input value", () => {
  it("updates on change", () => {
    const { queryByTestId } = render(<AddPatient />);

    const patientMobileInput = queryByTestId("MobileNumber");

    fireEvent.change(patientMobileInput, { target: { value: "9876543219" } });
    expect(patientMobileInput.value).toBe("9876543219");
  });
});

describe("input value", () => {
  it("updates on change", () => {
    const { queryByTestId } = render(<AddPatient />);

    const patientAgeInput = queryByTestId("Age");

    fireEvent.change(patientAgeInput, { target: { value: "20" } });
    expect(patientAgeInput.value).toBe("20");
  });
});

describe("input value", () => {
  it("updates on change", () => {
    const { queryByTestId } = render(<AddPatient />);

    const patientGenderInput = queryByTestId("Gender");

    fireEvent.change(patientGenderInput, { target: { value: "Male" } });
    expect(patientGenderInput.value).toBe("Male");
  });
});
