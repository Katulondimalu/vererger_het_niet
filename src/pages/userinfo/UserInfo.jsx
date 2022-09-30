import {
  Alert,
  Box,
  Checkbox,
  ImageListItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { ref, set } from 'firebase/database';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import assets from '../../assets';
import Topbar from '../../components/topbar/Topbar';
import { Whitespace } from '../../Elements';
import { useTranslation } from '../../languages';
import { database } from '../../utils/firebase';
import { validation } from '../../utils/helper';
const UserUnfo = ({ to }) => {
  const navigate = useNavigate();
  const t = useTranslation();
  const { id } = useParams();
  const user_ref = ref(database, `users/${id}`);
  const [checked, setChecked] = useState(true);
  const [inputData, setinputData] = useState({});
  const [error, setError] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setinputData({ ...inputData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!checked) {
      setError({ custom: 'please click on privacy policy' });
      return;
    }
    const errors = validation(inputData);
    if (Object.keys(errors).length !== 0) return setError(errors);

    try {
      setError('');
      set(user_ref, {
        ...inputData,
        room_id: id,
        date: format(new Date(), 'dd-MM-yyyy'),
      });
      navigate(to);
    } catch (error) {
      setError({ custom: 'something is wrong!' });
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        padding: '0px 16px',
      }}
    >
      <Topbar />
      <Whitespace height={10} />
      <Typography variant='p' align='center'>
        {t(
          'Mediamarkt is doing a giveaway for the participants of the game. By entering your contact information down below, you enter the raffle and have a chance to'
        )}{' '}
        <strong>{t('win an XBOX')}</strong>.
      </Typography>
      <ImageListItem>
        <img
          src={assets.images.common.xbox}
          srcSet={assets.images.common.xbox}
          alt='x-box icon'
          loading='lazy'
        />
      </ImageListItem>
      {error && error.custom && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Whitespace height={5} />
          <Alert severity='error'>{error?.custom}</Alert>
        </Stack>
      )}
      <Whitespace height={5} />
      <Box component='form' onSubmit={handleSubmit} autoComplete='off'>
        <TextField
          id='standard-basic'
          label={t('Name')}
          variant='standard'
          margin='dense'
          name='name'
          onChange={handleChange}
          fullWidth
          error={!!error?.name}
          helperText={error?.name && t(error.name)}
        />
        <TextField
          id='standard-basic'
          label={t('Email')}
          variant='standard'
          margin='dense'
          name='email'
          onChange={handleChange}
          fullWidth
          error={!!error?.email}
          helperText={error?.email && t(error.email)}
        />
        <Stack spacing={2} direction='row'>
          <TextField
            id='standard-basic'
            label={t('Age')}
            variant='standard'
            name='age'
            onChange={handleChange}
            error={!!error?.age}
            helperText={error?.age && t(error.age)}
          />
          <TextField
            id='standard-basic'
            label={t('City')}
            variant='standard'
            name='city'
            onChange={handleChange}
            error={!!error?.city}
            helperText={error?.city && t(error.city)}
          />
        </Stack>

        <TextField
          id='standard-basic'
          label={t('Phone')}
          variant='standard'
          margin='dense'
          name='phone'
          onChange={handleChange}
          fullWidth
          error={!!error?.phone}
          helperText={error?.phone && t(error.phone)}
        />
        <Stack direction={'row'}>
          <Checkbox
            checked={checked}
            onChange={() => setChecked(!checked)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <Typography variant='p' sx={{ marginTop: '8px' }}>
            {t(
              'By entering your contact information you agree that this information can be used by MediaMarkt for commercial purposes.'
            )}
          </Typography>
        </Stack>
        <Whitespace height={16} />
        <Stack direction={'row'} spacing={2}>
          <button>{t('Submit')}</button>
          <button onClick={() => navigate(to)}>{t('Skip')}</button>
        </Stack>
      </Box>
    </div>
  );
};

export default UserUnfo;
