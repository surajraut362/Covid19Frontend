import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ModifyPatientStatus from "../../component/status/ModifyPatientStatus";

it("renders correctly", () => {
  const { queryByTestId } = render(<ModifyPatientStatus />);
  expect(queryByTestId("patientconfirmDate")).toBeTruthy();
  expect(queryByTestId("patientisolationDate")).toBeTruthy();
  expect(queryByTestId("patientrecoveryDate")).toBeTruthy();
  expect(queryByTestId("patientdeathDate")).toBeTruthy();
});

describe("input value", () => {
  it("updates on change", () => {
    const { queryByTestId } = render(<ModifyPatientStatus />);

    const patientConfirmDateInput = queryByTestId("patientconfirmDate");

    fireEvent.change(patientConfirmDateInput, {
      target: { value: "2021-05-15" },
    });
    expect(patientConfirmDateInput.value).toBe("2021-05-15");
  });
});

describe("input value", () => {
  it("updates on change", () => {
    const { queryByTestId } = render(<ModifyPatientStatus />);

    const patientIsolationDateInput = queryByTestId("patientisolationDate");

    fireEvent.change(patientIsolationDateInput, {
      target: { value: "2021-05-15" },
    });
    expect(patientIsolationDateInput.value).toBe("2021-05-15");
  });
});

describe("input value", () => {
  it("updates on change", () => {
    const { queryByTestId } = render(<ModifyPatientStatus />);

    const patientRecoveryDateInput = queryByTestId("patientrecoveryDate");

    fireEvent.change(patientRecoveryDateInput, {
      target: { value: "2021-05-15" },
    });
    expect(patientRecoveryDateInput.value).toBe("2021-05-15");
  });
});

describe("input value", () => {
  it("updates on change", () => {
    const { queryByTestId } = render(<ModifyPatientStatus />);

    const patientDeathDateInput = queryByTestId("patientdeathDate");

    fireEvent.change(patientDeathDateInput, {
      target: { value: "2021-05-15" },
    });
    expect(patientDeathDateInput.value).toBe("2021-05-15");
  });
});
