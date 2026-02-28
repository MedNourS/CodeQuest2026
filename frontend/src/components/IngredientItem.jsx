function IngredientItem(props) {
  return (
    <div className="ingredientItem">
      <p className="ingredientName">{props.name}</p>
    </div>
  )
}

export default IngredientItem;