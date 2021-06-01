import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Footer } from "./component/hompepage/Footer";
import HeaderSideMenu from "./component/hompepage/HeaderSideMenu";
import Routes from "./Routes";

function App() {
  return (
    <>
      <div className="container-fluid ">
        <Router>
          {/* <HeaderSideMenu /> */}
          {/* <Switch>
        <Route exact path="/" component={Home1}/>
        <Route exact path="/addAdmin" component={AddAdmin}/> */}

          {/* </Switch> */}

          <Route component={HeaderSideMenu} />
          <Routes />
        </Router>

        {/* <Switch>
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
          <Route exact path="/AddHospitalZone" component={AddHospitalZone} />
          <Route exact path="/patients" component={ViewPatient} />
          <Route exact path="/addpatienttest" component={AddPatientTest} />
        </Switch>
      </Router> */}
      </div>

      <Footer />
    </>
  );
}

export default App;
