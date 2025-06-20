import { useState } from "react"
import { Header } from "./components/header"
import { PokeCard } from "./components/PokeCard"
import { SideNav } from "./components/SideNav"

function App() {
  const [selectedPokemon, setSeletedPokemon] = useState(200);  

  return (
    <>
      <Header/>
      <SideNav selectedPokemon={selectedPokemon} 
               setSeletedPokemon={setSeletedPokemon}
      />
      <PokeCard selectedPokemon={selectedPokemon}/>
    </>
  )
}

export default App
