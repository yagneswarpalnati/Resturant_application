
import useHttp from "../useHttp";
import Error from "./Error";
import Mealitem from "./Mealitem";

const reqConfig={};
export default function Meals(){
    
    const {
            data:loadedMeals,
            isLoading,
            error
        }=useHttp('https://resturant-api-rust.vercel.app/meals',reqConfig,[]);

    if(isLoading){
        return <p className="center">Fetching Meals....</p>
    }

    if(error){
        <Error title='Failed to fetch meals' message={error}/>
    }
    

    return <ul id="meals">{loadedMeals.map((meal)=>(
        <Mealitem key={meal.id} meal={meal}/>
    ))}</ul>
}