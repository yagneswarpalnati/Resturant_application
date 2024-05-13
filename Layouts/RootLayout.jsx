import { NavLink,Outlet } from "react-router-dom";
import './RootLayout.css';

export default function RootLayout(){
    return (
        <div className="root-layout">
            <header>
                <nav className="text_Style">
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/home/login'>Login</NavLink>
                    <NavLink to='/home/registration'>Registration</NavLink>
                </nav>
            </header>
            <main>

                <Outlet/>
            </main>
        </div>
    );
}