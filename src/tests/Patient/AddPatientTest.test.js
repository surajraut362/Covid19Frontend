import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AddPatientTest from "../../component/covidtest/AddPatientTest";

it("renders correctly", () => {
  //
  const { queryByTestId } = render(<AddPatientTest />);
  expect(queryByTestId("testDate")).toBeTruthy();
  expect(queryByTestId("testResult")).toBeTruthy();
});

// it("renders correctly",()=>{
//     const{queryByTestId} = render(<AddPatientTest/>)
//     expect(queryByTestId("testpatientId")).toBeTruthy();

// })

describe("input value", () => {
  it("updates on change", () => {
    const { queryByTestId } = render(<AddPatientTest />);

    const patientTestDateInput = queryByTestId("testDate");

    fireEvent.change(patientTestDateInput, { target: { value: "2021-05-15" } });
    expect(patientTestDateInput.value).toBe("2021-05-15");
  });
});

describe("input value", () => {
  it("updates on change", () => {
    const { queryByTestId } = render(<AddPatientTest />);

    const patientTestResultInput = queryByTestId("testResult");

    fireEvent.change(patientTestResultInput, { target: { value: "Positive" } });
    expect(patientTestResultInput.value).toBe("Positive");
  });
});
