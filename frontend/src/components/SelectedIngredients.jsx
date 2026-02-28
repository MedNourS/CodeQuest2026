import IngredientItem from "./IngredientItem";

function SelectedIngredients(props) {
  let ingredients = JSON.parse(localStorage.getItem('ingredients'));

  const clearAll = () => {
    localStorage.setItem('ingredients', JSON.stringify([]));
    props.setSelectedIngredients([]);
  }

  return (
    <div>
      <button className="clearBtn" onClick={clearAll}>Clear All</button>
      <div className="ingredientGrid">
        {ingredients != null ? ingredients.map((value, index) => (
          <IngredientItem key={index} name={value} setSelectedIngredients={props.setSelectedIngredients} />
        )) : <></>}
      </div>
    </div>
  );
}

export default SelectedIngredients;