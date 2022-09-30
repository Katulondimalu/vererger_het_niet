import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';
import { equalTo, orderByChild, query, ref } from 'firebase/database';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { Whitespace } from '../../Elements';
import { useTranslation } from '../../languages';
import { database, useFirebase } from '../../utils/firebase';
import { objectToArray, saveAsExcel } from '../../utils/helper';

const Index = () => {
  const t = useTranslation('nl');
  const navigate = useNavigate();
  const { logout } = UserAuth();
  const [loading, setloading] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/de-kist/login');
    } catch (e) {
      console.log(e.message);
    }
  };

  const users = useFirebase(
    query(
      ref(database, `users`),
      orderByChild(`date`),
      equalTo(`${format(new Date(), 'dd-MM-yyyy')}`)
    )
  );

  const handleExport = () => {
    if (users === undefined || users === null) return;
    if (Object.keys(users).length === 0) return;
    setloading(true);
    const isExport = saveAsExcel(objectToArray(users));
    return setloading(isExport);
  };

  return (
    <Stack direction={'column'} sx={{ padding: '1rem' }}>
      <Typography variant='h5' align='center' color={'CaptionText'}>
        {t('Welcome to admin dashboard')}
      </Typography>
      <Whitespace height={36} />
      <Typography variant='p' align='center' color={'CaptionText'}>
        {t('Click the button below to export gamers information')}
      </Typography>
      <Whitespace height={36} />
      <Stack direction='row' spacing={2}>
        <Button
          variant='contained'
          color='error'
          endIcon={<ExitToAppIcon />}
          onClick={handleLogout}
        >
          {t('Logout')}
        </Button>
        <Button
          variant='contained'
          color='success'
          endIcon={!loading && <DownloadForOfflineIcon />}
          onClick={handleExport}
        >
          {loading ? (
            <CircularProgress color='inherit' size={25} />
          ) : (
            t('Export')
          )}
        </Button>
      </Stack>
    </Stack>
  );
};

export default Index;
