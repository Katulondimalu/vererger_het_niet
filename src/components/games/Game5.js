import { child, set } from 'firebase/database';
import React, { useContext } from 'react';
import assets from '../../assets'; 
import { RoomContext } from '../../context/BaseContext';
import { Whitespace } from '../../Elements';
import { useTranslation } from '../../languages';
import BarcodeScanner from '../../pages/barcode/BarcodeScanner';
import { HintsDialog, PreviousMediaDialog } from '../../utils/Dialog';
import { useFirebase } from '../../utils/firebase';
import { useDialogRef } from '../../utils/use';
import { DevButton } from '../DevButton';
import InlineVideo from '../InlineVideo';

const Game5 = ({ onNext }) => {
  let t = useTranslation();
  let dialog_1 = useDialogRef();
  let previous_media_dialog = useDialogRef();
  let room_ref = useContext(RoomContext);
  let room = useFirebase(room_ref);

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
    >
      <DevButton onClick={onNext} />

      <PreviousMediaDialog
        ref={previous_media_dialog}
        url={t(
          'https://firebasestorage.googleapis.com/v0/b/de-kist.appspot.com/o/Filmpjes%20Engels%2FSpel%205%20-%20ondertiteld%20-%20Engels.mp4?alt=media&token=f88703aa-d7e2-4a3c-8a01-2a0bf6a9345b'
        )}
      />

      <HintsDialog
        ref={dialog_1}
        hints={[
          {
            bought: room?.bought_hints?.hint_5a,
            penalty_minutes: 1,
            onBuy: () => {
              set(child(room_ref, 'bought_hints/hint_5a'), true);
            },
            text: t('Start from the drawn position.'),
          },
          {
            bought: room?.bought_hints?.hint_5b,
            penalty_minutes: 3,
            onBuy: () => {
              set(child(room_ref, 'bought_hints/hint_5b'), true);
            },
            text: t(
              'The number of steps to be taken to turn the disc is indicated by the hands of the clocks.'
            ),
          },

          {
            bought: room?.bought_hints?.hint_5c,
            penalty_minutes: 5,
            onBuy: () => {
              set(child(room_ref, 'bought_hints/hint_5c'), true);
            },
            text: (
              <div>
                {t(
                  'After turning the three discs, you get the following code.'
                )}
                <img
                  style={{
                    width: '100%',
                    filter: 'invert(1)',
                    marginTop: 8,
                    borderRadius: 20,
                  }}
                  // @ts-ignore
                  src={assets.images.hits.Spel5Hint3}
                  alt='icon'
                />
                <Whitespace height={8} />
                <InlineVideo src='https://firebasestorage.googleapis.com/v0/b/de-kist.appspot.com/o/Laatste%20hint%2F5.%20Draaischijf.mp4?alt=media&token=7a750928-0357-46be-9654-1821ee968790' />
              </div>
            ),
          },
        ]}
      />

      <BarcodeScanner
        codes={[
          '123',
          '1234',
          '12345',
          '2014088515046253',
          '889842505061',
          'RRS-00009',
          '149925221417',
          '889842651393',
          '1628426',
          '42743'
        ]}
        onNext={onNext}
      />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          marginTop: '1rem',
        }}
      >
        <button
          className='outline'
          onClick={() => {
            previous_media_dialog.current.showModal();
          }}
        >
          {t('Video')}
        </button>
        <div style={{ width: 16 }} />
        <button onClick={() => dialog_1.current.showModal()}>
          {t('Hints')}
        </button>
      </div>
    </div>
  );
};

export default Game5;