"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import { createCity } from "@/utils/city-generator"
import { CityTile } from "./city-tile"
import type { City } from "@/types/city"
import buildingFactory from "@/utils/building-constants"

interface CityGridProps {
  size: number
  selectedToolId?: string
}

export function CityGrid({ size, selectedToolId }: CityGridProps) {
  const city: City = useMemo(() => createCity(size), [size])
  const [tick, setTick] = useState(0)
  const [selectedTile, setSelectedTile] = useState<{
    x: number
    y: number
  } | null>(null)
  const toolRef = useRef<string | undefined>(selectedToolId)

  useEffect(() => {
    toolRef.current = selectedToolId
  }, [selectedToolId])

  // Efeito para o loop de atualização dos edifícios (crescimento dinâmico ao longo do tempo)
  useEffect(() => {
    const interval = setInterval(() => {
      let changed = false
      for (let x = 0; x < city.size; x++) {
        for (let y = 0; y < city.size; y++) {
          const tile = city.data[x][y]
          if (tile.building) {
            tile.building.update() // Chama a função de atualização do edifício
            if (tile.building.updated) {
              changed = true
              tile.building.updated = false // Reseta a flag 'updated' após processar
            }
          }
        }
      }
      if (changed) {
        setTick((t) => t + 1) // Incrementa o tick para forçar a re-renderização se algo mudou
      }
    }, 1000) // Atualiza a cada 1000ms (1 segundo). Ajuste conforme necessário.

    return () => clearInterval(interval) // Limpa o intervalo ao desmontar o componente
  }, [city])

  const handleSelectTile = (x: number, y: number) => {
    setSelectedTile({ x, y })
    const currentTool = toolRef.current

    if (currentTool && currentTool === "bulldoze") {
      // Lógica para a ferramenta "bulldoze"
      if (city.data[x][y].building) {
        city.data[x][y].building = undefined // Remove o edifício
      }
      setTick((t) => t + 1)
    } else if (currentTool && buildingFactory[currentTool]) {
      // Lógica para ferramentas de construção (residential, commercial, industrial, road)
      const existingBuilding = city.data[x][y].building

      // Se não há edifício ou o edifício existente é de um tipo diferente
      if (!existingBuilding || existingBuilding.id !== currentTool) {
        const newBuilding = buildingFactory[currentTool]()

        // Aumenta a altura imediatamente ao colocar o edifício, conforme solicitado
        // Garante que não exceda a altura máxima definida no building-constants (ex: 5)
        if (newBuilding.height < 5) {
          // Verifica se ainda pode crescer
          newBuilding.height += 1 // Aumenta a altura em 1 (ex: de 1 para 2)
        }
        newBuilding.updated = true // Marca como atualizado para garantir re-renderização imediata

        city.data[x][y].building = newBuilding
        setTick((t) => t + 1) // Força a re-renderização
      }
      // Se o mesmo tipo de edifício for clicado novamente, não faz nada aqui.
      // O crescimento contínuo será tratado pelo loop de atualização do useEffect.
    }
  }

  const tiles = useMemo(() => {
    const tileComponents = []
    for (let x = 0; x < city.size; x++) {
      for (let y = 0; y < city.size; y++) {
        const tile = city.data[x][y]
        const position: [number, number, number] = [x, 0, y] // Posição no grid 3D
        const isSelected = selectedTile !== null && selectedTile.x === x && selectedTile.y === y

        tileComponents.push(
          <CityTile
            key={`tile-${x}-${y}-${tick}-${selectedToolId}`}// Adiciona 'tick' à chave para forçar re-renderização quando a altura do edifício muda
            tile={tile}
            position={position}
            terrainID={tile.terrainID}
            selectedToolId={selectedToolId}
            selected={isSelected}
            onSelectTile={handleSelectTile}
          />,
        )
      }
    }
    return tileComponents
  }, [city, tick, selectedTile, selectedToolId]) // 'tick' é a dependência chave para re-renderizar quando os edifícios crescem

  return <group>{tiles}</group>
}
