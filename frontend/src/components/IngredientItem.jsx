import './IngredientItem.css'

function IngredientItem(name) {
  return (
    <div className="ingredientItem">
      <p className="ingredientName">{name}</p>
      <button className="addBtn" >+</button>
    </div>
  )
}

export default IngredientItem;