import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';
import { DiagnosisSelection, SelectField, HealthcheckRatingOption, FormTypeOption } from '../AddPatientModal/FormField';
import { TextField } from '../AddPatientModal/FormField';
import { EntryFormValues, HealthCheckRating } from '../types';
import { useStateValue } from '../state';
import { isDate } from '../utils';

interface Props {
  onSubmit: (values: EntryFormValues) => void;
}

const healthcheckRatingOptions: HealthcheckRatingOption[] = [
  { value: HealthCheckRating.LowRisk, label: 'Low risk' },
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.HighRisk, label: 'High risk' },
  { value: HealthCheckRating.CriticalRisk, label: 'Critical risk' }
];

const formTypeOptions: FormTypeOption[] = [
  { value: 'Hospital', label: 'Hospital' },
  { value: 'OccupationalHealthcare', label: 'Occupational healthcare' },
  { value: 'HealthCheck', label: 'Healthcheck' }
];

export const AddEntryForm = ({ onSubmit }: Props) => {
  const [{ diagnoses }] = useStateValue();
  const initialValues: EntryFormValues = {
    type: 'Hospital',
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [],
    dischargeDate: '',
    dischargeCriteria: '',
    sickLeaveStartDate: '',
    sickLeaveEndDate: '',
    employerName: '',
    healthCheckRating: 0
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        // actions.resetForm({ values: initialValues });
        onSubmit(values);
      }}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        } else if (!isDate(values.date)) {
          errors.date = 'incorrect date';
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
        }
        if (values.type === 'Hospital') {
          if (!values.dischargeDate) {
            errors.dischargeDate = requiredError;
          } else if (!isDate(values.dischargeDate)) {
            errors.dischargeDate = 'incorrect date';
          }
          if (!values.dischargeCriteria) {
            errors.dischargeCriteria = requiredError;
          }
        }
        if (values.type === 'OccupationalHealthcare') {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
          if (!values.sickLeaveStartDate) {
            errors.sickLeaveStartDate = requiredError;
          } else if (!isDate(values.sickLeaveStartDate)) {
            errors.sickLeaveStartDate = 'incorrect date';
          }
          if (!values.sickLeaveEndDate) {
            errors.sickLeaveEndDate = requiredError;
          } else if (!isDate(values.sickLeaveEndDate)) {
            errors.sickLeaveEndDate = 'incorrect date';
          }
        }
        if (values.type === 'HealthCheck') {
          if (!Object.values(HealthCheckRating).includes(values.healthCheckRating)) {
            errors.healthCheckRating = requiredError;
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        console.log(values);
        return (
          <div>
            <Form className="form ui">
              <SelectField label="Entry type" name="type" options={formTypeOptions} />
              <Field label="Description" placeholder="Description" name="description" component={TextField} />
              <Field label="Date" placeholder="YYYY-MM-DD" name="date" component={TextField} />
              <Field label="Specialist" placeholder="Specialist" name="specialist" component={TextField} />
              <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={diagnoses}
              />
              {values.type === 'Hospital' ? (
                <div>
                  <Field label="Discharge date" placeholder="YYYY-MM-DD" name="dischargeDate" component={TextField} />
                  <Field
                    label="Discharge criteria"
                    placeholder="Discharge Criteria"
                    name="dischargeCriteria"
                    component={TextField}
                  />
                </div>
              ) : values.type === 'HealthCheck' ? (
                <SelectField label="Healthcheck rating" name="healthCheckRating" options={healthcheckRatingOptions} />
              ) : (
                <div>
                  <Field label="Employer name" placeholder="Employer name" name="employerName" component={TextField} />
                  <Field
                    label="Sickleave start date"
                    placeholder="YYYY-MM-DD"
                    name="sickLeaveStartDate"
                    component={TextField}
                  />
                  <Field
                    label="Sickleave end date"
                    placeholder="YYYY-MM-DD"
                    name="sickLeaveEndDate"
                    component={TextField}
                  />
                </div>
              )}
              <Grid>
                <Grid item>
                  <Button
                    style={{
                      float: 'right'
                    }}
                    type="submit"
                    variant="contained"
                    disabled={!dirty || !isValid}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
