import { Route, Switch } from "react-router-dom";
import { useState } from "react";
import LoginComponent from "./component/pages/LoginComponent";
import AdminDashBoard from "./component/admin/AdminDashBoard";
import HomePage from "./component/hompepage/HomePage";
import AddHospital from "./component/hospital/AddHospital";
import LogoutComponent from "./component/pages/LogoutComponent";
import AddAdmin from "./component/admin/AddAdmin";
import UpdateHospital from "./component/hospital/UpdateHospital";
import AddHospitalZone from "./component/hospital/AddHospitalZone";

import DeleteHospital from "./component/hospital/DeleteHospital";
import AdminHomepage from "./component/admin/AdminHomepage";
import AllAdminPage from "./component/admin/AllAdminPage";
import AllHospitalPage from "./component/hospital/AllHospitalPage";
import ViewPatient from "./component/patient/ViewPatient";
import AddPatient from "./component/patient/AddPatient";
import ModifyPatient from "./component/patient/ModifyPatient";

import AddPatientTest from "./component/covidtest/AddPatientTest";
import ModifyPatientStatus from "./component/status/ModifyPatientStatus";
import Guidelines from "./component/pages/Guidelines";
import Contact from "./component/pages/Contact";

function Routes(props) {
  const [state, setstate] = useState(sessionStorage.getItem("username"));

  return state ? (
    <>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/welcome" component={AdminDashBoard} />
      <Route exact path="/dashboard" component={AdminHomepage} />
      <Route exact path="/hospital" component={AllHospitalPage} />
      <Route exact path="/admin" component={AllAdminPage} />
      <Route exact path="/addAdmin" component={AddAdmin} />

      <Route exact path="/hospital/delete/:id" component={DeleteHospital} />
      <Route exact path="/hospital/update/:id" component={UpdateHospital} />

      <Route exact path="/addPatient" component={AddPatient} />
      <Route exact path="/modifyPatient" component={ModifyPatient} />
      <Route exact path="/modifyStatus" component={ModifyPatientStatus} />

      <Route exact path="/addHospital" component={AddHospital} />
      <Route exact path="/logout" component={LogoutComponent} />
      <Route exact path="/AddHospitalZone" component={AddHospitalZone} />
      <Route exact path="/patient" component={ViewPatient} />
      <Route exact path="/addpatienttest" component={AddPatientTest} />
      <Route exact path="/guidelines" component={Guidelines} />
      <Route exact path="/contactus" component={Contact} />
      <Route exact path="/login" component={LoginComponent} />
    </>
  ) : (
    <>
      <Route exact path="/guidelines" component={Guidelines} />
      <Route exact path="/contactus" component={Contact} />
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginComponent} />
    </>
  );
}

export default Routes;
