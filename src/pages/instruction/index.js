import React from 'react'
import { useTranslation } from '../../languages'

import assets from '../../assets'
import { Whitespace } from '../../Elements'
import { ButtonRadiusPrimary } from '../../assets/styles/all.style'
import { useState } from 'react'
import { useEffect } from 'react'
import useAudio from '../../utils/useAudio'

const Instruction = ({ onNext, id, isHost }) => {
  let t = useTranslation('nl')
  const [playing, toggle] = useAudio(assets.audio.instruction)
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
          <p>Room: {id}</p>
        </div>
        <h2>{t('instruction')}</h2>
        <Whitespace height={20} />

        <div>
          <img
            // @ts-ignore
            src={
              playing
                ? assets.images.common.pauseIcon
                : assets.images.common.playIcon
            }
            style={{
              width: '30%',
              alignSelf: 'center',
              backgroundColor: `var(--background-color)`,
            }}
            alt="icon"
            onClick={toggle}
          />
        </div>
      </div>

      <div>
        <div style={{ textAlign: 'left' }}>
          <p>{t('desc instruction')}</p>
        </div>
        <Whitespace height={40} />
        {isHost ? (
          <ButtonRadiusPrimary onClick={onNext}>
            {t('next')}
          </ButtonRadiusPrimary>
        ) : (
          ''
        )}

        <Whitespace height={20} />
      </div>
    </div>
  )
}

export default Instruction
