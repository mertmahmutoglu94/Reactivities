import React from "react";
import { Button, Container, Menu, MenuItem } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

export default observer( function NavBar() {

  return (
    <Menu inverted fixed="top">
      <Container>
        <MenuItem as={NavLink} to="/" header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          ></img>
          Reactivities
        </MenuItem>
        <MenuItem as={NavLink} to="/activities" name="Activities" />
        <MenuItem>
          <Button as={NavLink} to="/createActivity" positive content="Create Activity"
          />
        </MenuItem>
      </Container>
    </Menu>
  );
})
