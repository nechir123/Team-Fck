import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  HashRouter
} from "react-router-dom";
import HomePage from "./HomePage.jsx";
import NavBar from "./HeaderComponent/NavBar.jsx";
import Players from "./Players/PlayersContainer.jsx";
class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <NavBar />
          <main>
            <Route exact path="/" component={HomePage} />
            <Route path="/players" component={Players} />
          </main>
        </div>
      </HashRouter>
    );
  }
}
export default App;
