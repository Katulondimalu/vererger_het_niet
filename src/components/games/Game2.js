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

const Game2 = ({ onNext }) => {
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
        justifyContent: 'space-around',
      }}
    >
      <DevButton onClick={onNext} />

      <PreviousMediaDialog
        ref={previous_media_dialog}
        url={t('game2VideoUrl')}
      />
      <HintsDialog
        ref={dialog_1}
        hints={[
          {
            bought: room?.bought_hints?.hint_2a,
            penalty_minutes: 1,
            onBuy: () => {
              set(child(room_ref, 'bought_hints/hint_2a'), true);
            },
            text: t('hintText_2a'),
          },
          {
            bought: room?.bought_hints?.hint_2b,
            penalty_minutes: 3,
            onBuy: () => {
              set(child(room_ref, 'bought_hints/hint_2b'), true);
            },
            text: (
              <div>
                {t('hintText_2b')}
                <Whitespace height={8} />
                <img
                  style={{ width: '100%', filter: 'invert(1)' }}
                  // @ts-ignore
                  src={assets.images.hints.hint2b}
                  alt='icon'
                />
              </div>
            ),
          },
          {
            bought: room?.bought_hints?.hint_2c,
            penalty_minutes: 3,
            onBuy: () => {
              set(child(room_ref, 'bought_hints/hint_2c'), true);
            },
            text: t('hintText_2c'),
          },
        ]}
      />
      <img
        // @ts-ignore
        src={assets.images.clues.game2Clue}
        style={{
          width: '100%',
          padding: 16,
          maxWidth: 360,
          alignSelf: `center`,
          transform: `translateY(10px)`,
        }}
        alt='icon'
      />
      <div style={{ textAlign: 'center' }}>{t('game2ClueText')}</div>
      <Whitespace height={16} />
      <div style={{textAlign: 'center'}}>{t('Zoek het product in de winkel en scan de WorkHardPlaySmart sticker. Je kan ook het artikelnummerbordje of de barcode rechts boven op het product handmatig invoeren.')}</div>  
     
      <BarcodeScanner
        codes={[
          '24533',
          '889842505061',
          '889842374100',
          '889842563603',
          '889842504255',
          '8984250506',
          '8984237410',
          '8984256360',
          '8984250425',
          '12674863',
          '1617296',
          '1621533',
          '1621532',
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

export default Game2;
