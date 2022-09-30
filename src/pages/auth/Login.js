import { Box, Stack, TextField, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { Whitespace } from '../../Elements';
import { useTranslation } from '../../languages';
import { loginValidation } from '../../utils/helper';
const UserUnfo = () => {
  const navigate = useNavigate();
  const t = useTranslation('nl');
  const [inputData, setinputData] = useState({});
  const [error, setError] = useState('');
  const { user, signIn } = UserAuth();

  useEffect(() => {
    if (user) return navigate('/de-kist/dashboard');
  }, [navigate, user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setinputData({ ...inputData, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = loginValidation(inputData);
    if (Object.keys(errors).length !== 0) return setError(errors);
    try {
      await signIn(inputData.email, inputData.password);
      navigate('/de-kist/dashboard');
    } catch (err) {
      const errors = {};
      errors.custom = 'Email or password is incorrect';
      return setError(errors);
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
      <Whitespace height={30} />
      <Typography variant='h5' align='center' color={'GrayText'}>
        {t('Login')}
      </Typography>
      <Whitespace height={5} />
      {error.custom && (
        <>
          <Whitespace height={10} />
          <Alert severity='error'>{t(error.custom)}</Alert>
          <Whitespace height={10} />
        </>
      )}
      <Box component='form' onSubmit={handleSubmit} autoComplete='off'>
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
        <Whitespace height={8} />
        <TextField
          id='standard-basic'
          label={t('Password')}
          variant='standard'
          margin='dense'
          name='password'
          onChange={handleChange}
          fullWidth
          error={!!error?.password}
          helperText={error?.password && t(error.password)}
        />
        <Whitespace height={36} />
        <Stack direction={'row'}>
          <button>{t('Submit')}</button>
        </Stack>
      </Box>
    </div>
  );
};

export default UserUnfo;
