import {
  ArrowForward,
  Close,
  Phone,
  PhoneDisabled,
  PhoneInTalk,
} from '@mui/icons-material';
import React from 'react';
import assets from '../assets';
import { Whitespace } from '../Elements';
import { useTranslation } from '../languages';
import { Dialog } from '../utils/Dialog';
import { useDialogRef } from '../utils/use';
import { PhoneButton } from './phone-number-view';

let PHONE_WAIT_TIMEOUT = 8 * 1000;

export let GoodPhoneCallScreen = React.forwardRef(
  (
    /** @type {{ phone_number: string, onNext: () => void }} */ {
      phone_number,
      onNext,
    },
    /** @type {React.ForwardedRef<HTMLDialogElement>} */ ref
  ) => {
    /** @type {import("react").MutableRefObject<HTMLAudioElement>} */
    let audio_ref = React.useRef();

    let dialog_ref = useDialogRef();

    let [animation_frame, set_animation_frame] = React.useState(0);
    React.useEffect(() => {
      let interval = setInterval(() => {
        set_animation_frame((animation_frame) => (animation_frame + 1) % 2);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }, [set_animation_frame]);

    let [has_picked_up_the_phone, set_has_picked_up_the_phone] =
      React.useState(false);

    let [is_calling, set_is_calling] = React.useState(true);
    let t = useTranslation();

    // @ts-ignore
    ref.current = {
      showModal() {
        dialog_ref.current.showModal();
        audio_ref.current.play();
        setTimeout(() => {
          if (dialog_ref.current.open) {
            set_has_picked_up_the_phone(true);
          }
        }, PHONE_WAIT_TIMEOUT);
      },
    };

    return (
      <Dialog
        className='fancy-backdrop'
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            e.currentTarget.close();
          }
        }}
        style={{
          height: '100%',
          flexDirection: 'column',
        }}
        ref={dialog_ref}
        // @ts-ignore
        onClose={() => {
          audio_ref.current.pause();
          audio_ref.current.currentTime = 0;
          set_is_calling(true);
          set_has_picked_up_the_phone(false);
        }}
      >
        <audio
          // @ts-ignore
          src={assets.audio.telefoonGoed}
          ref={audio_ref}
          onEnded={() => {
            set_is_calling(false);
          }}
        />
        {is_calling ? (
          <div
            style={{
              alignItems: 'stretch',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
              margin: 'auto',
              width: '100%',

              flex: 1,
              pointerEvents: 'none',
            }}
          >
            <div style={{ alignSelf: 'center' }}>
              {animation_frame === 0 ? (
                <Phone style={{ fontSize: 100 }} />
              ) : (
                <PhoneInTalk style={{ fontSize: 100 }} />
              )}
            </div>
            <Whitespace height={16} />

            <div style={{ textAlign: 'center' }}>
              <h3 style={{ margin: 0 }}>{t('Calling')}</h3>
              <h1 style={{ margin: 0 }}>+{phone_number}</h1>
            </div>
          </div>
        ) : (
          <div
            style={{
              alignItems: 'stretch',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
              margin: 'auto',

              width: '100%',
              flex: 1,
              pointerEvents: 'none',
            }}
          >
            <div style={{ alignSelf: 'center', color: 'white' }}>
              <PhoneDisabled
                style={{ fontSize: 100, transform: `scaleX(-1)` }}
              />
            </div>
            <Whitespace height={16} />

            <div style={{ textAlign: 'center', color: 'white' }}>
              <h3 style={{ margin: 0 }}>{t('Call ended')}</h3>
              <h1 style={{ margin: 0 }}>+{phone_number}</h1>
            </div>
          </div>
        )}
        {is_calling && !has_picked_up_the_phone ? (
          <PhoneButton
            style={{
              backgroundColor: 'red',
              minHeight: 60,
              height: 60,
              minWidth: 60,
              width: 60,
              alignSelf: 'center',
            }}
            onClick={() => {
              dialog_ref.current.close();
            }}
          >
            <Close style={{ color: 'white' }} />
          </PhoneButton>
        ) : (
          <PhoneButton
            style={{
              backgroundColor: 'green',
              minHeight: 60,
              height: 60,
              minWidth: 60,
              width: 60,
              alignSelf: 'center',
              borderRadius: 30,
            }}
            onClick={() => {
              onNext();
            }}
          >
            <ArrowForward style={{ color: 'white' }} />
          </PhoneButton>
        )}{' '}
      </Dialog>
    );
  }
);

export let WrongPhoneCallScreen = React.forwardRef(
  (
    /** @type {{ phone_number: string }} */ { phone_number },
    /** @type {React.ForwardedRef<HTMLDialogElement>} */ ref
  ) => {
    /** @type {import("react").MutableRefObject<HTMLAudioElement>} */
    let audio_ref = React.useRef();

    let dialog_ref = useDialogRef();

    let [animation_frame, set_animation_frame] = React.useState(0);
    React.useEffect(() => {
      let interval = setInterval(() => {
        set_animation_frame((animation_frame) => (animation_frame + 1) % 2);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }, [set_animation_frame]);

    let [is_calling, set_is_calling] = React.useState(true);
    let t = useTranslation();

    // @ts-ignore
    ref.current = {
      showModal() {
        dialog_ref.current.showModal();
        audio_ref.current.play();
      },
    };

    return (
      <Dialog
        className='fancy-backdrop'
        onClick={(e) => {
          if (is_calling === false && e.target === e.currentTarget) {
            e.currentTarget.close();
          }
        }}
        style={{
          height: '100%',
          flexDirection: 'column',
        }}
        ref={dialog_ref}
        // @ts-ignore
        onClose={() => {
          audio_ref.current.pause();
          audio_ref.current.currentTime = 0;
          set_is_calling(true);
        }}
      >
        <audio
          // @ts-ignore
          src={assets.audio.telefoonNfout}
          ref={audio_ref}
          onEnded={() => {
            set_is_calling(false);
            dialog_ref.current.animate(
              [
                { transform: 'translateX(0)', easing: 'ease-in-out' },
                { transform: 'translateX(-20px)', easing: 'ease-in-out' },
                { transform: 'translateX(20px)', easing: 'ease-in-out' },
                { transform: 'translateX(-10px)', easing: 'ease-in-out' },
                { transform: 'translateX(10px)', easing: 'ease-in-out' },
                { transform: 'translateX(0)', easing: 'ease-in-out' },
              ],
              {
                duration: 500,
                easing: 'ease-in-out',
              }
            );
          }}
        />

        {is_calling ? (
          <div
            style={{
              alignItems: 'stretch',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
              margin: 'auto',
              width: '100%',

              flex: 1,
              pointerEvents: 'none',
            }}
          >
            <div style={{ alignSelf: 'center' }}>
              {animation_frame === 0 ? (
                <Phone style={{ fontSize: 100 }} />
              ) : (
                <PhoneInTalk style={{ fontSize: 100 }} />
              )}
            </div>
            <Whitespace height={16} />

            <div style={{ textAlign: 'center' }}>
              <h3 style={{ margin: 0 }}>{t('Calling')}</h3>
              <h1 style={{ margin: 0 }}>+{phone_number}</h1>
            </div>
          </div>
        ) : (
          <div
            style={{
              alignItems: 'stretch',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
              margin: 'auto',

              width: '100%',
              flex: 1,
              pointerEvents: 'none',
            }}
          >
            <div style={{ alignSelf: 'center', color: 'white' }}>
              <PhoneDisabled
                style={{ fontSize: 100, transform: `scaleX(-1)` }}
              />
            </div>
            <Whitespace height={16} />

            <div style={{ textAlign: 'center', color: 'white' }}>
              <h3 style={{ margin: 0 }}>{t('Not answered')}</h3>
              <h1 style={{ margin: 0 }}>+{phone_number}</h1>
            </div>
          </div>
        )}

        <PhoneButton
          style={{
            backgroundColor: 'red',
            minHeight: 60,
            height: 60,
            minWidth: 60,
            width: 60,
            alignSelf: 'center',
          }}
          onClick={() => {
            dialog_ref.current.close();
          }}
        >
          <Close style={{ color: 'white' }} />
        </PhoneButton>
      </Dialog>
    );
  }
);
