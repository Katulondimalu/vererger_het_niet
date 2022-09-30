/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from '../../languages'

import assets from '../../assets'
import { Whitespace } from '../../Elements'
import { ButtonRadiusPrimary } from '../../assets/styles/all.style'
import { QRCodeSVG } from 'qrcode.react'
import { List } from '@mui/material'
import { useFirebase } from '../../utils/firebase'

const ShareTeam = ({ onNext, roomRef, isHost }) => {
  let t = useTranslation('nl')
  let room = useFirebase(roomRef) ?? {}
  let { id } = useParams()
  let navigate = useNavigate()

  useEffect(() => {
    window.onpopstate = (e) => {
      navigate('/')
    }
  }, [room])

  const handleSubmit = () => {
    onNext()
  }

  return (
    <List style={{ maxHeight: '100%', overflow: 'auto' }}>
      <div
        className="height-height"
        style={{
          justifyContent: 'space-between',
          overflow: 'scroll',
          paddingBottom: 20,
        }}
      >
        <div
          style={{
            textAlign: 'center',
            marginLeft: 16,
            marginRight: 16,
          }}
        >
          <div style={{ textAlign: 'right' }}>
            <p>Room: {id}</p>
          </div>
          <h2>{t('waiting host')}</h2>
          <Whitespace height={20} />
          <img
            // @ts-ignore
            src={assets.images.common.splashscreenIcon}
            style={{
              width: '80%',
              alignSelf: 'center',
              backgroundColor: `var(--background-color)`,
            }}
            alt="icon"
          />
          <Whitespace height={5} />
          <h2>{room.name}</h2>
          <p style={{ fontSize: 25 }}>
            {room.playerTotal}/7 {t('players')}
          </p>
          <Whitespace height={20} />
          <p>{t('desc waiting host')}</p>
          <Whitespace height={20} />
        </div>
        <div style={{ height: 150, textAlign: 'center' }}>
          <QRCodeSVG value={id} size={150} />
        </div>
        {isHost ? (
          <div>
            <Whitespace height={20} />
            <ButtonRadiusPrimary onClick={handleSubmit}>
              {t('start')}
            </ButtonRadiusPrimary>
            <Whitespace height={20} />
          </div>
        ) : (
          ''
        )}
      </div>
    </List>
  )
}

export default ShareTeam
