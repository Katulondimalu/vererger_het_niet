import { createContext } from 'react'

/**
 * @type {Context<import("firebase/database").DatabaseReference>}
 */
export const RoomContext = createContext(null)
export const IsHostControllerGame = createContext(false)
