import React from 'react';
import axios from 'axios';

import { Patient, Entry, Diagnosis } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { useParams } from 'react-router-dom';
import { setFetchedPatient, setDiagnosisList } from '../state';
const PatientPage: React.FC = () => {
  const [
    { confidentialPatientDetails, diagnosisList },
    dispatch
  ] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = React.useState<Patient | undefined>();
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
      <h1>{patient.name}</h1>
      <div>
        <b>SSN:</b> {patient.ssn}
      </div>
      <div>
        <b>Occupation:</b> {patient.occupation}
      </div>
      {patient.entries.length > 0 && (
        <div>
          <h2>Entries</h2>
          {patient.entries.map((entry: Entry) => {
            return (
              <div key={entry.id}>
                <p>
                  {entry.date} {entry.description}
                </p>
                <ul>
                  {entry.diagnosisCodes &&
                    entry.diagnosisCodes.map(
                      (diagonsisCode: Diagnosis['code']) => (
                        <li key={diagonsisCode}>
                          {diagonsisCode}{' '}
                          {diagnosisList[diagonsisCode] &&
                            diagnosisList[diagonsisCode].name}
                        </li>
                      )
                    )}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PatientPage;
