/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-operators */
import { differenceInSeconds } from 'date-fns'
import { increment, ref, set, update } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios'

import Stack from '../../components/stack/Stack'
import TimeThingy from '../../components/time/TimeThingly'
import Topbar from '../../components/topbar/Topbar'

import ShareTeam from '../shareTeam'
import ChooseName from '../chooseName'
import WaitingPlayer from '../waitingForPlayer'

import { HOW_LONG_DO_WE_HAVE_IN_SECONDS } from '../../constant/StaticData'
import { IsHostControllerGame, RoomContext } from '../../context/BaseContext'
import { Whitespace } from '../../Elements'
import { useTranslation } from '../../languages'
import { database, useFirebase } from '../../utils/firebase'
import { IsDevelopmentContext } from '../../utils/use-is-development'
import Instruction from '../instruction'
import Role from '../role'
import Case from '../case'
import Problem from '../problem'
import VoteCaseTheme from '../voteCase/VoteCaseTheme'
import VoteCasePlayer from '../voteCase/VoteCasePlayer'
import VoteCaseSuccess from '../voteCase/VoteCaseSuccess'
import EndScreen from '../endScreen'
import { List } from '@mui/material'
import InstructionPlayGame from '../instruction/InstructionPlayGame'
import CasePlayGame from '../case/casePlayGame'
import WaitingVote from '../waitingVote'

const GameView = () => {
  let navigate = useNavigate()
  let [searchParams] = useSearchParams()
  let is_host_controller_game =
    searchParams.get('is_host_controller_game') === ''

  let { id, language } = useParams()
  let [isReady, setIsReady] = useState(0)
  let [isReadyAnswer, setIsReadyAnswer] = useState(false)
  let [isVotedProblem, setIsVotedProblem] = useState(false)
  let [isVotedPlayer, setIsVotedPlayer] = useState(false)
  let [showCase, setShowCase] = useState(false)
  let [showInstruction, setShowInstruction] = useState(false)
  let [showCasePlayGame, setShowCasePlayGame] = useState(false)
  let [ip, setIP] = useState('')
  let [caseDetail, setCaseDetail] = useState([])
  // let [caseNow, setCaseNow] = useState(0)
  // let [roundNow, setRoundNow] = useState(1)
  let [undercoverId, setUndercoverId] = useState('')

  let cases_ref = ref(database, `cases`)
  let cases = useFirebase(cases_ref) ?? {}

  let rooms_ref = ref(database, `rooms`)
  let rooms = useFirebase(rooms_ref) ?? {}

  let room_ref = ref(database, `rooms/${id}`)
  let room = useFirebase(room_ref) ?? {}

  let step = room?.step ?? 0
  let caseNow = room?.caseNow ?? 0
  let roundNow = room?.roundNow ?? 0

  let players_ref = ref(database, `rooms/${id}/players`)
  let players = useFirebase(players_ref) ?? {}

  let me_ref = ref(database, `rooms/${id}/players/${ip}`)
  let me = useFirebase(me_ref) ?? {}

  let round_cases_ref = ref(database, `rooms/${id}/rounds/r${roundNow}/cases`)
  let round_cases = useFirebase(round_cases_ref) ?? {}

  let scores_all_ref = ref(
    database,
    `rooms/${id}/rounds/r${roundNow}/scores/all`
  )
  let scores_all = useFirebase(scores_all_ref) ?? {}

  let scores_players_ref = ref(database, `rooms/${id}/rounds`)
  let scores_players = useFirebase(scores_players_ref) ?? {}

  let t = useTranslation()

  useEffect(() => {
    const getIp = async () => {
      const res = await axios.get('https://geolocation-db.com/json/')
      const resIP = res.data.IPv4
      setIP(resIP.replace(/\./g, ''))
    }

    let returnArr = []
    Object.entries(rooms).forEach((childSnapshot) => {
      returnArr.push(childSnapshot[0])
    })
    if (returnArr.length !== 0) {
      if (returnArr.includes(id)) {
        if (Object.entries(players).length !== 0) {
          let arrPlayers = []
          Object.entries(players).forEach((childSnapshot) => {
            arrPlayers.push(childSnapshot[0])
          })
          if (ip !== '') {
            if (arrPlayers.includes(ip)) {
              // setIsReady(1)
            }
          }
        }
        let resultCases = []
        Object.entries(cases).forEach((arr) => {
          Object.entries(round_cases).forEach((arr2) => {
            if (arr[0] === arr2[0]) {
              resultCases.push(arr)
            }
          })
        })
        setCaseDetail(resultCases)
      } else {
        return navigate(`/${language}/game/${id}/notvalid`)
      }
    }
    getIp()
    document.body.scrollTop = 0
  }, [rooms, ip, id, step, isReady])

  useEffect(() => {
    setIsVotedProblem(false)
    setIsVotedPlayer(false)
  }, [caseNow])

  useEffect(() => {
    setShowCase(false)
    setIsReadyAnswer(false)
    setIsVotedProblem(false)
    setIsVotedPlayer(false)
  }, [roundNow])

  const handleSaveNewPlayer = (playerName) => {
    let new_player = players
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

  const handleRandomCase = () => {
    let returnArr = []
    Object.entries(cases).forEach((childSnapshot) => {
      returnArr.push(childSnapshot[0])
    })

    for (let i = 0; i < room.roundTotal; i++) {
      const rolePlayer = ['undercover', 'civilian']
      let rand_undercover = []

      for (let u = 0; u < room.undercoverTotal; u++) {
        const x = Math.floor(Math.random() * Object.entries(players).length) + 0
        if (rand_undercover.includes(x) === true) {
          u = u - 1
        } else {
          if (x > Object.entries(players).length === false) {
            rand_undercover.push(x)
          }
        }
      }

      // eslint-disable-next-line array-callback-return
      Object.entries(players).map((arr, key) => {
        let player_ref = ref(database, `rooms/${id}/players/${arr[0]}`)
        if (rand_undercover.includes(key)) {
          update(player_ref, {
            role: rolePlayer[0],
          })
          rand_undercover[key] = arr[0]
        } else {
          update(player_ref, {
            role: rolePlayer[1],
          })
          rand_undercover[key] = arr[0]
        }
      })

      let undercoverArr = []
      for (let j = 0; j < room.undercoverTotal; j++) {
        const x = Math.floor(Math.random() * Object.entries(cases).length) + 0
        if (undercoverArr.includes(returnArr[x]) === true) {
          j = j - 1
        } else {
          if (x > Object.entries(cases).length === false) {
            undercoverArr.push(returnArr[x])
          }
        }
      }

      let props = []
      for (let y = 0; y < undercoverArr.length; y++) {
        props.push([undercoverArr[y], rand_undercover[y]])
      }
      const obj = Object.fromEntries(props)

      let round_ref = ref(database, `rooms/${id}/rounds/r${i + 1}`)
      set(round_ref, {
        cases: obj,
      })
    }
  }

  const handleSaveVoteTheme = (dataTheme) => {
    let answers_ref = ref(
      database,
      `rooms/${id}/rounds/r${roundNow}/answer/${caseDetail[caseNow][0]}/${ip}`
    )

    let scores_player_ref = ref(
      database,
      `rooms/${id}/rounds/r${roundNow}/scores/players/${ip}`
    )
    set(answers_ref, {
      theme: dataTheme,
    })
    if (caseDetail[caseNow][1].theme.key === dataTheme) {
      set(scores_all_ref, {
        theme: increment(1),
        undercover: 0,
      })
      set(scores_player_ref, {
        theme: increment(1),
        undercover: 0,
        name: me.name,
      })
    } else {
      set(scores_all_ref, {
        theme: 0,
        undercover: 0,
      })
      set(scores_player_ref, {
        theme: 0,
        undercover: 0,
        name: me.name,
      })
    }
  }

  const handleSaveVotePlayer = (dataUndercover) => {
    let answers_ref = ref(
      database,
      `rooms/${id}/rounds/r${roundNow}/answer/${caseDetail[caseNow][0]}/${ip}`
    )

    let scores_player_ref = ref(
      database,
      `rooms/${id}/rounds/r${roundNow}/scores/players/${ip}`
    )
    update(answers_ref, {
      undercover: dataUndercover,
    })
    Object.entries(round_cases).forEach((arr2) => {
      if (arr2[1] === dataUndercover) {
        update(scores_all_ref, {
          undercover: increment(1),
        })
        update(scores_player_ref, {
          undercover: increment(1),
          name: me.name,
        })
        setUndercoverId(dataUndercover)
      }
    })
  }

  const handleShowInstruction = () => {
    setShowInstruction(true)
  }

  const handleHideInstruction = () => {
    setShowInstruction(false)
  }

  const handleShowCaseGamePlay = () => {
    setShowCasePlayGame(true)
  }

  const handleHideCaseGameplay = () => {
    setShowCasePlayGame(false)
  }
  //let date = useDate();
  let date = new Date()
  let finished_time = room?.finished_time
  let seconds_elapsed = differenceInSeconds(
    finished_time ?? date,
    room?.start_time
  )

  let is_development = process.env.REACT_APP_MODE === 'development'

  // if (seconds_elapsed > HOW_LONG_DO_WE_HAVE_IN_SECONDS) {
  //   return (
  //     <div
  //       className="height-height"
  //       style={{
  //         display: 'flex',
  //         flexDirection: 'column',
  //         alignItems: 'stretch',
  //       }}
  //     >
  //       <Whitespace height={32} />
  //       <div style={{ paddingLeft: 32, paddingRight: 32 }}>
  //         {t(
  //           "Unfortunately, time is up. And you didn't manage to open the box this time. But see it as something good, you were together. Really together!"
  //         )}
  //       </div>
  //       <Whitespace height={32} />
  //       <div style={{ paddingLeft: 32, paddingRight: 32 }}>
  //         <button
  //           onClick={() => {
  //             update(room_ref, { timeout: 1 })
  //             navigate('/')
  //           }}
  //         >
  //           {t('Continue')}
  //         </button>
  //       </div>
  //     </div>
  //   )
  // }
  return (
    <Stack
      wrappers={[
        <IsHostControllerGame.Provider value={is_host_controller_game} />,
        <RoomContext.Provider value={room_ref} />,
        <IsDevelopmentContext.Provider value={is_development} />,
      ]}
    >
      <div
        className="height-height"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        {step === 4 && (
          <Topbar>
            <TimeThingy
              room_id={id}
              roundNow={roundNow}
              caseDetail={caseDetail}
              caseNow={caseNow}
              players={players}
            />
          </Topbar>
        )}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {((step === 3 && !showCase && showInstruction) ||
            (step === 3 && showCase && showInstruction) ||
            (step === 4 &&
              !isReadyAnswer &&
              !isVotedProblem &&
              !isVotedPlayer &&
              showInstruction) ||
            (step === 4 &&
              isReadyAnswer &&
              !isVotedProblem &&
              !isVotedPlayer &&
              showInstruction) ||
            (step === 4 &&
              isReadyAnswer &&
              isVotedProblem &&
              !isVotedPlayer &&
              showInstruction) ||
            (step === 4 &&
              isReadyAnswer &&
              isVotedProblem &&
              isVotedPlayer &&
              showInstruction) ||
            (step === 5 &&
              showInstruction &&
              room.playerReady === room.playerIsVotedPlayer &&
              caseDetail.length > 0) ||
            (step === 6 && showInstruction)) && (
            <InstructionPlayGame
              onNext={() => {
                handleHideInstruction()
              }}
              isHost={is_host_controller_game}
              id={id}
            />
          )}
          {step === 4 &&
            !showInstruction &&
            showCasePlayGame &&
            !isReadyAnswer &&
            !isVotedProblem &&
            !isVotedPlayer && (
              <CasePlayGame
                onNext={() => {
                  handleHideCaseGameplay()
                }}
                isHost={is_host_controller_game}
                roomId={id}
                roundNumber={roundNow}
                cases={cases}
              />
            )}
          {step === 0 && (
            <ShareTeam
              onNext={() => {
                if (!is_host_controller_game) {
                  window.alert(t('Only the host can control the game.'))
                  return
                }
                update(room_ref, {
                  statusRunning: true,
                  step: 1,
                })
              }}
              isHost={is_host_controller_game}
              roomRef={room_ref}
            />
          )}
          {step === 1 && isReady === 0 && (
            <ChooseName
              onNext={(playerName) => {
                setIsReady(1)
                update(room_ref, {
                  playerReady: room.playerReady + 1,
                })
                handleSaveNewPlayer(playerName)
              }}
              roomRef={room_ref}
            />
          )}
          {step === 1 && isReady === 1 && (
            <WaitingPlayer
              onNext={() => {
                if (!is_host_controller_game) {
                  window.alert(t('Only the gamemaster can control the game.'))
                  return
                }
                if (room.playerTotal !== room.playerReady) {
                  alert(`some player did't ready`)
                } else {
                  handleRandomCase()
                  update(room_ref, {
                    step: 2,
                  })
                }
              }}
              onUpdateTotalRound={(number) => {
                update(room_ref, {
                  roundTotal: number,
                })
              }}
              onUpdateTotalUndercover={(number) => {
                update(room_ref, {
                  undercoverTotal: number,
                })
              }}
              IsHostControllerGameContext={is_host_controller_game}
              roomRef={room_ref}
              playersRef={players_ref}
            />
          )}
          {step === 2 && (
            <Instruction
              onNext={() => {
                if (!is_host_controller_game) {
                  window.alert(t('Only the gamemaster can control the game.'))
                  return
                }
                update(room_ref, {
                  step: 3,
                })
              }}
              isHost={is_host_controller_game}
              id={id}
            />
          )}
          {step === 3 && !showInstruction && !showCase && (
            <Role
              onNext={() => {
                setShowCase(true)
              }}
              myIp={ip}
              roomId={id}
              roundNumber={roundNow}
              caseNow={caseDetail[caseNow]}
              handleShowInstruction={() => {
                handleShowInstruction()
              }}
            />
          )}
          {step === 3 && !showInstruction && showCase && (
            <Case
              onNext={() => {
                if (!is_host_controller_game) {
                  window.alert(t('Only the gamemaster can control the game.'))
                  return
                }

                update(room_ref, {
                  step: 4,
                })

                let round_ref = ref(database, `rooms/${id}/rounds/r${roundNow}`)
                update(round_ref, {
                  timeout: 0,
                  start_time: Date.now(),
                })
              }}
              isHost={is_host_controller_game}
              roomId={id}
              roundNumber={roundNow}
              cases={cases}
              handleShowInstruction={() => {
                handleShowInstruction()
              }}
            />
          )}
          {step === 4 &&
            !showInstruction &&
            !showCasePlayGame &&
            !isReadyAnswer &&
            !isVotedProblem &&
            !isVotedPlayer && (
              <Problem
                onNext={() => {
                  setIsReadyAnswer(true)
                  update(room_ref, {
                    playerIsReadyAnswer: room.playerIsReadyAnswer + 1,
                  })
                }}
                roomRef={room_ref}
                cases={cases}
                handleShowInstruction={() => {
                  handleShowInstruction()
                }}
                handleShowCaseGamePlay={() => {
                  handleShowCaseGamePlay()
                }}
              />
            )}
          {step === 4 &&
            !showInstruction &&
            isReadyAnswer &&
            !isVotedProblem &&
            !isVotedPlayer && (
              <VoteCaseTheme
                onNext={(dataTheme) => {
                  setIsVotedProblem(true)
                  handleSaveVoteTheme(dataTheme)
                  update(room_ref, {
                    playerIsVotedProblem: room.playerIsVotedProblem + 1,
                  })
                }}
                cases={cases}
                caseNow={caseDetail[caseNow]}
                meData={me}
                handleShowInstruction={() => {
                  handleShowInstruction()
                }}
              />
            )}
          {step === 4 &&
            !showInstruction &&
            isReadyAnswer &&
            isVotedProblem &&
            !isVotedPlayer && (
              <VoteCasePlayer
                onNext={(dataPlayer) => {
                  setIsVotedPlayer(true)
                  handleSaveVotePlayer(dataPlayer)
                  update(room_ref, {
                    playerIsVotedPlayer: room.playerIsVotedPlayer + 1,
                  })
                }}
                room={room}
                meData={me}
                playersData={players}
                handleShowInstruction={() => {
                  handleShowInstruction()
                }}
              />
            )}
          {step === 4 &&
            !showInstruction &&
            isReadyAnswer &&
            isVotedProblem &&
            isVotedPlayer && <WaitingVote room_ref={room_ref} />}
          {step === 5 &&
            !showInstruction &&
            room.playerReady === room.playerIsVotedPlayer &&
            caseDetail.length > 0 && (
              <VoteCaseSuccess
                onNext={() => {
                  if (!is_host_controller_game) {
                    window.alert(t('Only the gamemaster can control the game.'))
                    return
                  }
                  if (caseDetail.length - 1 !== caseNow) {
                    update(room_ref, {
                      playerIsVotedPlayer: 0,
                      playerIsVotedProblem: 0,
                      caseNow: increment(1),
                    })
                  } else {
                    if (roundNow === room.roundTotal) {
                      update(room_ref, { step: 6 })
                    } else {
                      update(room_ref, {
                        playerIsReadyAnswer: 0,
                        playerIsVotedPlayer: 0,
                        playerIsVotedProblem: 0,
                        roundNow: increment(1),
                        step: 3,
                      })
                    }
                  }
                }}
                scoreAll={scores_all}
                playersRef={players_ref}
                caseNow={caseDetail[caseNow]}
                undercoverId={undercoverId}
                roomId={id}
                isHost={is_host_controller_game}
                handleShowInstruction={() => {
                  handleShowInstruction()
                }}
              />
            )}
          {step === 6 && !showInstruction && (
            <EndScreen
              scoreAllPlayer={scores_players}
              handleShowInstruction={() => {
                handleShowInstruction()
              }}
            />
          )}
        </div>
      </div>
    </Stack>
  )
}

export default GameView
