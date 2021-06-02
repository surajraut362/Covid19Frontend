import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Search, ArrowUpward, Delete, Cancel } from "@material-ui/icons";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import { connect } from "react-redux";
import { fetchHospitals } from "../../redux/hospitalActions";

import { withWidth } from "@material-ui/core";

{
  /*function for view Patient  material table */
}
function ViewPatient({ hospitalData, fetchHospitals, ...props }) {
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
    fetchHospitals();

    //  alert("map state: " + JSON.stringify(state.hospitals));
    hospitalData.hospitals.forEach((element) => {
      element.patients.forEach((e) => {
        data.push(e);
        setData(data);
      });
    });
  }, []);

  // useEffect(() => {
  //   //    if (sessionStorage.getItem("username") === null) {
  //   //    history.push("/");
  //   //  }
  //   fetch(`http://localhost:9090/CovidTracker.com/patients/allpatients`)
  //     .then((resp) => resp.json())
  //     .then((resp) => setData(resp));
  // }, []);

  return hospitalData.loading ? (
    <p></p>
  ) : hospitalData.error ? (
    <h2>{hospitalData.error}</h2>
  ) : (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-lg-3 col-md-12 col-xs-12 pt-5 mt-4"
          style={{ padding: "30px" }}
          align="center"
        >
          <Link to="/addPatient" style={{ textDecoration: "none" }}>
            <Button className="btn btn-info btn-block">Add Patient</Button>
          </Link>
          <br></br>
          <Link to="/addpatienttest" style={{ textDecoration: "none" }}>
            <Button className="btn btn-info btn-block">
              Add Patient Test Details
            </Button>
          </Link>
          <br></br>
          <Link to="/modifyPatient" style={{ textDecoration: "none" }}>
            <Button className="btn btn-info btn-block">
              Update Patient Details
            </Button>
          </Link>
          <br></br>
          <Link to="/modifyStatus" style={{ textDecoration: "none" }}>
            <Button className="btn btn-info btn-block">
              Update Patient Status Details
            </Button>
          </Link>
        </div>
        <div className="col-lg-9 col-md-12 col-xs-12">
          <div className="col-md-12 col-xs-12 mt-4 ">
            <h2>
              <span className="badge badge-dark">PATIENT DETAILS</span>
            </h2>
            <MaterialTable
              icons={{
                Filter: () => <div />,
                Search: () => <Search></Search>,
                LastPage: () => <div />,
                FirstPage: () => <div />,
                PreviousPage: () => <Button size="sm">Prev</Button>,
                NextPage: () => <Button size="sm">Next</Button>,
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
                pageSize: 8,
                pageSizeOptions: [10, , 15, 20, 25],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    hospitalData: state.hospitals,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchHospitals: () => dispatch(fetchHospitals()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPatient);
