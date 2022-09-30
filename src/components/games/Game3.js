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

const Game3 = ({ onNext }) => {
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
        url={t('game3VideoUrl')}
      />

      <HintsDialog
        ref={dialog_1}
        hints={[
          {
            bought: room?.bought_hints?.hint_3a,
            penalty_minutes: 1,
            onBuy: () => {
              set(child(room_ref, 'bought_hints/hint_3a'), true);
            },
            text: t('hintText_3a'),
          },
          {
            bought: room?.bought_hints?.hint_3b,
            penalty_minutes: 3,
            onBuy: () => {
              set(child(room_ref, 'bought_hints/hint_3b'), true);
            },
            text: t('hintText_3b'),
          },

          {
            bought: room?.bought_hints?.hint_3c,
            penalty_minutes: 5,
            onBuy: () => {
              set(child(room_ref, 'bought_hints/hint_3c'), true);
            },
            text: t('hintText_3c'),
          },
        ]}
      />
      <a
        href='https://www.instagram.com/reel/Chr5EK_I0Fx/'
        target='_blank'
        rel='noopener noreferrer'
        style={{ alignSelf: `center` }}
      >
        <img
          // @ts-ignore
          src={assets.images.clues.game3Clue}
          style={{
            width: '100%',
            padding: 16,
            maxWidth: 100,
            alignSelf: `center`,
            transform: `translateY(10px)`,
          }}
          alt='icon'
        />
      </a>
      <div style={{ textAlign: 'center' }}>{t('game3ClueText')}</div>
      <Whitespace height={16} />
      <div style={{textAlign: 'center'}}>{t('Ga daarna naar deze afdeling en scan een van de WorkSmartPlayHard stickers.')}</div>  
     
      <BarcodeScanner codes={['31153']} onNext={onNext} />

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

export default Game3;
