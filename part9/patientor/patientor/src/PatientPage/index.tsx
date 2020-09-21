import React from 'react';
import axios from 'axios';
import { Patient, Entry, Diagnosis, newEntry } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { useParams } from 'react-router-dom';
import {
  setFetchedPatient,
  setDiagnosisList,
  setEntrytoPatient
} from '../state';
import EntryDetails from '../components/EntryDetails';
import HealthCheckEntryForm from './HealthCheckEntryForm';
import { Button } from 'semantic-ui-react';

import HospitalEntryForm from './HospitalEntryForm';
import OccupationalEntryForm from './OccupationalEntryForm';
const PatientPage: React.FC = () => {
  const [
    { confidentialPatientDetails, diagnosisList },
    dispatch
  ] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = React.useState<Patient | undefined>();
  const [showForm, setShowForm] = React.useState<Boolean | true>();
  const [entryType, setEntryType] = React.useState<
    String | 'HealthCheckEntry'
  >();
  const [error, setError] = React.useState<String | undefined>();

  const onSubmit = async (values: newEntry) => {
    console.log(values);
    try {
      const { data: newEntryDetails } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      console.log('after post', newEntryDetails);
      dispatch(setEntrytoPatient(newEntryDetails, id));
      setShowForm(false);
    } catch (e) {
      console.error(e.response.data);
      setErrorMessage(e.response.data);
    }
  };

  const onCancel = (): void => {
    setShowForm(false);
  };

  const setErrorMessage = (message: string) => {
    setError(message);
    setTimeout(() => setError(undefined), 5000);
  };

  React.useEffect(() => {
    async function getPatient() {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setFetchedPatient(patient));
        setPatient(patient);
      } catch (error) {
        console.error(error);
        setErrorMessage(error.response.data);
      }
    }
    async function fetchDiagnosisList() {
      try {
        const { data: diagnosisList } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosisList(diagnosisList));
      } catch (error) {
        console.log(error);
      }
    }

    if (confidentialPatientDetails[id]) {
      setPatient(confidentialPatientDetails[id]);
    } else {
      getPatient();
    }

    if (Object.values(diagnosisList).length === 0) {
      fetchDiagnosisList();
    }
  }, [dispatch, id, confidentialPatientDetails, diagnosisList]);

  if (!patient || !diagnosisList) return <div>Loading...</div>;

  return (
    <div>
      {error && (
        <div style={{ padding: '10px', border: '2px solid red' }}>{error}</div>
      )}
      <h1>{patient.name}</h1>
      <div>
        <b>SSN:</b> {patient.ssn}
      </div>
      <div>
        <b>Occupation:</b> {patient.occupation}
      </div>
      <Button
        onClick={() => {
          showForm ? setShowForm(false) : setShowForm(true);
        }}
      >
        Add Entry
      </Button>
      <select onChange={(e) => setEntryType(e.target.value)}>
        <option value="HealthCheckEntry">HealthCheckEntry</option>
        <option value="HospitalEntry">HospitalEntry</option>
        <option value="OccupationalHealthcareEntry">
          OccupationalHealthcareEntry
        </option>
      </select>

      {showForm && entryType === 'HealthCheckEntry' && (
        <HealthCheckEntryForm onSubmit={onSubmit} onCancel={onCancel} />
      )}
      {showForm && entryType === 'HospitalEntry' && (
        <HospitalEntryForm onSubmit={onSubmit} onCancel={onCancel} />
      )}
      {showForm && entryType === 'OccupationalHealthcareEntry' && (
        <OccupationalEntryForm onSubmit={onSubmit} onCancel={onCancel} />
      )}

      {patient.entries.length > 0 && (
        <div>
          <h2>Entries</h2>
          {patient.entries.map((entry: Entry) => {
            return (
              <div
                style={{
                  border: 'solid 2px',
                  marginTop: 10,
                  marginBottom: 10,
                  padding: 5,
                  boxShadow: '3px 5px grey'
                }}
                key={entry.id}
              >
                <EntryDetails entry={entry} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PatientPage;
