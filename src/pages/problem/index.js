/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../../languages'

import assets from '../../assets'
import { Whitespace } from '../../Elements'
import { ButtonRadiusPrimary } from '../../assets/styles/all.style'
import { Fab } from '@mui/material'
import { InfoRounded } from '@mui/icons-material'
import Carousel from 'react-material-ui-carousel'
import { useFirebase } from '../../utils/firebase'
import { useState } from 'react'
import { useEffect } from 'react'

const Problem = ({
  onNext,
  roomRef,
  cases,
  handleShowInstruction,
  handleShowCaseGamePlay,
}) => {
  let navigate = useNavigate()
  let t = useTranslation('nl')

  let room = useFirebase(roomRef) ?? {}

  let [caseTheme, setCaseTheme] = useState([])

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
    let returnArr = []
    Object.entries(cases).forEach((arr) => {
      returnArr.push(arr[1].theme)
    })
    setCaseTheme(returnArr)
  }, [cases])

  return (
    caseTheme.length > 0 && (
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
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <img
              // @ts-ignore
              src={assets.images.character.player2}
              style={{
                height: '56px',
                alignSelf: 'center',
              }}
              alt="icon"
              onClick={handleShowCaseGamePlay}
            />
            <Fab
              aria-label="save"
              color="primary"
              style={{ background: '#004384' }}
              onClick={handleShowInstruction}
            >
              <InfoRounded />
            </Fab>
          </div>
        </div>
        <Carousel indicators={false}>
          {caseTheme.map((arr, key) => {
            return (
              <div key={key}>
                <h2>{arr.name}</h2>
                <Whitespace height={20} />
                <img
                  // @ts-ignore
                  src={playerImage[key]}
                  style={{
                    width: '30%',
                    alignSelf: 'center',
                  }}
                  alt="icon"
                />
                <Whitespace height={20} />
                <p>{t('correctly guess')}</p>
                <Whitespace height={20} />
                <div style={{ textAlign: 'left' }}>
                  <p>{arr.desc}</p>
                </div>
              </div>
            )
          })}
        </Carousel>

        <div>
          <Whitespace height={20} />
          <ButtonRadiusPrimary onClick={onNext}>
            {t('Ready')} {room.playerIsReadyAnswer}/{room.playerReady}
          </ButtonRadiusPrimary>
          <Whitespace height={20} />
        </div>
      </div>
    )
  )
}

export default Problem
