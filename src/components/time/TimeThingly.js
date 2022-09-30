import { AccessTime, Close } from '@mui/icons-material'
import { increment, ref, update } from 'firebase/database'
import { useState } from 'react'
import { useEffect } from 'react'
import { useTranslation } from '../../languages'
import { Dialog } from '../../utils/Dialog'
import { database, useFirebase } from '../../utils/firebase'
import { useDialogRef } from '../../utils/use'

const TimeThingy = ({ room_id, roundNow, caseDetail, caseNow, players }) => {
  let round_ref = ref(database, `rooms/${room_id}/rounds/r${roundNow}`)
  let round = useFirebase(round_ref) ?? {}
  let t = useTranslation()
  let dialog = useDialogRef()
  const [check, setCheck] = useState(false)
  let round_case_player_ref = ref(
    database,
    `rooms/${room_id}/rounds/r${roundNow}/answer/${caseDetail[caseNow][0]}`
  )
  let round_case_player = useFirebase(round_case_player_ref) ?? {}
  let room_ref = ref(database, `rooms/${room_id}`)
  let room = useFirebase(room_ref) ?? {}

  const calculateTimeLeft = () => {
    let dat = new Date(round?.start_time)
    let years2 = dat.setMinutes(dat.getMinutes() + 1)
    const difference = +new Date(years2) - +new Date()

    let timeLeft = {}
    if (dat != 'Invalid Date') {
      if (difference > 0) {
        timeLeft = {
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      } else {
        timeLeft = { end: '0' }
      }
    }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  const onTimeUp = () => {
    Object.entries(players).forEach((arr, key) => {
      let arrayPlayerCases = []
      Object.entries(round_case_player).forEach((arr2, key2) => {
        arrayPlayerCases.push(arr2[0])
      })
      if (!arrayPlayerCases.includes(arr[0])) {
        let round_case_player_ref = ref(
          database,
          `rooms/${room_id}/rounds/r${roundNow}/scores/players/${arr[0]}`
        )

        update(round_case_player_ref, {
          name: 'AFK',
          theme: increment(0),
          undercover: increment(0),
        })
      }
    })

    update(room_ref, {
      step: 5,
      playerIsReadyAnswer: room.playerReady,
      playerIsVotedPlayer: room.playerReady,
      playerIsVotedProblem: room.playerReady,
    })

    update(round_ref, {
      timeout: 1,
    })
  }

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    if (!check) {
      if (timerComponents[0] == 'end') {
        onTimeUp()
        setCheck(true)
      }
    }
  })

  const timerComponents = []

  Object.keys(timeLeft).forEach((interval, key) => {
    if (!timeLeft[interval]) {
      return
    }

    if (interval === 'end') {
      timerComponents.push('end')
    } else {
      timerComponents.push(
        <span key={key}>
          {timeLeft[interval]} {interval}
        </span>
      )
    }
  })

  if (
    round.start_time === null ||
    round.start_time === undefined ||
    round.timeout === 1
  ) {
    return null
  }

  return (
    <>
      <Dialog
        className="fancy-backdrop"
        ref={dialog}
        onClick={(e) => {
          dialog.current.close()
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 16,
            margin: 'auto',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h1>Timing</h1>
            <Close
              onClick={() => {
                dialog.current.close()
              }}
            />
          </div>
          <div
            style={{
              minWidth: '100%',
              backgroundColor: `rgba(0, 0, 0, 0.2)`,
              borderRadius: 8,
              padding: 16,

              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',

              marginBottom: 16,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                fontSize: '1.2em',
                fontVariant: 'tabular-nums',
              }}
            >
              <AccessTime />
              <div style={{ minWidth: 8 }} />
              {timerComponents.length ? (
                timerComponents
              ) : (
                <span>Time's up!</span>
              )}
            </div>
            {t(
              'You have 180 minutes to finish the game. You will see the time you have left in the top of the screen.'
            )}
          </div>

          <div
            style={{
              minWidth: '100%',
              backgroundColor: `rgba(0, 0, 0, 0.2)`,
              borderRadius: 8,
              padding: 16,

              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{ color: '#af0000', fontSize: '1.2em' }}>- 5 min</div>
            {t(
              'For every hint you unlock, there will be some time added to your final score. You will still be able to play the full 90 minutes, but your final score will be a bit less.'
            )}
          </div>
        </div>
      </Dialog>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          fontVariant: 'tabular-nums',
        }}
        onClick={() => {
          dialog.current.showModal()
        }}
      >
        <AccessTime />
        <div style={{ minWidth: 8 }} />
        {timerComponents.length ? timerComponents : <span>Time's up!</span>}
        <div style={{ minWidth: 8 }} />
      </div>
    </>
  )
}

export default TimeThingy
