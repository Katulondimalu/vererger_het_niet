import { List } from '@mui/material'
import { update } from 'firebase/database'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Whitespace } from '../../Elements'
import { useTranslation } from '../../languages'
import { useFirebase } from '../../utils/firebase'

const WaitingVote = ({ room_ref }) => {
  let t = useTranslation('nl')
  const [check, setCheck] = useState(false)
  let room = useFirebase(room_ref) ?? {}

  useEffect(() => {
    if (!check) {
      if (room.playerReady === room.playerIsVotedPlayer) {
        update(room_ref, {
          step: 5,
          playerIsVotedPlayer: room.playerReady,
        })
        setCheck(true)
      }
    }
  })

  return (
    <List style={{ maxHeight: '100%', overflow: 'auto' }}>
      <div
        className="height-height"
        style={{
          justifyContent: 'center',
          alignItems: 'center',
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
          <h2>{t('Please Wait ... ')}</h2>
          <Whitespace height={20} />
          <p style={{ fontSize: 24 }}>
            {t('waiting for players: ')} {room.playerIsVotedPlayer}/
            {room.playerReady}
          </p>
          <Whitespace height={20} />
        </div>
      </div>
    </List>
  )
}

export default WaitingVote
