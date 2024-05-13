import { NavLink,Outlet } from "react-router-dom";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserEmailContext from "../Store/UserEmailContext.jsx";
import './ResturantLayout.css'

export default function ResturantLayout(){
    const {userEmail,isLoggedIn,logout} = useContext(UserEmailContext);
    if(!isLoggedIn){
        return <Navigate to='/home/login' replace/>;
    }
    return (
        <div className="resturant-container">
            <header>
                <nav className="text_Style">
                    <NavLink to='/Resturant/menu'>Menu</NavLink>
                    <NavLink to='/Resturant/orders'>Orders</NavLink>
                    <button onClick={logout}>Logout</button>
                </nav>
            </header>
            <main >
                <Outlet/>
            </main>
        </div>
    );
}