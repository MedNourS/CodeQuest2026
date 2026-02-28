import IngredientItem from "./IngredientItem";

function SelectedIngredients(){

    let ingredients = JSON.parse(localStorage.getItem('ingredients'));

    return(
        <div className="ingredientGrid">
            {ingredients != null ? ingredients.map((value, index) => (
                <IngredientItem name={value}/>
            )): <></>}
        </div>
    );
}

export default SelectedIngredients;