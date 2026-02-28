import { useEffect, useState } from "react";
import IngredientItem from "./IngredientItem";

function IngredientSection() {
  const [ingredientsList, setIngredientList] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  async function fetchFoodList(e) {
    const response = await fetch(
      `https://www.webmd.com/search/2/api/get_food_results?name=${e.target.value}&count=2000`,
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
    setIngredientList(data.results.foodItems.slice(0,10))
    return data;
  }

  // useEffect(() => {
  //   console.log(fetchFoodList("*"));
  // }, []);

  return (
    <div>
      <button onClick={() => console.log(fetchFoodList("*"))}>Click for IngredientsList</button>
      <input type="text" onChange={(e) => fetchFoodList(e)}></input><br/>
      {ingredientsList != undefined ? ingredientsList.map((value, index) => (
          <IngredientItem
            key={index}
            name={value.search_text_s.split(", ")[0]}
            detail={value.search_text_s.split(", ").slice(1)}
          />
        )
      ) : <div></div>}
    </div>
  );
}

export default IngredientSection;