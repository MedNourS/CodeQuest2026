function RecipeItem({ meal, matchCount, totalSearched, hasAll, ingredients, missingFromRecipe }) {
    return (
        <div>
            <img src={meal.strMealThumb} alt={meal.strMeal} width={100} />
            <h3>{meal.strMeal}</h3>
            <p>Category: {meal.strCategory} | Area: {meal.strArea}</p>
            <p>
                {hasAll
                    ? `You have all ingredients!`
                    : `This recipe has ${matchCount} / ${totalSearched} of your ingredients`}
            </p>
            {missingFromRecipe.length > 0 && (
                <p>Missing: {missingFromRecipe.join(", ")}</p>
            )}
            <ul>
                {ingredients.map((ing) => (
                    <li key={ing}>{ing}</li>
                ))}
            </ul>
        </div>
    );
}

export default RecipeItem;