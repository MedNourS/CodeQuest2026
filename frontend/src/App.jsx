import { useState } from 'react'
import './App.css'
import HorizontalLogo from "./assets/Horizontal_Logo.png"
import SelectedIngredients from './components/SelectedIngredients'
import IngredientSection from './components/IngredientSection'

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState(JSON.parse(localStorage.getItem("ingredients")))

  return (
    <div className="layout">
      <div className="header">
        <div className="headerLeft">
          <img src={HorizontalLogo} alt="Horizontal Logo" className="logo" />
        </div>
        <div className="headerRight">
          <button className="headerBtn">Get Recipes!</button>
        </div>
      </div>
      <div className="body">
        <div className="ingredientSection">
          <IngredientSection setSelectedIngredients={setSelectedIngredients}/>
        </div>
        <div className="rightPanel">
          <div className="selectedIngredients">
            <SelectedIngredients setSelectedIngredients={setSelectedIngredients}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App