import MealItem from "./MealItem.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

const config = {};
export default function Meals() {
    const {data: meals, isLoading, error} = useHttp('https://react-food-order-app-879e0.web.app/meals', config, []);

    if (isLoading) {
        return <p className="center">Fetching meals...</p>
    }

    if (error) {
        return <Error title='Failed to fetch meals' message={error} />;
    }
    return <ul id="meals">
        {meals.map((element) => {
             return <MealItem key={element.id} meal={element} />;
        })}
    </ul>;
}
