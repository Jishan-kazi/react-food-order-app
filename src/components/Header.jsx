import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.jpg";
import Button from "../components/UI/Button.jsx";
import { cartActions } from "../store/index.js";
export default function Header() {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const cartItemsQuantity = cartItems.reduce((total, element) => {
        return total + element.quantity;
    }, 0);

    function handleCartVisibility() {
        dispatch(cartActions.showCartModal());
    }
    return <header id="main-header">
        <div id="title">
            <img src={logo} alt="Logo" />
            <h1>Reactfood</h1> 
        </div>
        <Button type="button" textOnly onClick={handleCartVisibility}>Cart({cartItemsQuantity})</Button>

    </header>
}