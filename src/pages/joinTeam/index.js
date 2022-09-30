/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from '../../languages'

import assets from '../../assets'
import { Whitespace } from '../../Elements'
import BarcodeScanner from '../barcode/BarcodeScanner'
import { database, useFirebase } from '../../utils/firebase'
import { ref, set } from 'firebase/database'
import axios from 'axios'

const JoinTeam = () => {
  let t = useTranslation('nl')

  let [room_ids, set_room_ids] = useState([])
  let room_ref = ref(database, `rooms`)
  let room = useFirebase(room_ref) ?? {}

  let { language } = useParams()
  let navigate = useNavigate()

  useEffect(() => {

    let returnArr = []
    Object.entries(room).forEach((childSnapshot) => {
      returnArr.push(childSnapshot[0])
    })
    set_room_ids(returnArr)
  }, [room])

  

  const HandleNext = (uid) => {
    navigate(`/${language}/game/${uid}/check`)
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
        <h2>{t('join team')}</h2>
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
        <Whitespace height={20} />
      </div>
      {room_ids.length !== 0 && (
        <BarcodeScanner codes={room_ids} onNext={(uid) => HandleNext(uid)} />
      )}
    </div>
  )
}

export default JoinTeam
