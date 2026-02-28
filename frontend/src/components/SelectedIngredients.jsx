import IngredientItem from "./IngredientItem";

function SelectedIngredients(props){

    let ingredients = JSON.parse(localStorage.getItem('ingredients'));

    return(
        <div className="ingredientGrid">
            {ingredients != null ? ingredients.map((value, index) => (
                <IngredientItem key={index} name={value} setSelectedIngredients={props.setSelectedIngredients}/>
            )): <></>}
        </div>
    );
}
export default SelectedIngredients;