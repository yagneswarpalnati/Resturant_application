import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../Store/CartContext";
import { currenctFormatter } from "../Util/formatting";
import Input from "./Input";
import Button from "./UI/Button";
import UserProgressContext from "../Store/UserContextProgress";
import useHttp from "../useHttp";
import Error from "./Error";

const reqConfig={
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    }
};

export default function Checkout(){
    const cartCtx=useContext(CartContext);
    const userProgressCtx=useContext(UserProgressContext);

    const {data,isLoading:isSending,error,sendRequest,clearData}=useHttp(
        'https://resturant-w4u6.onrender.com/orders',
        reqConfig
    );

    const cartTotalPrice=cartCtx.items.reduce(
        (totalPrice,item)=>totalPrice+item.quantity*item.price,
    0);

    function handleCloseCheckOut(){
        userProgressCtx.hideCheckout();
    }

    function handleFinish(){
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }
    function handleSubmit(event){
        event.preventDefault();

        const fd=new FormData(event.target);
        const customerData=Object.fromEntries(fd.entries());

        sendRequest(
            JSON.stringify({
                order:{
                    items:cartCtx.items,
                    customer:customerData,
                },
        }));

    }

    let actions=(
        <>
            <Button type="button" textOnly onClick={handleCloseCheckOut}>Close</Button>
            <Button>Submit Order</Button>
        </>
    );

    if(isSending){
        actions=<span>Sending Order data...</span>;
    }

    if(data &&!error){
        return <Modal open={userProgressCtx.progress==='checkout'} onClose={handleFinish}>
            <h2>Success!</h2>
            <p>Your Order was Submitted Successfully.</p>
            <p>We will get back you with more details via email within next few minutes.</p>
            <p className="modal-actions">
                <Button onClick={handleFinish}>Okay</Button>
            </p>
        </Modal>;
    }
    return (
        <Modal open={userProgressCtx.progress==='checkout'} onClose={handleCloseCheckOut}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount:{currenctFormatter.format(cartTotalPrice)}</p>
                <Input label="Full Name" type="text" id='name'/>
                <Input label="E-Mail Address" type="email" id='email'/>
                <Input label="Street" type="text" id='street'/>
                <div className="control-row">
                    <Input label='Postal Code' type='text' id='postal-code'/>
                    <Input label='City' type='text' id='city'/>
                </div>
                {error && <Error title='Failed to Submit the Order' message={error}/>}
                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    );
}
