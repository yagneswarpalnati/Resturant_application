
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import FoodOrder from "./Resturant/Food_Order";
import RootLayout from "./Layouts/RootLayout";
import Login from "./Login/Login";
import Registration from "./Login/Registration";
import ResturantLayout from "./Layouts/ResturantLayout";
import Orders from "./Resturant/Orders";
import {UserEmailProvider}  from "./Store/UserEmailContext";


function App() {
  const router=createBrowserRouter( 
    createRoutesFromElements(
      <Route>
        <Route path="/Resturant" element={<ResturantLayout/>}>
          <Route path ='/Resturant/menu' element={<FoodOrder/>}/>
          <Route path="/Resturant/orders" element={<Orders/>}/>
        </Route>
        <Route path="/" element={<RootLayout/>}>
          <Route path='/home/login' element={<Login/>}/>
          <Route path='/home/registration' element={<Registration/>}/>
        </Route>
      </Route>
    )
  );

  return (
    <UserEmailProvider>
      <RouterProvider router={router}/>
    </UserEmailProvider>
  );
}

export default App;
