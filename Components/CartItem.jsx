import { currenctFormatter } from "../Util/formatting";

export default function CartItem({name,quantity,price,onIncrease,onDecrease}){
    return (
        <li className="cart-item">
            <p>
                {name} - {quantity} x {currenctFormatter.format(price)}
            </p>
            <p className="cart-item-actions">
                <button onClick={onDecrease}>-</button>
                <span>QYT</span>
                <button onClick={onIncrease}>+</button>
            </p>
        </li>
    );
}