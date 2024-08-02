import { currencyFormatter } from "../utils/formatting";
import Button from "../components/UI/Button.jsx";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/index.js";

export default function MealItem({meal}) {
    const dispatch = useDispatch();
    function handleAddToCart() {
        dispatch(cartActions.addCartItems({item: meal}));
    }

    return <li className="meal-item">
        <article>
            <img className="" src={`https://react-food-order-app-front.onrender.com/${meal.image}`} alt={meal.name} />
            <div>
                <h3>{meal.name}</h3>
                <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                <p className="meal-item-description">{meal.description}</p>
            </div>
            <p className="meal-item-actions">
                <Button onClick={handleAddToCart}>Add to cart</Button>
            </p>
        
        </article>
    </li>;
}
