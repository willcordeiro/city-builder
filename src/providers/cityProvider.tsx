"use client"

import { City } from "@/types/city"
import { createCity } from "@/utils/city-generator"
import { createContext, PropsWithChildren, useRef } from "react"

interface ICityContext {
  city: City
}

export const CityContext = createContext({} as ICityContext)

interface CityProviderProps {
  size: number
}

export default function CityProvider({ size, children }:  PropsWithChildren<CityProviderProps>) {

  const city = useRef(createCity(size))


  return (
    <CityContext.Provider value={{ city: city.current }}>
      {children}
    </CityContext.Provider>
  )
}