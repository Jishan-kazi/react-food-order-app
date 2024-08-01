import { useDispatch, useSelector } from "react-redux";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import { currencyFormatter } from "../utils/formatting";
import { cartActions } from "../store";
import CartItem from "./CartItem";

export default function Cart() {
    const cartItems = useSelector((state) => state.cart.items);
    const cartTotal = cartItems.reduce((totalPrice, item) => {return totalPrice + (item.quantity * item.price)}, 0);
    const showModal = useSelector((state) => state.cart.showModal);
    const dispatch = useDispatch();
    function handleCartClose() {
        dispatch(cartActions.hideCartModal());
    }
    function handleGoToCheckout() {
        dispatch(cartActions.showCheckoutModal());
    }
    return (
        <Modal className="cart" open={showModal === 'cart'} onClose={showModal === 'cart' ? handleCartClose : null}>
            <h2>Your cart</h2>
            <ul>
                {cartItems.map((element, i) => {
                    return (
                        <CartItem key={element.id} item={element} index={i} />
                    );
                })}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCartClose}>Close</Button>
                {cartItems.length > 0 && <Button onClick={handleGoToCheckout}>Go to Checkout</Button>}
            </p>
        </Modal>
    );
}