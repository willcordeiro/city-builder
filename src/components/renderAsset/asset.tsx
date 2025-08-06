"use client"

import { useAsset } from "@/hooks/useAssetManager"
import useCity from "@/hooks/useCity"
import { getAdjustedPosition } from "@/utils/positionUtils"
import { useEffect } from "react"
import * as THREE from "three"
import { Asset as AssetType } from "@/utils/assets"

interface AssetProps {
  asset: AssetType
  position: [number, number, number] // [x, y, z] in Three.js coordinates
  handlePointerDown: (event: THREE.Event) => void
}

function Asset({ asset, position, handlePointerDown }: AssetProps) {
  const { city, updateAssetLoading } = useCity()
  const x = position[0] // Grid X
  const y = position[2] // Grid Y (using Z for grid Y in 3D space)

  // Ensure currentAsset is always up-to-date with the latest city state
  const currentAsset = city.data[x]?.[y]

  // Load models
  const model = useAsset(asset.id)
  const modelLoading = useAsset("constructionSmall")

  useEffect(() => {
    if (currentAsset && currentAsset.loading) {
      const timeout = setTimeout(() => {
        // Update the loading state via the context function
        updateAssetLoading(x, y, false)
      }, 3000) // Simulate loading time

      return () => clearTimeout(timeout)
    }
  }, [currentAsset?.loading, x, y, updateAssetLoading]) // Dependencies: re-run if loading state or position changes

  // Determine which model to display based on loading state
  const activeModel = currentAsset && currentAsset.loading ? modelLoading : model

  // Render a single group and primitive, changing only the object prop
  if (!currentAsset) return null // Handle cases where currentAsset might be undefined

  return (
    <group
      position={getAdjustedPosition(position, asset.position)}
      scale={[0.25, 0.25, 0.25]}
      onPointerDown={handlePointerDown}
      castShadow
      receiveShadow
    >
      <primitive object={activeModel} />
    </group>
  )
}

export default Asset

//todo buildings appear all at once if other building is loading
//todo render system flicking while placing buildings
//todo render sustem have a tick rate which is not the best way to do it