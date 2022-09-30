/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from '../../languages'

import assets from '../../assets'
import { Whitespace } from '../../Elements'
import { List } from '@mui/material'
import { database, useFirebase } from '../../utils/firebase'
import { increment, ref, set, update } from 'firebase/database'
import axios from 'axios'

const CheckJoin = () => {
  let { language, id } = useParams()
  let navigate = useNavigate()
  let t = useTranslation('nl')
  let room_ref = ref(database, `rooms/${id}`)
  let room = useFirebase(room_ref) ?? {}
  let [check, setCheck] = useState(false)
  let [maximum, setMaximum] = useState(false)

  let rooms = useFirebase(room_ref) ?? {}
  let [ip, setIP] = useState('')

  let players_ref = ref(database, `rooms/${id}/players`)
  let players = useFirebase(players_ref) ?? {}

  useEffect(() => {
    const getIp = async () => {
      const res = await axios.get('https://geolocation-db.com/json/')
      const resIP = res.data.IPv4
      setIP(resIP.replace(/\./g, ''))
    }
    getIp()

    if (!check) {
      let arrPlayer = []

      Object.entries(players).forEach((arr, key) => {
        arrPlayer.push(arr[0])
      })

      if (room.playerTotal >= 7) {
        setMaximum(true)
      } else {
        if (arrPlayer.includes(ip)) {
          return navigate(`/${language}/game/${id}/play`)
        } else {
          update(room_ref, {
            playerTotal: increment(1),
          })
          // handleSaveNewPlayer('')
          return navigate(`/${language}/game/${id}/play`)
        }
      }
      setCheck(true)
    }
  }, [room])

  const handleSaveNewPlayer = (playerName) => {
    let new_player = players
    console.log(new_player)
    let currentDate = new Date()
    let time =
      currentDate.getHours() +
      '' +
      currentDate.getMinutes() +
      '' +
      currentDate.getSeconds()
    new_player[ip] = {
      name: playerName,
      time: time,
    }
    set(players_ref, new_player)
  }

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
          <h2>{t('waiting host')}</h2>
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
          <Whitespace height={5} />
          <h2>Teamname</h2>
          <p style={{ fontSize: 25 }}>
            {room.playerTotal}/7 {t('players')}
          </p>
          <Whitespace height={20} />
          <p>{t('game is maximum players')}</p>
          <Whitespace height={20} />
        </div>
      </div>
    </List>
  )
}

export default CheckJoin
