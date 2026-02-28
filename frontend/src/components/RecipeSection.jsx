import { useState, useEffect } from "react";
import RecipeItem from "./RecipeItem";

const searchIngredients = ["salt", "vinegar", "potato", "bubblegum"];

// Delay function
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetches items with a max of `limit` requests running at once, 750ms between each
async function fetchWithConcurrency(items, limit, fetchFn) {
    const results = new Array(items.length).fill(null);
    let currentIndex = 0;
    async function worker() {
        while (currentIndex < items.length) {
            const index = currentIndex++;
            results[index] = await fetchFn(items[index]);
            await delay(750);
        }
    }
    await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
    return results;
}

async function fetchSortedRecipes(signal) {
    // 1. Get all recipe IDs that match any of the searched ingredients
    const recipeLists = await Promise.all(
        searchIngredients.map((ingredient) =>
            fetch(`/api/mealdb/filter.php?i=${ingredient}`, { signal })
                .then((response) => response.json())
                .then((data) => data.meals || [])
                .catch((error) => { if (error.name === "AbortError") throw error; return []; })
        )
    );

    // Deduplicate recipes by ID
    const allRecipes = Object.values(
        recipeLists.flat().reduce((acc, recipe) => ({ ...acc, [recipe.idMeal]: recipe }), {})
    );

    // 2. Fetch full details for each recipe (5 at a time)
    const detailedRecipes = (
        await fetchWithConcurrency(allRecipes, 5, (recipe) =>
            fetch(`/api/mealdb/lookup.php?i=${recipe.idMeal}`, { signal })
                .then((response) => response.json())
                .then((data) => data.meals?.[0])
                .catch((error) => { if (error.name === "AbortError") throw error; return null; })
        )
    ).filter(Boolean);

    // 3. Score each recipe by how well it matches the user's ingredients
    const scored = detailedRecipes.map((meal) => {
        const ingredients = Object.keys(meal)
            .filter((key) => key.startsWith("strIngredient"))
            .map((key) => meal[key])
            .filter(Boolean);

        const mealIngredientsLower = ingredients.map((ingredient) => ingredient.toLowerCase());
        const matchedIngredients = searchIngredients.filter((ingredient) => mealIngredientsLower.some((mealIngredient) => mealIngredient.includes(ingredient.toLowerCase())));
        const missingFromRecipe = ingredients.filter((ingredient) => !searchIngredients.some((userIngredient) => ingredient.toLowerCase().includes(userIngredient.toLowerCase())));
        const isExactMatch = mealIngredientsLower.every((mealIngredient) => searchIngredients.some((ingredient) => mealIngredient.includes(ingredient.toLowerCase())));

        return { meal, matchCount: matchedIngredients.length, totalSearched: searchIngredients.length, isExactMatch, ratio: matchedIngredients.length / ingredients.length, ingredients, matchedIngredients, missingFromRecipe };
    });

    // Prefer recipes where the user has ALL required ingredients, otherwise sort by best ratio
    const exactMatches = scored.filter((recipe) => recipe.isExactMatch);
    return (exactMatches.length > 0 ? exactMatches : scored.sort((a, b) => b.ratio - a.ratio)).slice(0, 5);
}

function RecipeSection() {
    const [recipes, setRecipes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        fetchSortedRecipes(controller.signal)
            .then((result) => { setRecipes(result); setLoading(false); })
            .catch((error) => { if (error.name !== "AbortError") { setError(error.message); setLoading(false); } });
        return () => controller.abort();
    }, []);

    if (loading) return <p>Searching for recipes, this may take a moment...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!recipes || recipes.length === 0) return <p>No recipes found.</p>;

    return (
        <>
            <h2>Recipes matching: {searchIngredients.join(", ")}</h2>
            {recipes.map(({ meal, matchCount, totalSearched, isExactMatch, ingredients, missingFromRecipe }) => (
                <RecipeItem key={meal.idMeal} meal={meal} matchCount={matchCount} totalSearched={totalSearched} hasAll={isExactMatch} ingredients={ingredients} missingFromRecipe={missingFromRecipe} />
            ))}
        </>
    );
}

export default RecipeSection;