"use client"

import { City, Tile } from "@/types/city"
import { createCity } from "@/utils/city-generator"
import { createContext, PropsWithChildren, useState, useCallback } from "react"
import assets from "@/utils/assets"

interface ICityContext {
  city: City
  updateAssetLoading: (x: number, y: number, isLoading: boolean) => void
  updateTileBuilding: (x: number, y: number, buildingId: string | null) => void
  getTile: (x: number, y: number) => Tile
  selectedTile: { x: number; y: number } | null
  setSelectedTile: (tile: { x: number; y: number } | null) => void
}

export const CityContext = createContext<ICityContext>({} as ICityContext)

interface CityProviderProps {
  size: number
}

export default function CityProvider({ size, children }: PropsWithChildren<CityProviderProps>) {
  const [city, setCity] = useState(() => createCity(size))
  const [selectedTile, setSelectedTile] = useState<{ x: number; y: number } | null>(null)

  const updateAssetLoading = useCallback((x: number, y: number, isLoading: boolean) => {
    setCity(prevCity => ({
      ...prevCity,
      data: prevCity.data.map((row, rowIndex) => 
        rowIndex === x 
          ? row.map((cell, colIndex) => 
              colIndex === y ? { ...cell, loading: isLoading } : cell
            ) 
          : row
      )
    }))
  }, [])

  const updateTileBuilding = useCallback((x: number, y: number, buildingId: string | null) => {
    setCity(prevCity => ({
      ...prevCity,
      data: prevCity.data.map((row, rowIndex) => 
        rowIndex === x 
          ? row.map((cell, colIndex) => 
              colIndex === y 
                ? { 
                    ...cell, 
                    building: buildingId ? assets[buildingId] : undefined,
                    loading: !!buildingId
                  } 
                : cell
            ) 
          : row
      )
    }))
  }, [])

  const getTile = useCallback((x: number, y: number) => {
    return city.data[x][y]
  }, [city.data])

  return (
    <CityContext.Provider value={{ 
      city, 
      updateAssetLoading, 
      updateTileBuilding,
      getTile,
      selectedTile,
      setSelectedTile
    }}>
      {children}
    </CityContext.Provider>
  )
}