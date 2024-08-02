import { currencyFormatter } from "../utils/formatting";
import Modal from "./UI/Modal";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const config = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

export default function Checkout() {
    const { data, isLoading, error, sendHttpRequest, clearData } = useHttp('https://react-food-order-app-1.onrender.com/orders', config);
    const cartItems = useSelector((state) => state.cart.items);
    const showModal = useSelector((state) => state.cart.showModal);
    const dispatch = useDispatch();
    const cartTotal = cartItems.reduce((totalPrice, item) => { return totalPrice + (item.quantity * item.price) }, 0);

    function handleCloseCheckout() {
        dispatch(cartActions.hideCheckoutModal());
    }

    function handleSuccessCheckout() {
        dispatch(cartActions.hideCheckoutModal());
        dispatch(cartActions.clearCheckout());
        clearData();
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        let fd = new FormData(e.target);
        const data = Object.fromEntries(fd.entries());
        const dataToSend = {
            order: {
                items: cartItems,
                customer: data
            }
        }

        await sendHttpRequest(JSON.stringify(dataToSend));
    }

    let action = <>
        <Button type="button" textOnly onClick={handleCloseCheckout}>Close</Button>
        <Button>Submit Order</Button>
    </>;
    if (isLoading) {
        action = <span>Submitting Order...</span>;
    }

    if (error) {
        action = <Error title="Failed to place order" message={error} />
    }

    if (data && !error) {
        return <Modal open={showModal === 'checkout'} onClose={showModal === 'checkout' ? handleCloseCheckout : null}>
            <h2>Success!</h2>
            <p>Order placed successfully!</p>
            <Button onClick={handleSuccessCheckout}>Okay</Button>
        </Modal>
    }

    return (
        <Modal open={showModal === 'checkout'} onClose={showModal === 'checkout' ? handleCloseCheckout : null}>
            <form onSubmit={handleFormSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
                <Input label="Full Name" id="name" type="text" />
                <Input label="Email" id="email" type="email" />
                <Input label="Street" id="street" type="text" />
                <div className="control-row">
                    <Input label="Postal Code" id="postal-code" type="text" />
                    <Input label="City" id="city" type="text" />
                </div>
                <p className="modal-actions">
                    {action}
                </p>
            </form>
        </Modal>
    );
}
