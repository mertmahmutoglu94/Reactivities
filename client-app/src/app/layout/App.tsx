import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";

function App() {
  const location = useLocation();

  return (
    <Fragment>
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <Fragment>
          <NavBar />
          <div>
            <Container style={{ marginTop: "7em" }}>
              {/* <ActivityDashboard />> */}
              <Outlet />
            </Container>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default observer(App);
