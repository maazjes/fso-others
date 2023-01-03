import { Entry as EntryType, HealthCheckRating } from '../types';
import { assertNever } from '../utils';
import { useStateValue } from '../state';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BusinessIcon from '@mui/icons-material/Business';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

const Entry = ({ entry }: { entry: EntryType }) => {
  const [{ diagnoses }] = useStateValue();
  const baseStyle = { border: '2px solid', padding: 5, margin: 8 };
  console.log(entry.diagnosisCodes);
  const entryCodes =
    entry.diagnosisCodes && entry.diagnosisCodes.length !== 0 ? (
      <div>
        <br />
        <b>diagnosis codes</b>
        <ul>
          {entry.diagnosisCodes.map((code) => {
            const found = diagnoses.find((d) => d.code === code);
            return (
              <li key={code}>
                {code} {found ? found.name : null}
              </li>
            );
          })}
        </ul>
      </div>
    ) : (
      <br />
    );

  switch (entry.type) {
    case 'Hospital':
      return (
        <div style={baseStyle}>
          {entry.date} <LocalHospitalIcon />
          <br />
          {entry.description}
          <br />
          <br />
          {`${entry.discharge.date} `}
          <i>{`${entry.discharge.criteria}`}</i>
          {entryCodes}
          {`diagnose by ${entry.specialist}`}
        </div>
      );
    case 'OccupationalHealthcare':
      return (
        <div style={baseStyle}>
          {entry.date} <BusinessIcon />
          <br />
          {entry.description}
          <br />
          {`employer: ${entry.employerName}`}
          <br />
          {entry.sickLeave ? `sickleave from ${entry.sickLeave.startDate} to ${entry.sickLeave.endDate}` : null}
          {entryCodes}
          {`diagnose by ${entry.specialist}`}
        </div>
      );
    case 'HealthCheck':
      return (
        <div style={baseStyle}>
          {entry.date}
          <PlaylistAddCheckIcon />
          <br />
          {entry.description}
          <br />
          {`Health check rating: ${HealthCheckRating[entry.healthCheckRating]}`}
          {entryCodes}
          {`diagnose by ${entry.specialist}`}
        </div>
      );
    default:
      return assertNever(entry);
  }
};

export default Entry;
