import { useContext } from "react";
import { CityContext } from "@/providers/CityProvider";

export default function useCity() {
  const context = useContext(CityContext);
  if (!context) throw new Error("useCity must be used within CityProvider.");

  return context;
}
