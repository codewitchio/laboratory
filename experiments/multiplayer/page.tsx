"use client"

import Game from "@/experiments/multiplayer/game"
import { insertCoin, onPlayerJoin } from "playroomkit"
import { useEffect, useState } from "react"

export default function MultiplayerPage() {
  const [coinInserted, setCoinInserted] = useState(false)
  useEffect(() => {
    insertCoin({ skipLobby: true, roomCode: "qwerty" }, () => {
      setCoinInserted(true)
    })
    onPlayerJoin((player) => {
      console.debug(`player ${player.id} joined`, player)
    })
  }, [])
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-info">
      {/* <h1>Multiplayer</h1> */}
      {coinInserted && <Game />}
    </div>
  )
}
