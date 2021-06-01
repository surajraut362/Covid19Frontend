import React, { useState, useEffect, Component } from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchHospitals } from "../../redux/hospitalActions";
import { Button } from "react-bootstrap";
import { HospitalType } from "../../model/HospitalType";
import MaterialTable from "material-table";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import {
  Search,
  ArrowUpward,
  Delete,
  Cancel,
  ChevronLeftTwoTone,
  ChevronRightTwoTone,
} from "@material-ui/icons";
import { Hospital } from "../../model/Hospital";
import { AdminService } from "../../service/adminservice/AdminService";
import { HospitalService } from "../../service/hospitalservice/HospitalService";
import Table from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";

import ViewColumn from "@material-ui/icons/ViewColumn";

export default class AllHospitalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hospitals: [],
    };
  }
  componentDidMount() {
    // let service=new HospitalService();
    // service.getAllHospitals().
    let service = new AdminService();
    // alert("hello");
    service
      .getAdminCredentials(JSON.parse(sessionStorage.getItem("username")))
      .then((result) => {
        // alert(JSON.stringify(result.data));
        this.setState({
          hospitals: result.data.hospitals,
        });
      });
  }

  render() {
    return (
      <div className="col-md-12 mt-4 ">
        <Link to="/addHospital" style={{ float: "right" }}>
          <Button>Add Hospital</Button>
        </Link>
        <h1>
          <span className="badge ">View Hospitals</span>
        </h1>
        <Table
          title=""
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
          data={this.state.hospitals}
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
                this.props.history.push(
                  `/hospital/update/${rowData.hospitalId}`
                ),
            },

            {
              icon: () => <Delete />,
              tooltip: "Delete Hospital",
              onClick: (event, rowData) =>
                this.props.history.push(
                  `/hospital/delete/${rowData.hospitalId}`
                ),
            },
          ]}
        ></Table>
      </div>
    );
  }
}
