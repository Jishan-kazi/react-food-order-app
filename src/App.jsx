import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import store from "./store/index.js";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
      <Header />
      <Meals />
      <Cart />
      <Checkout />
    </Provider>
  );
}

export default App;
