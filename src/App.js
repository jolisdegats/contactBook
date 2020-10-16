import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import LeftColumn from "./components/LeftColumn";
import UsersList from "./components/UsersList";
import UniqueUser from "./components/UniqueUser";
import "./css/style.css";

function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <Router>
          <LeftColumn></LeftColumn>
          <div className="rightColumn">
            <Switch>
              <Route path="/user/:id">
                <UniqueUser></UniqueUser>
              </Route>
              <Route path="/">
                <UsersList></UsersList>
              </Route>
            </Switch>
          </div>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
