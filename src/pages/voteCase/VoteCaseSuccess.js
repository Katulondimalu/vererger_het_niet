/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../../languages'

import assets from '../../assets'
import { Whitespace } from '../../Elements'
import { ButtonRadiusPrimary } from '../../assets/styles/all.style'
import { Fab } from '@mui/material'
import { InfoRounded } from '@mui/icons-material'
import { useEffect } from 'react'
import { useState } from 'react'
import { database, useFirebase } from '../../utils/firebase'
import { ref } from 'firebase/database'

const VoteCaseSuccess = ({
  onNext,
  scoreAll,
  playersRef,
  caseNow,
  roomId,
  undercoverId,
  isHost,
  handleShowInstruction,
}) => {
  let navigate = useNavigate()
  let t = useTranslation('nl')
  const [isThemeWin, setIsThemeWin] = useState(false)
  const [isUndercoverFound, setIsUndercoverFound] = useState(false)

  let undercover_ref = ref(database, `rooms/${roomId}/players/${undercoverId}`)
  let undercover = useFirebase(undercover_ref) ?? {}

  let players = useFirebase(playersRef) ?? {}

  useEffect(() => {
    const valMaxToWin = Math.round(Object.entries(players).length / 2)
    if (scoreAll.theme >= valMaxToWin) {
      setIsThemeWin(true)
    }
    if (scoreAll.undercover >= valMaxToWin) {
      setIsUndercoverFound(true)
    }
  }, [])

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
        <h2>
          {isThemeWin
            ? 'Your team voted successfully'
            : 'Your team voted wrongly'}
        </h2>
        <Whitespace height={20} />
        <img
          // @ts-ignore
          src={assets.images.character.playerGray}
          style={{
            width: '20%',
            alignSelf: 'center',
            backgroundColor: `var(--background-color)`,
          }}
          alt="icon"
        />
        <Whitespace height={20} />
        <p>
          {isThemeWin
            ? `${caseNow[0]} had the problem behaviour matching ${caseNow[1].theme.name} good job`
            : `${caseNow[0]} was not *insert vote* ${caseNow[0]} was ${caseNow[1].theme.name}`}
        </p>
        <h2>
          {isUndercoverFound
            ? `The undercover has been found`
            : `The undercover has not been found`}
        </h2>
        <Whitespace height={20} />
        <img
          // @ts-ignore
          src={assets.images.character.player2}
          style={{
            width: '20%',
            alignSelf: 'center',
            backgroundColor: `var(--background-color)`,
          }}
          alt="icon"
        />
        <Whitespace height={20} />
        <p>{undercover.name}</p>
        <Whitespace height={20} />
      </div>

      {isHost ? (
        <div>
          <Whitespace height={20} />
          <ButtonRadiusPrimary onClick={onNext}>
            {t('Next')}
          </ButtonRadiusPrimary>
          <Whitespace height={20} />
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default VoteCaseSuccess
