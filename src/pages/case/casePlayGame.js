/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../../languages'

import assets from '../../assets'
import { Whitespace } from '../../Elements'
import { ButtonRadiusPrimary } from '../../assets/styles/all.style'
import { Fab } from '@mui/material'
import { InfoRounded } from '@mui/icons-material'
import { database, useFirebase } from '../../utils/firebase'
import { ref } from 'firebase/database'
import { useEffect } from 'react'
import { useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import useAudio from '../../utils/useAudio'

const CasePlayGame = ({
  onNext,
  roomId,
  roundNumber,
  cases,
  isHost,
  handleShowInstruction,
}) => {
  let navigate = useNavigate()
  let t = useTranslation('nl')

  let round_cases_ref = ref(
    database,
    `rooms/${roomId}/rounds/r${roundNumber}/cases`
  )
  let round_cases = useFirebase(round_cases_ref) ?? {}

  let [caseDetail, setCaseDetail] = useState([])
  const [playing1, toggle1] = useAudio(assets.audio.case1)
  const [playing2, toggle2] = useAudio(assets.audio.case2)
  const [playing3, toggle3] = useAudio(assets.audio.case3)
  const [playing4, toggle4] = useAudio(assets.audio.case4)
  const [playing5, toggle5] = useAudio(assets.audio.case5)
  const [playing6, toggle6] = useAudio(assets.audio.case6)
  const [playing7, toggle7] = useAudio(assets.audio.case7)

  useEffect(() => {
    let resultArr = []
    Object.entries(cases).forEach((arr) => {
      Object.entries(round_cases).forEach((arr2) => {
        if (arr[0] === arr2[0]) {
          resultArr.push(arr)
        }
      })
    })
    setCaseDetail(resultArr)
  }, [])

  return (
    caseDetail.length > 0 && (
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
          <h1>There are {caseDetail.length} cases</h1>
          <p>you can swipe text in the case below</p>
        </div>

        <Carousel indicators={false}>
          {caseDetail.map((arr, key) => {
            let playing
            let toggle
            if (arr[0] === 'case-1f3asf') {
              playing = playing1
              toggle = toggle1
            }
            if (arr[0] === 'case-2d3knf') {
              playing = playing2
              toggle = toggle2
            }
            if (arr[0] === 'case-3j8jdb') {
              playing = playing3
              toggle = toggle3
            }
            if (arr[0] === 'case-4k9dms') {
              playing = playing4
              toggle = toggle4
            }
            if (arr[0] === 'case-5p9adf') {
              playing = playing5
              toggle = toggle5
            }
            return (
              <div key={key}>
                <h2>{arr[0]}</h2>
                <Whitespace height={20} />
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
                <div style={{ textAlign: 'left' }}>
                  <p>{arr[1].desc}</p>
                </div>
              </div>
            )
          })}
        </Carousel>

        <div>
          <Whitespace height={20} />
          <ButtonRadiusPrimary onClick={onNext}>
            {t('back')}
          </ButtonRadiusPrimary>
          <Whitespace height={20} />
        </div>
      </div>
    )
  )
}

export default CasePlayGame
