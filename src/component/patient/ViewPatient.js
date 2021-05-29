import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Button } from "@material-ui/core";

export default function ViewPatient() {
  const [data, setData] = useState([]);
  const columns = [
    { field: "patientId", title: "ID" },
    { field: "patientFirstName", title: "First NAME" },
    { field: "patientLastName", title: "LAST NAME" },
    { field: "patientMobileNo", title: "MOBILE NUMBER" },
    { field: "patientAge", title: "AGE" },
    { field: "patientGender", title: "GENDER" },
  ];
  useEffect(() => {
    fetch(`http://localhost:9090/CovidTracker.com/patients/allpatients`)
      .then((resp) => resp.json())
      .then((resp) => setData(resp));
  }, []);
  return (
    <div>
      <h4>PATIENT DETAILS</h4>
      <MaterialTable
        icons={{
          Filter: () => <div />,
          Search: () => <div />,
          Clear: () => <div />,
          LastPage: () => <div />,
          FirstPage: () => <div />,
          PreviousPage: () => <Button>Prev</Button>,
          NextPage: () => <Button>Next</Button>,
        }}
        title="Patient Data"
        data={data}
        columns={columns}
        options={{
          search: true,
          paging: true,
          filtering: false,
          sorting: true,
        }}
      />
    </div>
  );
}
