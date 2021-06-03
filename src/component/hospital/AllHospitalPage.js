import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchHospitals } from "../../redux/hospitalActions";
import { Button } from "react-bootstrap";
import {
  Search,
  Delete,
  Cancel,
  ChevronLeftTwoTone,
  ChevronRightTwoTone,
} from "@material-ui/icons";
import { AdminService } from "../../service/adminservice/AdminService";
import Table from "material-table";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import { Component } from "react";
import { LinearProgress } from "@material-ui/core";

function AllHospitalPage({ hospitalsData, fetchHospitals, ...props }) {
  useEffect(() => {
    fetchHospitals();
  }, []);
  return hospitalsData.loading ? (
    <LinearProgress className="bg-primary mt-0" />
  ) : hospitalsData.error ? (
    <h2>{hospitalsData.error}</h2>
  ) : (
    <div className="col-md-12 mt-4 ">
      <Button
        style={{ float: "right" }}
        onClick={() => props.history.push("/addHospital")}
      >
        Add Hospital
      </Button>

      <h1>
        <span className="badge ">View Hospitals</span>
      </h1>
      <Table
        title=""
        data-testid="Hospitals"
        className="table table-bordered  badge badge-drak"
        icons={{
          Filter: () => <div />,
          Search: () => <Search></Search>,
          LastPage: () => <div />,
          FirstPage: () => <div />,
          PreviousPage: () => <ChevronLeftTwoTone />,
          NextPage: () => <ChevronRightTwoTone />,
          ResetSearch: () => <Cancel></Cancel>,
          SortArrow: () => <FilterList></FilterList>,
          DetailPanel: () => <div />,
          Edit: () => <Edit></Edit>,
        }}
        columns={[
          // { field: 'hospitalId', title: 'Hospital ID' },
          { field: "hospitalName", title: "Hospital Name" },
          { field: "hospitalGeneralBed", title: "General Bed" },
          { field: "hospitalICUBed", title: "ICU Bed" },
          { field: "hospitalType.typeName", title: "Type Name" },
          { field: "hospitalZone.zoneName", title: "Zone Name " },
        ]}
        data={hospitalsData.hospitals}
        options={{
          paging: true,
          actionsColumnIndex: -1,
        }}
        actions={[
          // {
          //     icon: 'description',
          //     tooltip: 'View User',
          //     onClick: (event, rowData) => this.props.history.push(`/search/byId/${rowData.vendorId}`)

          // },

          {
            icon: () => <Edit />,
            tooltip: "Update Hospital",
            onClick: (event, rowData) =>
              props.history.push(`/hospital/update/${rowData.hospitalId}`),
          },

          {
            icon: () => <Delete />,
            tooltip: "Delete Hospital",
            onClick: (event, rowData) =>
              props.history.push(`/hospital/delete/${rowData.hospitalId}`),
          },
        ]}
      ></Table>
    </div>
  );
}

const mapStateToProps = (state) => {
  //  alert("map state: " + JSON.stringify(state.hospitals));
  return {
    hospitalsData: state.hospitals,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchHospitals: () => dispatch(fetchHospitals()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllHospitalPage);
