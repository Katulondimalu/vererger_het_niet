import { IosShare } from '@mui/icons-material';
import React, { useContext } from 'react';
import { QRCode } from 'react-qr-svg';
import { Whitespace } from '../../Elements';
import { useTranslation } from '../../languages';
import { DevButton } from '../DevButton';

const StepConnectPhones = ({
  onNext,
  IsOptimusMasterControllerPrimeContext,
}) => {
  //let room_ref = useContext(RoomContext);
  //let room = useFirebase(room_ref);
  let t = useTranslation();
  let is_master = useContext(IsOptimusMasterControllerPrimeContext);

  let location_without_query_params = new URL(window.location.href);
  location_without_query_params.search = '';

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

      <h1 style={{ textAlign: 'center' }}>{t('#WorkSmartPlayHard')}</h1>
      <div style={{ minHeight: 16 }} />
      <div
        style={{
          backgroundColor: 'white',
          padding: 25,
          borderRadius: 20,
          boxShadow: 'rgb(0 0 0 / 6%) 0px 1px 12px',
          marginLeft: 16,
          marginRight: 16,

          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <QRCode
          value={location_without_query_params.toString()}
          style={{ height: 200, alignSelf: 'center' }}
        />
        <div style={{ marginTop: 16 }}>
          {t('Scan the qr code below to play on your own phone.')}
        </div>
        {navigator.share != null && (
          <div style={{ width: 200, marginTop: 16 }}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              href='#'
              onClick={() => {
                navigator.share({ url: window.location.toString() });
              }}
            >
              <IosShare />
              <div style={{ width: 8 }} />
              {t('Share game')}
            </a>
          </div>
        )}
      </div>
      <div style={{ minHeight: 16 }} />
      <div style={{ marginLeft: 16, marginRight: 16 }}>
        <button disabled={!is_master} onClick={onNext}>
          {t('Start Game')}
        </button>
      </div>

      <Whitespace height={8} />
    </div>
  );
};

export default StepConnectPhones;
