import { useContext } from "react";
import CartContext from "../Store/CartContext";
import Modal from "./UI/Modal";
import { currenctFormatter } from "../Util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../Store/UserContextProgress";
import CartItem from "./CartItem";

export default function Cart(){
    const cartCtx=useContext(CartContext);
    const userProgressCtx=useContext(UserProgressContext);

    const cartTotalPrice=cartCtx.items.reduce(
        (totalPrice,item)=>totalPrice+item.quantity*item.price,
    0);
    function handleClose(){
        userProgressCtx.hideCart();
    }

    function handleCheckOut(){
        userProgressCtx.showCheckout();
    }
    return (
        <Modal className="cart" open={userProgressCtx.progress==='cart'} onClose={userProgressCtx.progress==='cart' ? handleClose: null}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map((item)=>(
                    <CartItem 
                        key={item.id} 
                        name={item.name} 
                        quantity={item.quantity} 
                        price={item.price}
                        onIncrease={()=>cartCtx.addItem(item)}
                        onDecrease={()=>cartCtx.removeItem(item.id)}
                    />
                ))}
            </ul>
            <p className="cart-total">{currenctFormatter.format(cartTotalPrice)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleClose}>Close</Button>
                {cartCtx.items.length>0 && <Button onClick={handleCheckOut}>Go to Checkout</Button>}
            </p>
        </Modal>
    );
}