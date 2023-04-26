import React from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  cancelSelectedActivity: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
  delete: (id: string) => void;
}

export default function ActivityDashboard(props: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={props.activities} selectActivity={props.selectActivity} delete={props.delete}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {props.selectedActivity && !props.editMode && (
          <ActivityDetails activity={props.selectedActivity} cancelSelectedActivity={props.cancelSelectedActivity} openForm={props.openForm} />
        )}
        {props.editMode && (
          <ActivityForm closeForm={props.closeForm} activity={props.selectedActivity} createOrEdit={props.createOrEdit} />
        )}
      </Grid.Column>
    </Grid>
  );
}
