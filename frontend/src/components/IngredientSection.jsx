import { useEffect, useState } from "react";
import IngredientItem from "./IngredientItem";
import "./IngredientSection.css";

function IngredientSection() {
  const numResults = 10;
  const [ingredientsList, setIngredientList] = useState([]);
  const [inputValue, setInputValue] = useState("");

  //Fetches the ingredients
  async function fetchFoodList(input) {
    const response = await fetch(
      `https://www.webmd.com/search/2/api/get_food_results?name=${input}&count=2000`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "client_id": "e4e3f73a-0ceb-4d37-939e-90ddb1238360",
          "enc_data": "xcC6J4WMDPhByUcoL8JCnrkrD2Ld/NFT7EKn03NntFo=",
          "timestamp": "Sat, 28 Feb 2026 17:19:09 GMT"
        },
      }
    );

    const data = await response.json();

    //Removes duplicates
    let foodListIndex = 0;
    let tempFoodList = [];
    for(let i = 0; i < numResults;) {
      const search_string = data.results.foodItems[foodListIndex].search_text_s.split(", ")[0];
      if(tempFoodList.includes(search_string)){
        foodListIndex++;
        continue;
      }
      else{
        console.log(foodListIndex)
        tempFoodList = [...tempFoodList, search_string];
        i++;
      }
    }
    setIngredientList(tempFoodList);
    return data;
  }


  //Timer for user input, waits for user to finish typing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchFoodList(inputValue);
    }, 200);

    // Cleanup function to clear the previous timeout on every input change
    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue]);

  console.log(typeof(ingredientsList));

  return (
    <div className="ingredientSectionWrapper">
    <input type="text" className="ingredientSearch" placeholder="Search for Ingredients" onChange={(e) => setInputValue(e.target.value)} />
    <div className="ingredientGrid">
      {ingredientsList != undefined ? ingredientsList.map((value, index) => (
          <IngredientItem
            key={index}
            name={value}
          />
        )
      ) : <div></div>}
    </div>
    </div>
  );
}

export default IngredientSection;