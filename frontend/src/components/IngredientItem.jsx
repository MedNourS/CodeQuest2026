import './IngredientItem.css'
import { useState } from 'react';

function IngredientItem(props) {

  const addToLS = () => {
    const ingredientList = JSON.parse(localStorage.getItem('ingredients'));
    if (ingredientList == null){
      localStorage.setItem('ingredients', JSON.stringify([props.name]));
      ingredientList = [props.name];
    }
    if(ingredientList.includes(props.name)) return;
    localStorage.setItem('ingredients', JSON.stringify([...ingredientList, props.name]));
    props.setSelectedIngredients([...ingredientList, props.name]);
  }

  return (
    <div className="ingredientItem">
      <p className="ingredientName">{props.name}</p>
      <button className="addBtn" onClick={addToLS}><p>+</p></button>
    </div>
  )
}

export default IngredientItem;