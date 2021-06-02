import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Footer } from "./component/hompepage/Footer";
import HeaderSideMenu from "./component/hompepage/HeaderSideMenu";
import Routes from "./Routes";
import NotFound from "./component/ErrorPages/NotFound/NotFound";

function App() {
  return (
    <>
      <div className="container-fluid ">
        <Router>
          <Route component={HeaderSideMenu} />
          <Switch>
            <Routes />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </div>

      <Footer />
    </>
  );
}

export default App;
