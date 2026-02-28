import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { distance } from 'fastest-levenshtein'
import IngredientSection from './components/IngredientSection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p>distance between food and fast is: {distance("food", "fast")}</p>
      <IngredientSection />
    </>
  )
}

export default App
