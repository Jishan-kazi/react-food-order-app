import { useDispatch } from "react-redux";
import { currencyFormatter } from "../utils/formatting";
import { cartActions } from "../store";

export default function cartItems({item, index}) {
    const dispatch = useDispatch();

    function handleIncrementQty() {
        dispatch(cartActions.addCartItems({item}));
    }
    function handleDecrementQty() {
        dispatch(cartActions.removeCartItems({index}));
    }
    return (
        <li className="cart-item">
            <p>
                {item.name} - {item.quantity} x {currencyFormatter.format(item.price)}
            </p>
            <p className="cart-item-actions">
                <button onClick={handleDecrementQty}>-</button>
                <span>{item.quantity}</span>
                <button onClick={handleIncrementQty}>+</button>
            </p>
        </li>
    );
}