import React from 'react'
import { useTranslation } from '../../languages'

import assets from '../../assets'
import { Whitespace } from '../../Elements'
import { ButtonRadiusPrimary } from '../../assets/styles/all.style'
import { Fab } from '@mui/material'
import { InfoRounded } from '@mui/icons-material'

const Civilian = ({ onNext, showInstruction }) => {
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
        <h2>{t('you civilian')}</h2>
        <Whitespace height={20} />
        <img
          // @ts-ignore
          src={assets.images.character.player2}
          style={{
            width: '30%',
            alignSelf: 'center',
          }}
          alt="icon"
        />
      </div>

      <div style={{ textAlign: 'left' }}>
        <p>{t('rule civilian')}</p>
      </div>

      <div>
        <ButtonRadiusPrimary onClick={onNext}>{t('next')}</ButtonRadiusPrimary>
        <Whitespace height={20} />
      </div>
    </div>
  )
}

export default Civilian
