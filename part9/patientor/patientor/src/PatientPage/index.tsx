import React from 'react';
import axios from 'axios';

import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { useParams } from 'react-router-dom';
import { setFetchedPatient } from '../state';
const PatientPage: React.FC = () => {
  const [{ confidentialPatientDetails }, dispatch] = useStateValue();
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

    if (confidentialPatientDetails[id]) {
      setPatient(confidentialPatientDetails[id]);
    } else {
      getPatient();
    }
  }, [dispatch, id, confidentialPatientDetails]);

  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      <h1>{patient.name}</h1>
      <div>
        <b>SSN:</b> {patient.ssn}
      </div>
      <div>
        <b>Occupation:</b> {patient.occupation}
      </div>
    </div>
  );
};

export default PatientPage;
