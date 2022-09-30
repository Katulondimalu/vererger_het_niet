import { useTranslation } from '../../languages'

import assets from '../../assets'
import { Whitespace } from '../../Elements'
import { List } from '@mui/material'
import { ButtonRadiusPrimary } from '../../assets/styles/all.style'
import { useNavigate } from 'react-router-dom'

const NotValid = () => {
  let navigate = useNavigate()
  let t = useTranslation('nl')

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
          <h2>{t('not valid')}</h2>
          <Whitespace height={20} />
          <img
            // @ts-ignore
            src={assets.images.common.splashscreenIconGrey}
            style={{
              width: '80%',
              alignSelf: 'center',
              backgroundColor: `var(--background-color)`,
            }}
            alt="icon"
          />
          <Whitespace height={5} />
          <p>{t('game ID is not valid')}</p>
          <Whitespace height={20} />
        </div>
        <div
          style={{
            textAlign: 'center',
            marginLeft: 16,
            marginRight: 16,
          }}
        >
          <ButtonRadiusPrimary onClick={() => navigate('/')}>
            {t('Back to welcome page')}
          </ButtonRadiusPrimary>
        </div>
      </div>
    </List>
  )
}

export default NotValid
