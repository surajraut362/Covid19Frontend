import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Search, ArrowUpward, Delete, Cancel } from "@material-ui/icons";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import { withWidth } from "@material-ui/core";
import { ChevronBarLeft, ChevronBarRight } from "react-bootstrap-icons";

export default function ViewPatient() {
  const [data, setData] = useState([]);
  const columns = [
    { field: "patientId", title: "Id" },
    { field: "patientFirstName", title: "First Name" },
    { field: "patientLastName", title: "Last Name" },
    { field: "patientMobileNo", title: "Mobile Number" },
    { field: "patientAge", title: "Age" },
    { field: "patientGender", title: "Gender" },
  ];
  useEffect(() => {
    fetch(`http://localhost:9090/CovidTracker.com/patients/allpatients`)
      .then((resp) => resp.json())
      .then((resp) => setData(resp));
  }, []);
  return (
    <div className="container-fluid" style={{ backgroundColor: "#dfe3ee" }}>
      <div className="row">
        <div
          className="col-lg-3 col-md-12 col-xs-12 pt-5 mt-4"
          style={{ padding: "30px" }}
          align="center"
        >
          <Link to="/addPatient" style={{ textDecoration: "none" }}>
            <Button className="btn btn-info btn-lg  btn-block">
              Add Patient
            </Button>
          </Link>
          <br></br>
          <Link to="/addpatienttest" style={{ textDecoration: "none" }}>
            <Button className="btn btn-info btn-lg  btn-block">
              Add Test Info
            </Button>
          </Link>
          <br></br>
          <Link to="/modifyPatient" style={{ textDecoration: "none" }}>
            <Button className="btn btn-info btn-lg  btn-block">
              Modify Patient
            </Button>
          </Link>
          <br></br>
          <Link to="/modifyStatus" style={{ textDecoration: "none" }}>
            <Button className="btn btn-info btn-lg  btn-block">
              Update Status
            </Button>
          </Link>
        </div>
        <div className="col-lg-9 col-md-12 col-xs-12">
          <div className="col-md-12 col-xs-12 mt-4 ">
            <h2>
              <span className="badge ">PATIENT DETAILS</span>
            </h2>
            <MaterialTable
              icons={{
                Filter: () => <div />,
                Search: () => <Search></Search>,
                LastPage: () => <div />,
                FirstPage: () => <div />,
                PreviousPage: () => <ChevronBarLeft />,
                NextPage: () => <ChevronBarRight />,
                ResetSearch: () => <Cancel></Cancel>,
                SortArrow: () => <FilterList></FilterList>,
                DetailPanel: () => <div />,
                Edit: () => <Edit></Edit>,
              }}
              title=""
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
        </div>
      </div>
    </div>
  );
}
