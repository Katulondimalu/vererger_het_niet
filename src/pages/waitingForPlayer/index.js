/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../../languages'

import assets from '../../assets'
import { Whitespace } from '../../Elements'
import { ButtonRadiusPrimary } from '../../assets/styles/all.style'
import { Box, Slider } from '@mui/material'
import { Stack } from '@mui/system'
import { useFirebase } from '../../utils/firebase'

const WaitingPlayer = ({
  onNext,
  IsHostControllerGameContext,
  onUpdateTotalRound,
  onUpdateTotalUndercover,
  roomRef,
  playersRef,
}) => {
  let t = useTranslation('nl')

  let room = useFirebase(roomRef) ?? {}
  let players = useFirebase(playersRef) ?? {}

  let [totalRound, setTotalRound] = useState(0)
  let [totalUndercover, setTotalUndercover] = useState(0)
  let [totalPlayer, setTotalPlayer] = useState({})
  let [playerImage, setPlayerImage] = useState([
    assets.images.character.player1,
    assets.images.character.player2,
    assets.images.character.player3,
    assets.images.character.player4,
    assets.images.character.player5,
    assets.images.character.player6,
    assets.images.character.player7,
  ])

  useEffect(() => {
    setTotalRound(room.roundTotal)
    setTotalUndercover(room.undercoverTotal)
    setTotalPlayer(
      Object.entries(players).sort((a, b) => {
        return a[1].time - b[1].time
      })
    )
  }, [room, players])

  const handleChangeTotalRound = (e, number) => {
    if (!IsHostControllerGameContext) {
      window.alert(t('Only the gamemaster can control the game.'))
      return
    }
    setTotalRound(number)
    onUpdateTotalRound(number)
  }
  const handleChangeTotalUndercover = (e, number) => {
    if (!IsHostControllerGameContext) {
      window.alert(t('Only the gamemaster can control the game.'))
      return
    }
    setTotalUndercover(number)
    onUpdateTotalUndercover(number)
  }
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
        <h2>{t('waiting for player')}</h2>
        <Whitespace height={20} />
        <div style={{ height: 250, textAlign: 'center', position: 'relative' }}>
          {room.playerReady <= 3 && (
            <div
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translate(-50%, 0)',
                display: 'flex',
              }}
            >
              {Object.entries(totalPlayer).map((arr, key) => {
                return (
                  <div
                    style={{ display: 'flex', flexDirection: 'column' }}
                    key={key}
                  >
                    <label>{arr[1][1].name}</label>
                    <img
                      // @ts-ignore
                      src={playerImage[key]}
                      style={{
                        width: '100%',
                        alignSelf: 'center',
                        backgroundColor: `var(--background-color)`,
                      }}
                      alt="icon"
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>
        <Whitespace height={20} />
        <Box mx={4}>
          <p style={{ fontSize: 24 }}>
            {t('round to play')}: {totalRound}
          </p>
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <Slider
              aria-label="Round to play"
              min={1}
              max={7}
              step={1}
              defaultValue={2}
              value={totalRound}
              onChange={handleChangeTotalRound}
            />
          </Stack>
          <Whitespace height={20} />
          <p style={{ fontSize: 24 }}>
            {t('undercovers')}: {totalUndercover}
          </p>
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <Slider
              aria-label="Undercover"
              min={1}
              max={Object.entries(players).length - 1}
              step={1}
              defaultValue={1}
              value={totalUndercover}
              onChange={handleChangeTotalUndercover}
            />
          </Stack>
        </Box>
        <Whitespace height={20} />
        <p style={{ fontSize: 24 }}>
          {room.playerReady}/{room.playerTotal} {t('players are ready')}
        </p>
        <Whitespace height={20} />
      </div>

      {IsHostControllerGameContext ? (
        <div>
          <ButtonRadiusPrimary onClick={onNext}>
            {t('Start')}
          </ButtonRadiusPrimary>
          <Whitespace height={20} />
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default WaitingPlayer
