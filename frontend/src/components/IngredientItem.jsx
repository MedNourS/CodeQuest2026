import './IngredientItem.css'
import { useState } from 'react';

function IngredientItem(props) {
  const [render, setRender] = useState(0);

  const addToLS = () => {
    const ingredientList = JSON.parse(localStorage.getItem('ingredients'));
    if (ingredientList == null){
      localStorage.setItem('ingredients', JSON.stringify([props.name]));
      ingredientList = [props.name];
    }
    if(ingredientList.includes(props.name)) return;
    localStorage.setItem('ingredients', JSON.stringify([...ingredientList, props.name]));
    setRender(render + 1);
  }

  return (
    <div className="ingredientItem">
      <p className="ingredientName">{props.name}</p>
      <button className="addBtn" onClick={addToLS}>+</button>
    </div>
  )
}

export default IngredientItem;