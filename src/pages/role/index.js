/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'

import Undercover from './undercover'
import Civilian from './civilian'
import { database, useFirebase } from '../../utils/firebase'
import { ref, update } from 'firebase/database'
import { useEffect } from 'react'

const Role = ({
  onNext,
  myIp,
  roomId,
  roundNumber,
  caseNow,
  handleShowInstruction,
}) => {
  let me_ref = ref(database, `rooms/${roomId}/players/${myIp}`)
  let me = useFirebase(me_ref) ?? {}

  let players_ref = ref(database, `rooms/${roomId}/players`)
  let players = useFirebase(players_ref) ?? {}

  let round_ref = ref(database, `rooms/${roomId}/rounds/r${roundNumber}/cases`)
  let rounds = useFirebase(round_ref) ?? {}

  useEffect(() => {
    Object.entries(players).map((arr, key) => {
      let player_ref = ref(database, `rooms/${roomId}/players/${arr[0]}`)
      update(player_ref, {
        role: 'civilian',
      })
    })
    Object.entries(rounds).forEach((childSnapshot) => {
      let player_ref = ref(
        database,
        `rooms/${roomId}/players/${childSnapshot[1]}`
      )
      update(player_ref, {
        role: 'undercover',
      })
    })
  }, [rounds])

  return caseNow !== undefined ? (
    me.role === 'civilian' ? (
      <Civilian
        onNext={onNext}
        showInstruction={() => handleShowInstruction()}
      />
    ) : (
      <Undercover
        onNext={onNext}
        cases={caseNow}
        showInstruction={() => handleShowInstruction()}
      />
    )
  ) : (
    ''
  )
}

export default Role
