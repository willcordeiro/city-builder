"use client"

import { City } from "@/types/city"
import { createCity } from "@/utils/city-generator"
import { createContext, PropsWithChildren, useState, useCallback } from "react"

interface ICityContext {
  city: City
  updateAssetLoading: (x: number, y: number, isLoading: boolean) => void
}

export const CityContext = createContext({} as ICityContext)

interface CityProviderProps {
  size: number
}

export default function CityProvider({ size, children }: PropsWithChildren<CityProviderProps>) {
  const [city, setCity] = useState(() => createCity(size))

  const updateAssetLoading = useCallback((x: number, y: number, isLoading: boolean) => {
    setCity((prevCity) => {
      // Create a new data array to ensure immutability
      const newCityData = prevCity.data.map((row, rowIndex) => {
        if (rowIndex === x) {
          return row.map((cell, colIndex) => {
            if (colIndex === y) {
              // Create a new cell object with updated loading status
              return { ...cell, loading: isLoading }
            }
            return cell
          })
        }
        return row
      })
      // Return a new city object with the updated data
      return { ...prevCity, data: newCityData }
    })
  }, []) // useCallback with empty dependency array ensures this function is stable

  return (
    <CityContext.Provider value={{ city, updateAssetLoading }}>
      {children}
    </CityContext.Provider>
  )
}
