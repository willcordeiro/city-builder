"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToolbar } from "@/hooks/useTollbar";
import {
  Home,
  Store,
  Factory,
  Route,
  Trash2,
  Camera,
  CameraOff,
  RefreshCcw,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface CityBuilderToolbarProps {
  onResetCamera: () => void;
}

const buildingThumbnails = {
  residential: "/assets/toolbarImage/smallHouse.png",
  residentialLarge: "/assets/toolbarImage/bigHouse.png",
  residentialApartment: "/assets/toolbarImage/apartament.png",

  commercialSmall: "/assets/toolbarImage/comercialSmall.png",
  commercialRestaurant: "/assets/toolbarImage/ComercialLight.png",
  commercialOffice: "/assets/toolbarImage/ComercialBig.png",

  industrialHeavy: "/assets/toolbarImage/industrialHeavy.png",
  industrialLight: "/assets/toolbarImage/ComercialTall.png",
  industrialWarehouse: "/assets/toolbarImage/comercialStock.png",
};

export function ToolbarSidebar({ onResetCamera }: CityBuilderToolbarProps) {
  const { selectedToolId, toggleToolSelect, isIsometric, toggleIsometricView } =
    useToolbar();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toolbarItems = [
    {
      id: "residential",
      label: "Residencial",
      icon: Home,
      color: "bg-blue-500 hover:bg-blue-600",
      subOptions: [
        { id: "residential", label: "Casa Pequena", cost: "$5,000" },
        { id: "residentialLarge", label: "Casa Grande", cost: "$10,000" },
        { id: "residentialApartment", label: "Apartamento", cost: "$15,000" },
      ],
    },
    {
      id: "commercial",
      label: "Comercial",
      icon: Store,
      color: "bg-green-500 hover:bg-green-600",
      subOptions: [
        { id: "commercialSmall", label: "Loja Pequena", cost: "$7,000" },
        { id: "commercialRestaurant", label: "Restaurante", cost: "$12,000" },
        { id: "commercialOffice", label: "Escritório", cost: "$20,000" },
      ],
    },
    {
      id: "industrial",
      label: "Industrial",
      icon: Factory,
      color: "bg-yellow-500 hover:bg-yellow-600",
      subOptions: [
        { id: "industrialHeavy", label: "Indústria Pesada", cost: "$25,000" },
        { id: "industrialLight", label: "Indústria Leve", cost: "$18,000" },
        { id: "industrialWarehouse", label: "Armazém", cost: "$15,000" },
      ],
    },
    {
      id: "road",
      label: "Estrada",
      icon: Route,
      color: "bg-gray-500 hover:bg-gray-600",
      selectedColor: "bg-gray-700 hover:bg-gray-700",
    },
    {
      id: "bulldoze",
      label: "Demolir",
      icon: Trash2,
      color: "bg-white-500 hover:bg-red-600",
    },
    {
      id: "camera-toggle",
      label: isIsometric ? "Visão Normal" : "Visão Isométrica",
      icon: isIsometric ? CameraOff : Camera,
      action: toggleIsometricView,
      color: "bg-white-500 hover:bg-gray-600",
    },
    {
      id: "reset-camera",
      label: "Resetar Câmera",
      icon: RefreshCcw,
      action: onResetCamera,
      color: "bg-white-500 hover:bg-gray-600",
    },
  ];

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  const closeBuildingPanel = () => {
    setActiveCategory(null);
  };

  const selectedCategory = toolbarItems.find(
    (item) => item.id === activeCategory
  );

  return (
    <>
      {activeCategory && (
        <div
          className="fixed inset-0 bg-black/30 z-20"
          onClick={closeBuildingPanel}
        />
      )}

      {selectedCategory && (
        <Card className="fixed bottom-24 left-1/2 -translate-x-1/2 z-30 p-4 shadow-xl w-full max-w-4xl h-64 bg-gray-800 border-gray-700">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-white">
              {selectedCategory.label}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeBuildingPanel}
              className="h-8 w-8 text-white hover:bg-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-3 h-[calc(100%-40px)] overflow-y-auto">
            {selectedCategory.subOptions?.map((subOption) => (
              <Button
                key={subOption.id}
                onClick={() => {
                  toggleToolSelect(subOption.id);
                  closeBuildingPanel();
                }}
                variant={"default"}
                className={`flex flex-col items-center h-28 gap-2 p-2 ${
                  selectedToolId === subOption.id
                    ? selectedCategory.color
                        .replace("hover:", "")
                        .replace("bg-", "bg-")
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                <div className="relative h-16 w-full flex-1">
                  <Image
                    src={
                      buildingThumbnails[
                        subOption.id as keyof typeof buildingThumbnails
                      ]
                    }
                    alt={subOption.label}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-white">
                    {subOption.label}
                  </p>
                  <p className="text-xs text-gray-300">{subOption.cost}</p>
                </div>
              </Button>
            ))}
          </div>
        </Card>
      )}

      <Card className="fixed bottom-4 left-1/2 -translate-x-1/2 z-10 p-3 shadow-lg flex flex-row gap-3 items-center bg-gray-800 border-gray-700 rounded-xl">
        {toolbarItems.map((item) => {
          const isSelected =
            activeCategory === item.id ||
            (item.subOptions &&
              item.subOptions.some((sub) => sub.id === selectedToolId));

          if (item.action) {
            return (
              <Button
                key={item.id}
                onClick={item.action}
                className={`flex flex-col h-14 w-14 p-3 rounded-lg ${item.color} text-white`}
                size="icon"
              >
                <item.icon className="h-6 w-6" />
              </Button>
            );
          } else if (!item.subOptions) {
            return (
              <Button
                key={item.id}
                onClick={() => toggleToolSelect(item.id)}
                className={`flex flex-col h-14 w-14 p-3 rounded-lg ${
                  selectedToolId === item.id
                    ? item.id === "bulldoze"
                      ? "bg-red-600 hover:bg-red-700"
                      : item.id === "road"
                      ? "bg-gray-700 hover:bg-gray-700"
                      : item.color.replace("hover:", "").replace("bg-", "bg-")
                    : item.color
                } text-white`}
                size="icon"
              >
                <item.icon className="h-6 w-6" />
              </Button>
            );
          }

          return (
            <Button
              key={item.id}
              onClick={() => handleCategoryClick(item.id)}
              className={`flex flex-col h-14 w-14 p-3 rounded-lg ${
                isSelected
                  ? item.color.replace("hover:", "").replace("bg-", "bg-")
                  : item.color
              } text-white`}
              size="icon"
            >
              <item.icon className="h-6 w-6" />
            </Button>
          );
        })}
      </Card>
    </>
  );
}
