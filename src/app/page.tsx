import ThreeScene from "@/components/ThreeScene";
import CityProvider from "@/providers/cityProvider";

export default function Home() {

  const gridSize = 32; // Define o tamanho do grid

  return <CityProvider size={gridSize}><ThreeScene size={gridSize}/></CityProvider>;
}
