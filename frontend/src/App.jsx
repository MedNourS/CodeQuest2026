import { useState } from 'react'
import MiNYLogo from '../public/logo.svg'
import './App.css'
import { distance } from 'fastest-levenshtein'
import HorizontalLogo from "./assets/Horizontal_Logo.png"
import SelectedIngredients from './components/SelectedIngredients'
import IngredientSection from './components/IngredientSection'
import Utility from './components/Utilitiy'


function App() {
  const [selectedIngredients, setSelectedIngredients] = useState(JSON.parse(localStorage.getItem("ingredients")))

  return (
    <>
      <div className="layout">
      <head>
        <title>MiNY Crave</title>
      </head>
        <header className="header">
          <div className="headerLeft"></div>
              <img src={HorizontalLogo} alt="Horizontal Logo" className="logo" />
          <div className="headerRight">
            <button className="headerBtn">Get Recipes!</button>
      </div>
        </header>

        <div className="body">
          <div className="ingredientSection"><IngredientSection setSelectedIngredients={setSelectedIngredients}/></div>
          <div className="rightPanel">
            <div className="selectedIngredients"><SelectedIngredients setSelectedIngredients={setSelectedIngredients}/></div>
            <div className="utility"><Utility /> </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
