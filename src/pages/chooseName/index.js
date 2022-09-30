import React, { useState } from 'react'
import { useTranslation } from '../../languages'

import assets from '../../assets'
import { Whitespace } from '../../Elements'
import { ButtonRadiusPrimary } from '../../assets/styles/all.style'
import { TextField } from '@mui/material'
import { useFirebase } from '../../utils/firebase'

const ChooseName = ({ onNext, roomRef }) => {
  let t = useTranslation('nl')
  const [namePlayer, setNamePlayer] = useState('')

  let room = useFirebase(roomRef) ?? {}

  const handleChange = (event) => {
    setNamePlayer(event)
  }

  const handleClick = () => {
    onNext(namePlayer)
  }
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
        <h2>{t('choose name')}</h2>
        <Whitespace height={20} />
        <img
          // @ts-ignore
          src={assets.images.character.player3}
          style={{
            width: '30%',
            alignSelf: 'center',
            backgroundColor: `var(--background-color)`,
          }}
          alt="icon"
        />
      </div>

      <div>
        <Whitespace height={20} />
        <p>{t('label choose player name')}</p>
        <Whitespace height={20} />
        <TextField
          id="standard-basic"
          label={t('player name')}
          variant="outlined"
          margin="dense"
          required
          onChange={(e) => handleChange(e.target.value)}
          fullWidth
        />
        <Whitespace height={20} />

        <p style={{ fontSize: 25 }}>
          {room.playerReady}/{room.playerTotal} {t('players are ready')}
        </p>

        <Whitespace height={20} />

        <ButtonRadiusPrimary onClick={handleClick}>
          {t('ready')}
        </ButtonRadiusPrimary>
        <Whitespace height={20} />
      </div>
    </div>
  )
}

export default ChooseName
