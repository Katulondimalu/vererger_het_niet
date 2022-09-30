import React from 'react'
import { Navigate, useParams } from 'react-router-dom'

const MakeGame = () => {
  let { language } = useParams()
  return <Navigate to={`/${language}/game`} />
}

export default MakeGame
