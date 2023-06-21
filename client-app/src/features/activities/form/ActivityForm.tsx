import React, { useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Activity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";

export default observer( function ActivityForm() {

  const { activityStore } = useStore();
  const { createActivity, updateActivity, loadActivity, loadingInitial,loading } = activityStore;
  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: null,
    city: "",
    venue: "",
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("title boş bırakılamaz"),
    category: Yup.string().required("category boş bırakılamaz"),
    description: Yup.string().required("description boş bırakılamaz"),
    date: Yup.string().required("tarih boş bırakılamaz"),
    venue: Yup.string().required("venue boş bırakılamaz"),
    city: Yup.string().required("city boş bırakılamaz"),
  });

  useEffect(() => {
    if (id) loadActivity(id).then(activity => setActivity(activity!));
  }, [id, loadActivity]);

  function handleFormSubmit(activity: Activity) {
     if (!activity.id) {
       let newActivity = {
         ...activity,
         id: uuid(),
       };
       createActivity(newActivity).then(() =>
         navigate(`/activities/${newActivity.id}`)
       );
     } else {
       updateActivity(activity).then(() =>
         navigate(`/activities/${activity.id}`)
       );
     }
  }

  if(loadingInitial) return <LoadingComponent content='Loading Activity...'/>
  
  return (
    <Segment clearing>

      <Header content='Activity Details' sub color='teal' />
      
      <Formik
        validationSchema={validationSchema}
        enableReinitialize initialValues={activity} onSubmit={values => handleFormSubmit(values)}>
        {({ values: activity, handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name='title' placeholder="Title"/>
            <MyTextArea placeholder="Description"  name="description" rows={3} />
            <MySelectInput placeholder="Category" name="category" options={categoryOptions} />
            <MyDateInput placeholderText="Date" name="date" showTimeSelect timeCaption="time" dateFormat='dd/MM/yyyy hh:mm aa' />
            
            <Header content='Location Details' sub color='teal' />
            
            <MyTextInput placeholder="City" name="city" />
            <MyTextInput placeholder="Venue" name="venue" />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={loading} floated="right" positive type="submit" content="Submit" name="title" />
            <Button as={NavLink} to="/activities" floated="right" type="button" content="Cancel" />
          </Form>
        )}
      </Formik>
      
    </Segment>
  );
})
