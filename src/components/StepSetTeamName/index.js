import { TextField } from '@mui/material';
import { set } from 'firebase/database';
import React, { useContext, useState } from 'react';
import { Whitespace } from '../../Elements';
import { useTranslation } from '../../languages';
import { DevButton } from '../DevButton';

const StepSetTeamName = ({ onNext, RoomContext }) => {
  const [team_name, setteam_name] = useState('');
  const [error, setError] = useState('');
  const room_ref = useContext(RoomContext);
  const t = useTranslation();
  const handleSubmit = () => {
    if (team_name === '') return setError(t('please set team name first'));
    set(room_ref, { team_name: team_name, date: Date.now() });
    onNext();
  };
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-around',
      }}
    >
      <DevButton onClick={onNext} />

      <Whitespace height={16} />
      <h1 style={{ textAlign: 'center' }}>{t('The Box')}</h1>
      <Whitespace height={16} />
      <div
        style={{
          backgroundColor: 'white',
          margin: 16,
          padding: '20px 25px',
          borderRadius: 20,
          boxShadow: 'rgb(0 0 0 / 6%) 0px 1px 12px',

          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <b style={{ color: 'black', fontSize: 20 }}>
          {t('Choose a team name')}
        </b>
        <Whitespace height={16} />
        <TextField
          id='standard-basic'
          label={t('Team Name')}
          variant='standard'
          margin='dense'
          name='team_name'
          required
          onChange={(e) => setteam_name(e.target.value)}
          fullWidth
          error={!!error}
          helperText={error && error}
        />
      </div>

      <Whitespace height={16} />

      <div style={{ padding: 20 }}>
        <button onClick={handleSubmit}>{t('Continue')}</button>
      </div>
    </div>
  );
};

export default StepSetTeamName;
