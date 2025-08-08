"use client"

import { Suspense } from "react"
import { Environment, Sky } from "@react-three/drei"

type LocalEnvironmentProps = {
  /**
   * Public path to your HDR. Place the file under public/hdri/.
   * Example: public/hdri/potsdamer_platz_1k.hdr -> "/hdri/potsdamer_platz_1k.hdr"
   */
  path?: string
  /**
   * Set as scene background.
   */
  background?: boolean
  /**
   * Amount of blur applied to the environment.
   */
  blur?: number
}

export function LocalEnvironment({
  path = "/assets/textures/potsdamer_platz_1k.hdr",
  background = false,
  blur = 0.1,
}: LocalEnvironmentProps) {
  // Suspense fallback renders a procedural sky while HDR loads or if it fails.
  return (
    <Suspense
      fallback={
        <Sky
          sunPosition={[10, 10, 10]}
          inclination={0.47}
          azimuth={0.25}
          mieCoefficient={0.02}
          rayleigh={2}
          turbidity={8}
        />
      }
    >
      <Environment files={path} background={background} blur={blur} />
    </Suspense>
  )
}
