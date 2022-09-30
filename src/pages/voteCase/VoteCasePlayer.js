import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../../languages'

import assets from '../../assets'
import { Whitespace } from '../../Elements'
import { ButtonRadiusPrimary } from '../../assets/styles/all.style'
import { Fab, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { InfoRounded } from '@mui/icons-material'
import { useState } from 'react'

const VoteCasePlayer = ({
  onNext,
  room,
  meData,
  playersData,
  handleShowInstruction,
}) => {
  let navigate = useNavigate()
  let t = useTranslation('nl')

  const [undercover, setUndercover] = useState('')

  const handleChange = (event) => {
    setUndercover(event.target.value)
  }

  const handleSubmit = () => {
    if (undercover === '') {
      alert('please choose one')
    } else {
      onNext(undercover)
    }
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
        <div style={{ textAlign: 'right' }}>
          <Fab
            aria-label="save"
            color="primary"
            style={{ background: '#004384' }}
            onClick={handleShowInstruction}
          >
            <InfoRounded />
          </Fab>
        </div>
        <h2>{meData.name}</h2>
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
        <Whitespace height={20} />
        <p>{t('label undercover')}</p>
        <Whitespace height={20} />
        <p>{t('label select player')}</p>
        <Whitespace height={20} />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{t('Player')}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={undercover}
            label={t('Player')}
            onChange={handleChange}
          >
            {Object.entries(playersData).map((arr, key) => {
              return (
                <MenuItem value={arr[0]} key={key}>
                  {arr[1].name}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <Whitespace height={20} />

        <p style={{ fontSize: 24 }}>
          {t('waiting for players: ')} {room.playerIsVotedPlayer}/
          {room.playerReady}
        </p>
      </div>

      <div>
        <Whitespace height={20} />

        <ButtonRadiusPrimary onClick={() => handleSubmit()}>
          {t('vote')}
        </ButtonRadiusPrimary>
        <Whitespace height={20} />
      </div>
    </div>
  )
}

export default VoteCasePlayer
