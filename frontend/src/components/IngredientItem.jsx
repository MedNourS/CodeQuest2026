import './IngredientItem.css'

function IngredientItem(props) {
  const ingredientList = JSON.parse(localStorage.getItem('ingredients')) ?? [];
  const isSelected = ingredientList.includes(props.name);

  const toggleItem = () => {
    const ingredientList = JSON.parse(localStorage.getItem('ingredients')) ?? [];
    if (isSelected) {
      const updated = ingredientList.filter(item => item !== props.name);
      localStorage.setItem('ingredients', JSON.stringify(updated));
      props.setSelectedIngredients(updated);
    } else {
      if (ingredientList.includes(props.name)) return;
      const updated = [...ingredientList, props.name];
      localStorage.setItem('ingredients', JSON.stringify(updated));
      props.setSelectedIngredients(updated);
    }
  }

  return (
    <div className="ingredientItem">
      <p className="ingredientName">{props.name}</p>
      <button className="addBtn" onClick={toggleItem}><p>{isSelected ? '-' : '+'}</p></button>
    </div>
  )
}

export default IngredientItem;