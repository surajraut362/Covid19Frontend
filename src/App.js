import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginComponent from "./component/hospital/LoginComponent";
import { Login } from "./model/Login";
import AdminDashBoard from "./component/admin/AdminDashBoard";
import HomePage from "./component/hompepage/HomePage";
import { Footer } from "./component/hompepage/Footer";
import HeaderSideMenuFooter from "./component/hompepage/HeaderSideMenu";
import AddHospital from "./component/hospital/AddHospital";
import LogoutComponent from "./component/hospital/LogoutComponent";
import AddAdmin from "./component/admin/AddAdmin";
import UpdateHospital from "./component/hospital/UpdateHospital";

import DeleteHospital from "./component/hospital/DeleteHospital";
import adminHomepage from "./component/admin/Adminhomepage";
import AllAdminPage from "./component/admin/AllAdminPage";
import AllHospitalPage from "./component/hospital/AllHospitalPage";
import ViewPatient from "./component/patient/ViewPatient";
import AddPatient from "./component/patient/AddPatient";
import ModifyPatient from "./component/patient/ModifyPatient";

import AddPatientTest from "./covidtest/AddPatientTest";
import ModifyPatientStatus from "./component/status/ModifyPatientStatus";

function App() {
  return (
    <div className="container-fluid">
      <Router>
        {/* <Switch>
        <Route exact path="/" component={Home1}/>
        <Route exact path="/addAdmin" component={AddAdmin}/> */}

        {/* </Switch> */}

        <Route component={HeaderSideMenuFooter} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginComponent} />
          <Route exact path="/welcome" component={AdminDashBoard} />
          <Route exact path="/dashboard" component={adminHomepage} />
          <Route exact path="/hospitals" component={AllHospitalPage} />
          <Route exact path="/admins" component={AllAdminPage} />
          <Route exact path="/addAdmin" component={AddAdmin} />

          <Route exact path="/hospital/delete/:id" component={DeleteHospital} />
          <Route exact path="/hospital/update/:id" component={UpdateHospital} />

          <Route exact path="/addPatient" component={AddPatient} />
          <Route exact path="/modifyPatient" component={ModifyPatient} />
          <Route exact path="/modifyStatus" component={ModifyPatientStatus} />

          <Route exact path="/addHospital" component={AddHospital} />
          <Route exact path="/logout" component={LogoutComponent} />
          <Route exact path="/patients" component={ViewPatient} />
          <Route exact path="/addpatienttest" component={AddPatientTest} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
