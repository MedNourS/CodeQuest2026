import { useState } from 'react'
import MiNYLogo from '../public/logo.svg'
import './App.css'
import { distance } from 'fastest-levenshtein'
import FoodItem from "./components/FoodSection"
import FoodSection from './components/FoodSection'
import HorizontalLogo from "./assets/Horizontal_Logo.png"
import SelectedIngredients from './components/SelectedIngredients'

function App() {
  return (
    <>
      {SelectedIngredients}
      <img src={HorizontalLogo} alt="Horizontal Logo" className="logo"></img>
      <p>distance between food and fast is: {distance("food", "fast")}</p>
      <FoodSection/>
    </>
  )
}

export default App
