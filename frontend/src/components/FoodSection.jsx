import { useEffect, useState } from "react";

function FoodSection() {
  const API_KEY = "ImeZvrgJau5OYNtzJTss2GRjCGcxpNMpakKz0aGK";
  const [foodList, setFoodList] = useState([]);
  const PAGE_SIZE = 200;

  useEffect(() => {
    let cancelled = false; // ✅ cleanup flag

    const fetchFoodList = async () => {
      let allFoods = [];
      let pageNumber = 1;
      let hasMore = true;

      while (hasMore) {
        if (cancelled) return; // ✅ stop if component unmounted/re-ran

        const response = await fetch(
          `https://api.nal.usda.gov/fdc/v1/foods/list?api_key=${API_KEY}&pageSize=${PAGE_SIZE}&pageNumber=${pageNumber}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();

        if (!data || data.length === 0) {
          hasMore = false;
        } else {
          allFoods = [...allFoods, ...data];
          console.log(`Page ${pageNumber} fetched — total: ${allFoods.length}`);
          pageNumber++;
        }
      }

      if (!cancelled) setFoodList(allFoods); // ✅ only set state if still valid
    };

    fetchFoodList();

    return () => {
      cancelled = true; // ✅ cancel on cleanup
    };
  }, []);

  return (
    <div>
      <button onClick={() => console.log(foodList)}>Click for FoodList</button>
    </div>
  );
}

export default FoodSection;