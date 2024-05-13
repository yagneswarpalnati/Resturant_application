
import useHttp from "../useHttp";
import { useContext,useState } from "react";
import UserEmailContext from "../Store/UserEmailContext";
import OrderItems from "./OrderedItems";

const reqConfig={};
export default function Orders(){
    const {userEmail}=useContext(UserEmailContext);
    const {
        data:loadedMeals,
        isLoading,
        error
    }=useHttp(`https://resturant-w4u6.onrender.com/customerOrder/${userEmail}`,reqConfig,[]);
    if(isLoading){
        return <p className="center">Fetching Meals....</p>
    }

    if(error){
        <Error title='Failed to fetch meals' message={error}/>
    }
    return (
        <div className="meal-item">
            <p className="meal-item-price">Previous Ordered Items</p>
            {loadedMeals.data==='No' && <p className="meal-items">No Previous Orders</p>}
            {
                loadedMeals.data!=='No'&&
                <ul id="meals">{loadedMeals.map((items)=>(
                    <OrderItems key={items._id} meal={items}/>
                ))}</ul>
            }
            
        </div>
    );
}