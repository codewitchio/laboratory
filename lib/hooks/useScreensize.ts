import { useEffect, useState } from "react"

export function useScreenSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const { width, height } = size

  return {
    width,
    height,
    isSmall: width < 768,
    isMedium: width >= 768,
    isLarge: width >= 1024,
    isBetweenMediumAndLarge: width >= 768 && width < 1024,
  }
}
