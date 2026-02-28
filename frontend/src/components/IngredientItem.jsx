import './IngredientItem.css'

function IngredientItem(props) {
  const addToLS = () => {
    const ingredientList = localStorage.getItem('ingredients');
    if(ingredientList.includes(props.name)) return;
    localStorage.setItem('ingredients', JSON.stringify([...ingredientList, props.name]));
  }

  return (
    <div className="ingredientItem">
      <p className="ingredientName">{props.name}</p>
    </div>
  )
}

export default IngredientItem;