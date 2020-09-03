import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Landing } from "./components/Landing";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Alert from "./components/Alert";
// Redux
import { Provider } from "react-redux";
import store from "./store";
//CSS
import "./App.css";

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Nav />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
