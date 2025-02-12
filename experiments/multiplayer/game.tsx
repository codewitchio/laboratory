import { myPlayer, usePlayersState, usePlayerState } from "playroomkit"
import { useEffect } from "react"

export default function Game() {
  const [mousePosition, setMouseposition] = usePlayerState(
    myPlayer(),
    "mousePosition",
    [0, 0]
  )

  const mousePositions = usePlayersState("mousePosition")
  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      setMouseposition(
        [e.clientX / window.innerWidth, e.clientY / window.innerHeight],
        false
      )
    })
  }, [setMouseposition])
  return (
    <div className="relative h-screen w-screen">
      {mousePositions.map((mousePosition) => (
        <div
          key={mousePosition.player.id}
          className="absolute h-4 w-4 rounded-full bg-blue-500"
          style={{
            left: `${mousePosition.state?.[0] * 100}%`,
            top: `${mousePosition.state?.[1] * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  )
}
