import Cart from "../Components/Cart.jsx";
import Checkout from "../Components/Checkout.jsx";
import Header from "../Components/Header.jsx";
import Meals from "../Components/Meals.jsx";
import { CartContextProvider } from "../Store/CartContext.jsx";
import { UserProgressContextProvider } from "../Store/UserContextProgress.jsx";

import '../index.css';

export default function FoodOrder(){
    return (
        <div className="menu-container">
            <UserProgressContextProvider>
                <CartContextProvider>
                    <Header/>
                    <Meals />
                    <Cart/>
                    <Checkout/>
                </CartContextProvider>
            </UserProgressContextProvider>
        </div>
    );
}