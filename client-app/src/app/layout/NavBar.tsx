import React from "react";
import { Button, Container, Menu, MenuItem } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

export default observer( function NavBar() {

  const { activityStore } = useStore();

  return (
    <Menu inverted fixed="top">
      <Container>
        <MenuItem header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          ></img>
          Reactivities
        </MenuItem>
        <MenuItem name="Activities" />
        <MenuItem>
          <Button onClick={() => activityStore.openForm()} positive content="Create Activity" />
        </MenuItem>
      </Container>
    </Menu>
  );
})
