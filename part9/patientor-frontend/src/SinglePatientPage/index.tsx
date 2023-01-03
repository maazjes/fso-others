import axios from 'axios';
import { useEffect } from 'react';
import { useStateValue } from '../state';
import { apiBaseUrl } from '../constants';
import { EntryFormValues, Patient } from '../types';
import { useParams } from 'react-router-dom';
import { changePatient, addEntry } from '../state/reducer';
import Entry from '../components/Entry';
import AddEntryForm from './AddEntryForm';
import { NewEntry, Entry as EntryType } from '../types';

const SinglePatientPage = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return null;
  }
  useEffect(() => {
    const getPatient = async () => {
      const { data: freshPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch(changePatient(freshPatient));
    };
    void getPatient();
  }, []);
  const submitNewEntry = async (values: EntryFormValues) => {
    const newEntry: NewEntry = {
      ...values,
      sickLeave: { startDate: values.sickLeaveStartDate, endDate: values.sickLeaveEndDate },
      discharge: { date: values.dischargeDate, criteria: values.dischargeCriteria }
    };
    try {
      const { data: result } = await axios.post<EntryType>(`${apiBaseUrl}/patients/${id}/entries`, newEntry);
      dispatch(addEntry(result));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error');
      }
    }
  };
  return (
    <div>
      <h2>{patient?.name}</h2>
      gender: {patient?.gender}
      <br />
      ssh: {patient?.ssn}
      <br />
      occupation: {patient?.occupation}
      <h3>entries</h3>
      {patient?.entries.map((entry) => (
        <Entry key={entry.id} entry={entry} />
      ))}
      <br />
      <h2>add entry</h2>
      <AddEntryForm onSubmit={submitNewEntry} />
    </div>
  );
};

export default SinglePatientPage;
