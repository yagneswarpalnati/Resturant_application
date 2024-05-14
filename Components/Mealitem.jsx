import { useContext,useEffect,useState} from "react";
import { currenctFormatter } from "../Util/formatting";
import Button from "./UI/Button";
import CartContext from "../Store/CartContext.jsx";
export default function Mealitem({meal}){
    const cartCtx=useContext(CartContext);
    const [quantity,setQuantity]=useState(0);
    const [isAdded,setAdd]=useState(false);

    function handleMealAddItem(){
        cartCtx.addItem(meal);
        setAdd(true);
    }

    useEffect(()=>{
        const item=cartCtx.items.filter(item=>item.id===meal.id);
        if(item.length===1){
            setQuantity(item[0].quantity);
        }else{
            setQuantity(0);
            setAdd(false);
        }
    },[cartCtx])
    


    return (
        <li className="meal-item">
            <article>
                <img src={`https://resturant-api-rust.vercel.app/${meal.image}`} alt={meal.name} />
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">{currenctFormatter.format(meal.price)}</p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-action">
                    <Button onClick={handleMealAddItem}>Add to Cart:</Button>
                </p>
                {isAdded && <div className="meal-item-count">Order Quantity: {quantity}</div>}
            </article>
        </li>
    );
}