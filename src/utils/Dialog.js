import { Close, Lock } from '@mui/icons-material'
import dialogPolyfill from 'dialog-polyfill'
import 'dialog-polyfill/dist/dialog-polyfill.css'
import { child, set } from 'firebase/database'
import React, { forwardRef, useContext } from 'react'
import { IsHostControllerGame, RoomContext } from '../context/BaseContext'
import { useTranslation } from '../languages'
import { useFirebase } from './firebase'

export let Dialog = forwardRef(
  (
    /** @type {import("react").HTMLProps<HTMLDialogElement> & { onClose?: (e: CloseEvent) => void }} */ props,
    ref
  ) => {
    /** @type {import("react").MutableRefObject<HTMLDialogElement>} */
    let dialog_ref = /** @type {any} */ (ref)

    React.useLayoutEffect(() => {
      // @ts-ignore
      dialogPolyfill.registerDialog(dialog_ref.current)

      /** @type {NodeListOf<HTMLVideoElement>} */
      let playable_elements = dialog_ref.current.querySelectorAll(
        'video[autoplay], audio[autoplay]'
      )
      for (let element of playable_elements) {
        element.pause()
        element.currentTime = 0
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <dialog
        {...props}
        ref={dialog_ref}
        // @ts-ignore
        onClose={(e) => {
          let playable_elements =
            e.currentTarget.querySelectorAll('video, audio')
          for (let playable of playable_elements) {
            playable.pause()
          }
          props?.onClose?.(e)
        }}
      />
    )
  }
)

export let PreviousMediaDialog = forwardRef(
  (/** @type {{ url: string }} */ { url }, forward_ref) => {
    //let room_ref = useContext(RoomContext);
    //let room = useFirebase(room_ref);
    //let t = useTranslation();

    return (
      <Dialog
        className="fancy-backdrop"
        onClick={(e) => {
          // @ts-ignore
          if (e.target === e.currentTarget) e.target.close()
        }}
        ref={forward_ref}
        style={{
          color: 'white',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 16,

            margin: 'auto',

            width: '100%',

            backgroundColor: 'white',
            padding: 8,
          }}
        >
          <video
            controls
            preload="metadata"
            // autoPlay
            playsInline={false}
            // onEnded={() => {
            //   onNext();
            // }}
            style={{
              width: '100%',
              borderRadius: 8,
            }}
            src={`${url}#t=1`}
          />
        </div>
      </Dialog>
    )
  }
)

/**
 * @typedef THint
 * @type {{
 *  text: string,
 *  bought: boolean,
 *  penalty_minutes: number,
 *  onBuy: () => void,
 * }}
 */
export let HintsDialog = forwardRef(
  (/** @type {{ hints: THint[] }} */ { hints }, forward_ref) => {
    let room_ref = useContext(RoomContext)
    let room = useFirebase(room_ref)
    let t = useTranslation()
    let is_master = useContext(IsHostControllerGame)

    return (
      <Dialog
        className="fancy-backdrop"
        onClick={(e) => {
          // @ts-ignore
          if (e.target === e.currentTarget) forward_ref.current.close()
        }}
        ref={forward_ref}
        style={{
          color: 'white',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 16,

            margin: 'auto',

            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h1 tabIndex={-1}>{t('Hints')}</h1>
            <Close
              onClick={() => {
                // @ts-ignore
                forward_ref.current.close()
              }}
            />
          </div>
          {hints.map((hint, i) => (
            <div
              key={i}
              style={{
                minWidth: '100%',
                backgroundColor: 'rgba(0,0,0,.2)',

                // Flex center
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                padding: 16,
                marginBottom: 16,
              }}
            >
              {hint.bought ? (
                <div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ fontSize: '1.5em' }}>
                      {t('Hint')} {i + 1}
                    </span>
                  </div>
                  <div>{hint.text}</div>
                </div>
              ) : (
                <div
                  onClick={(e) => {
                    if (!is_master) {
                      window.alert('Only the game master can buy hints!')
                      return
                    }

                    if (
                      window.confirm(
                        t('Are you sure you want to buy this hint?')
                      )
                    ) {
                      set(
                        child(room_ref, 'hints_penalty'),
                        (room.hints_penalty ?? 0) + hint.penalty_minutes
                      )
                      hint.onBuy()

                      let hint_div = e.currentTarget
                      setTimeout(() => {
                        hint_div.scrollIntoView?.({
                          behavior: 'smooth',
                          block: 'center',
                        })
                      }, 100)
                    }
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Lock />
                    <div style={{ width: 8 }} />
                    <span style={{ fontSize: '1.5em' }}>
                      {t('Hint')} {i + 1}
                    </span>
                  </div>
                  <div>
                    {t('Click to unlock hint, will add')}{' '}
                    <b>
                      {hint.penalty_minutes} {t('minutes')}
                    </b>{' '}
                    {t('to your score.')}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Dialog>
    )
  }
)
