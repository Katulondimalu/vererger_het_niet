import { child, set } from 'firebase/database';
import React, { useContext } from 'react';
import assets from '../../assets';
import { RoomContext } from '../../context/BaseContext';
import { useTranslation } from '../../languages';
import BarcodeScanner from '../../pages/barcode/BarcodeScanner';
import { HintsDialog, PreviousMediaDialog } from '../../utils/Dialog';
import { useFirebase } from '../../utils/firebase';
import { useDialogRef } from '../../utils/use';
import { DevButton } from '../DevButton';
import { Whitespace } from '../../Elements';

const Game4 = ({ onNext }) => {
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
        url={t('game4VideoUrl')}
      />

      <HintsDialog
        ref={dialog_1}
        hints={[
          {
            bought: room?.bought_hints?.hint_4a,
            penalty_minutes: 1,
            onBuy: () => {
              set(child(room_ref, 'bought_hints/hint_4a'), true);
            },
            text: t('hintText_4a'),
          },
          {
            bought: room?.bought_hints?.hint_4b,
            penalty_minutes: 3,
            onBuy: () => {
              set(child(room_ref, 'bought_hints/hint_4b'), true);
            },
            text: t('hintText_4b'),
          },

          {
            bought: room?.bought_hints?.hint_4c,
            penalty_minutes: 5,
            onBuy: () => {
              set(child(room_ref, 'bought_hints/hint_4c'), true);
            },
            text: t('hintText_4c'),
          },
        ]}
      />
      <img
        // @ts-ignore
        src={assets.images.clues.game4Clue}
        style={{
          width: '100%',
          padding: 16,
          maxWidth: 360,
          alignSelf: `center`,
          transform: `translateY(10px)`,
        }}
        alt='icon'
      />
      <div style={{textAlign: 'center'}}>{t('game4ClueText')}</div>
      <Whitespace height={16} />
      <div style={{textAlign: 'center'}}>{t('Zoek het product in de winkel en scan de WorkHardPlaySmart sticker. Je kan ook het artikelnummerbordje van het product invoeren.')}</div>  
     
      <BarcodeScanner codes={['42743','1707154','1707153','1715513','1727790','1727789']} onNext={onNext} />

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

export default Game4;
