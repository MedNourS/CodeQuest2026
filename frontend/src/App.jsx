import { useState } from 'react'
import MiNYLogo from '../public/logo.svg'
import './App.css'
import { distance } from 'fastest-levenshtein'
<<<<<<< HEAD
import FoodItem from "./components/FoodSection"
import FoodSection from './components/FoodSection'
import HorizontalLogo from "./assets/Horizontal_Logo.png"
import SelectedIngredients from './components/SelectedIngredients'
=======
import IngredientSection from './components/IngredientSection'
>>>>>>> b5ca3433fbef46324cfec3706ea8dcd4750c9c6c

function App() {
  return (
    <>
      {SelectedIngredients}
      <img src={HorizontalLogo} alt="Horizontal Logo" className="logo"></img>
      <p>distance between food and fast is: {distance("food", "fast")}</p>
      <IngredientSection />
    </>
  )
}

export default App
