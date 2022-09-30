import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from '../../languages'
import { v4 as uuidv4 } from 'uuid'

import assets from '../../assets'
import { Whitespace } from '../../Elements'
import { ButtonRadiusPrimary } from '../../assets/styles/all.style'
import { TextField } from '@mui/material'
import { database } from '../../utils/firebase'
import { ref, set } from 'firebase/database'
import { useEffect } from 'react'
import axios from 'axios'

const CreateTeam = () => {
  let navigate = useNavigate()
  let t = useTranslation('nl')
  const [nameTeam, setNameTeam] = useState('')
  let [ip, setIP] = useState('')

  const handleChange = (event) => {
    setNameTeam(event)
  }

  let { language } = useParams()

  useEffect(() => {
    const getIp = async () => {
      const res = await axios.get('https://geolocation-db.com/json/')
      const resIP = res.data.IPv4
      setIP(resIP.replace(/\./g, ''))
    }
    getIp()
  }, [])

  const createTeam = () => {
    const uid = uuidv4().substring(0, 6)
    let room_ref = ref(database, `rooms/${uid}`)

    let players = {}
    let currentDate = new Date()
    let time =
      currentDate.getHours() +
      '' +
      currentDate.getMinutes() +
      '' +
      currentDate.getSeconds()
    players[ip] = {
      name: '',
      time: time,
    }

    set(room_ref, {
      name: nameTeam,
      playerTotal: 1,
      playerReady: 0,
      playerIsReadyAnswer: 0,
      playerIsVotedProblem: 0,
      playerIsVotedPlayer: 0,
      undercoverTotal: 1,
      roundTotal: 2,
      roundNow: 1,
      caseNow: 0,
      players,
      statusRunning: false,
    }).then(() => {
      window.location.replace(
        `/${language}/game/${uid}/play?is_host_controller_game`
      )
    })
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
        <Whitespace height={20} />
        <p>{t('label choose name team')}</p>
        <Whitespace height={20} />
        <TextField
          id="standard-basic"
          label={t('team name')}
          variant="outlined"
          margin="dense"
          required
          onChange={(e) => handleChange(e.target.value)}
          fullWidth
        />
      </div>

      <div>
        <ButtonRadiusPrimary onClick={createTeam}>
          {t('Create Team')}
        </ButtonRadiusPrimary>
        <Whitespace height={20} />
      </div>
    </div>
  )
}

export default CreateTeam
