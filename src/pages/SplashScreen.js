import React from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets'
import { Whitespace } from '../Elements'
import { useTranslation } from '../languages'
import { ButtonRadiusPrimary } from '../assets/styles/all.style'

const SplashScreen = () => {
  const t = useTranslation()
  const navigate = useNavigate()

  return (
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
        <h2>{t('welcome')}</h2>
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
      </div>

      <div>
        <ButtonRadiusPrimary onClick={() => navigate('create-team')}>
          {t('Create Game')}
        </ButtonRadiusPrimary>

        <Whitespace height={20} />

        <ButtonRadiusPrimary
          onClick={() => {
            navigate('join-team')
          }}
        >
          {t('Join Game')}
        </ButtonRadiusPrimary>
        <Whitespace height={20} />
      </div>
    </div>
  )
}

export default SplashScreen
