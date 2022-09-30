import React from 'react'
import { useTranslation } from '../../languages'

import assets from '../../assets'
import { Whitespace } from '../../Elements'
import { ButtonRadiusPrimary } from '../../assets/styles/all.style'
import { Fab } from '@mui/material'
import { InfoRounded } from '@mui/icons-material'

const Undercover = ({ onNext, cases, showInstruction }) => {
  let t = useTranslation('nl')

  return (
    <div
      className="height-height"
      style={{
        justifyContent: 'space-between',
        overflow: 'scroll',
        paddingBottom: 20,
        textAlign: 'center',
        marginLeft: 16,
        marginRight: 16,
      }}
    >
      <div>
        <div style={{ textAlign: 'right' }}>
          <Fab
            aria-label="save"
            color="primary"
            style={{ background: '#004384' }}
            onClick={showInstruction}
          >
            <InfoRounded />
          </Fab>
        </div>
        <h2>{t('you undercover')}</h2>
        <Whitespace height={20} />
        <img
          // @ts-ignore
          src={assets.images.character.player6}
          style={{
            width: '30%',
            alignSelf: 'center',
          }}
          alt="icon"
        />
      </div>

      <div>
        <div style={{ textAlign: 'left' }}>
          <p>{t('rule undercover')}</p>
        </div>
        <Whitespace height={20} />
        <h3>{t('your problem')} : </h3>
        <h3>{cases[0]}</h3>
        <Whitespace height={20} />

        <div style={{ textAlign: 'left' }}>
          <p>1. {cases[1].desc}</p>
          <p>2. You are independent</p>
          <p>3. You do what you want</p>
          <p>4. You dont care about others</p>
        </div>

        <Whitespace height={20} />

        <ButtonRadiusPrimary onClick={onNext}>{t('next')}</ButtonRadiusPrimary>
        <Whitespace height={20} />
      </div>
    </div>
  )
}

export default Undercover
