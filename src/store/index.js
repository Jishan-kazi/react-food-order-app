import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    items: [],
    showModal: ''
};

const cartSlice = createSlice({
    name: 'cartReducer',
    initialState: initialCartState,
    reducers: {
        addCartItems(state, action){
            const itemFoundIndex = state.items.findIndex((element) => element.id === action.payload.item.id);

            // if item already exist 
            if (itemFoundIndex > -1) {
                state.items[itemFoundIndex].quantity++;
            }else{
            // if adding new item 
                state.items.push({...action.payload.item, quantity: 1});
            }
        },
        removeCartItems(state, action){
            const quantity = state.items[action.payload.index].quantity;
            if (quantity > 1) {
                state.items[action.payload.index].quantity--;
            }else{
                state.items.splice(action.payload.index, 1);
            }
        },
        clearCheckout(state){
            state.items = [];
        },
        showCartModal(state){
            state.showModal = 'cart';
        },
        hideCartModal(state){
            state.showModal = '';
        },
        showCheckoutModal(state){
            state.showModal = 'checkout';
        },
        hideCheckoutModal(state){
            state.showModal = '';
        }
    }
});


const store = configureStore({
    reducer: {
        cart: cartSlice.reducer
    }
});

export const cartActions = cartSlice.actions;
export default store;