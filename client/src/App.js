import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import NotFound from "./components/NotFound";
import Landing from "./components/Landing";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Alert from "./components/Alert";
import Dashboard from "./dashboard/Dashboard";
import Profiles from "./profiles/Profiles";
import Profile from "./profile/Profile";
import Posts from "./posts/Posts";
import Post from "./post/Post";
import PrivateRoute from "./routing/PrivateRoute";
import CreateProfile from "./profile-forms/CreateProfile";
import EditProfile from "./profile-forms/EditProfile";
import AddExperience from "./profile-forms/AddExperience";
import AddEducation from "./profile-forms/AddEducation";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./action/auth";
import setAuthToken from "./utils/setAuthToken";
//CSS
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Nav />

          <Alert />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/user/:id" component={Profile} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute
              exact
              path="/create-profile"
              component={CreateProfile}
            />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            <PrivateRoute
              exact
              path="/add-experience"
              component={AddExperience}
            />
            <PrivateRoute
              exact
              path="/add-education"
              component={AddEducation}
            />
            <PrivateRoute exact path="/posts" component={Posts} />
            <PrivateRoute exact path="/post/:id" component={Post} />
            <Route component={NotFound} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
