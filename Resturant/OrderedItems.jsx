import React from "react";
import { currenctFormatter } from "../Util/formatting";
export default function OrderItems({meal}){
    return (
        <li className="meal-item">
            <article>
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">{currenctFormatter.format(meal.price)}</p>
                    <p className="meal-item-description">Quantity : {meal.quantity}</p>
                </div>
            </article>
        </li>
    );
}