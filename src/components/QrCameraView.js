import QrScanner from 'qr-scanner';
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from '../languages';
import { useIsDevelopment } from '../utils/use-is-development';

let Subtext = styled.div`
  margin-left: 30px;
  margin-right: 30px;
  text-align: center;
  color: var(--button-color);
  font-weight: bold;
`;

export let QrCameraView = ({ onScan, code }) => {
  let video_ref = React.useRef();
  let [recording, set_recording] = React.useState(false);
  let [error, set_error] = React.useState(null);

  let t = useTranslation();
  let is_dev = useIsDevelopment();

  let qr_scanner_ref = React.useRef(null);

  React.useLayoutEffect(() => {
    const qrScanner = new QrScanner(
      video_ref.current,
      (result) => {
        console.log('decoded qr code:', result.data);
        console.log(`code:`, code);

        if (result.data === code) {
          onScan();
        }
      },
      {
        onDecodeError: (err) => {
          if (is_dev) {
            console.log(`Camera acivation error:`, err);
          }
        },
        returnDetailedScanResult: true,
      }
    );

    qr_scanner_ref.current = qrScanner;

    qrScanner
      .start()
      .then(() => {
        set_recording(true);
        set_error(null);
      })
      .catch((err) => {
        set_recording(false);
        console.log(`Error loading camera:`, err);
        set_error(err);
      });

    return () => {
      qrScanner.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: 'var(--background-color)',
        marginLeft: 16,
        marginRight: 16,
        display: 'flex',
        padding: 4,
        minHeight: `min(300px, 60vh)`,
        maxHeight: `60vh`,
      }}
      className='cool-border-thing'
    >
      <video
        muted
        style={{
          width: '100%',
          minHeight: `100%`,
          objectFit: `cover`,
          objectPosition: `center`,
          backgroundColor: `var(--button-color)`,
        }}
        ref={video_ref}
      ></video>
      {recording === false && (
        <div
          style={{
            position: 'absolute',
            top: 4,
            left: 4,
            bottom: 4,
            right: 4,
            backgroundColor: 'var(--button-color)',
            color: 'white',

            // flex center
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div>{t('Waiting for camera...')}</div>
        </div>
      )}

      {error != null && (
        <div
          style={{
            position: 'absolute',
            top: 4,
            left: 4,
            bottom: 4,
            right: 4,
            backgroundColor: 'var(--button-color)',
            color: 'white',

            // flex center
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            padding: 16,
          }}
          onClick={() => {
            console.log('Hiii');
            qr_scanner_ref.current
              .start()
              .then(() => {
                set_recording(true);
                set_error(null);
              })
              .catch((err) => {
                window.location.reload();
              });
          }}
        >
          <span style={{ textAlign: 'center' }}>
            {t('There was a problem loading the camera.. Tap to try again.')}
          </span>
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          right: 0,
          left: 0,
          top: '100%',
          backgroundColor: 'transparent',
        }}
      >
        <Subtext>{t('Scan the correct QR code to continue')}</Subtext>
      </div>
    </div>
  );
};
