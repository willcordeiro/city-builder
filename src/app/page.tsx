import ThreeScene from "@/components/ThreeScene";
import CityProvider from "@/providers/CityProvider";
import { ToolbarProvider } from "@/providers/ToolbarProvider";

export default function Home() {
  const gridSize = 16;

  return (
    <CityProvider size={gridSize}>
      <ToolbarProvider>
        <ThreeScene size={gridSize} />
      </ToolbarProvider>
    </CityProvider>
  );
}
