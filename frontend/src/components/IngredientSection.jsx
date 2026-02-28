import { useEffect, useState } from "react";

function IngredientSection() {
  const [ingredientsList, setIngredientList] = useState([]);

  useEffect(() => {
    const fetchFoodList = async () => {
      const date = new Date();
      date.setMinutes(date.getMinutes() - 1);

      const response = await fetch(
        `https://www.webmd.com/search/2/api/get_food_results?name=tomato&count=10`,
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
      return data;
    }

    console.log(fetchFoodList());
  }, []);

  return (
    <div>
      <button onClick={() => console.log(fetchFoodList())}>Click for IngredientsList</button>
    </div>
  );
}

export default IngredientSection;