import { Html } from "@react-three/drei"
import { HtmlProps } from "@react-three/drei/web/Html"
import { useState } from "react"

export function Tooltip({ children, ...props }: HtmlProps) {
  const [isOccluded, setOccluded] = useState(false)
  return (
    <Html
      position={[0, 0.75, 0]}
      scale={[0.1, 0.1, 0.1]}
      transform
      sprite
      occlude
      onOcclude={setOccluded}
      style={{
        transition: "all 0.2s",
        opacity: isOccluded ? 0 : 1,
        scale: isOccluded ? 0.05 : 1,
      }}
      {...props}
    >
      <div className="group card relative bg-base-100 p-2 px-6 select-none">
        <div className="absolute bottom-[-8px] left-1/2 h-0 w-0 -translate-x-1/2 border-t-[8px] border-r-[8px] border-l-[8px] border-t-base-100 border-r-transparent border-l-transparent" />
        {children}
      </div>
    </Html>
  )
}
