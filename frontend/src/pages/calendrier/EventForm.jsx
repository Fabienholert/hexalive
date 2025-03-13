import { Button, TextField } from "@mui/material"; // Importez TextField et Button depuis @mui/material
import { DateTimePicker } from "@mui/x-date-pickers"; // Importez DateTimePicker depuis @mui/x-date-pickers
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const EventForm = ({ initialValues, onSubmit, onCancel }) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    start: Yup.date().required("Start date is required"),
    end: Yup.date()
      .min(Yup.ref("start"), "End date must be after start date")
      .required("End date is required"),
  });

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} locale="en">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form>
            <Field
              name="title"
              label="Title"
              fullWidth
              margin="normal"
              as={TextField}
              error={touched.title && errors.title}
              helperText={touched.title && errors.title}
            />

            <Field
              name="start"
              label="Start Date"
              fullWidth
              margin="normal"
              component={({ field }) => (
                <DateTimePicker
                  {...field}
                  value={field.value}
                  onChange={(date) => setFieldValue("start", date.toDate())} // Conversion en objet Date JS
                />
              )}
              error={touched.start && errors.start}
              helperText={touched.start && errors.start}
            />

            <Field
              name="end"
              label="End Date"
              fullWidth
              margin="normal"
              component={({ field }) => (
                <DateTimePicker
                  {...field}
                  value={field.value}
                  onChange={(date) => setFieldValue("end", date.toDate())} // Conversion en objet Date JS
                />
              )}
              error={touched.end && errors.end}
              helperText={touched.end && errors.end}
            />

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </Form>
        )}
      </Formik>
    </LocalizationProvider>
  );
};

export default EventForm;
