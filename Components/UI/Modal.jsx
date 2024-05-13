import { useRef,useEffect } from "react";
import { createPortal } from "react-dom";
export default function Modal({children,open,className='',onClose}){

    const dialog=useRef();
    useEffect(()=>{
        const model=dialog.current;
        if(open){
            model.showModal();
        }

        return ()=>model.close();
    },[open]);

    return createPortal(
        <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>{children}</dialog>,
        document.getElementById('modal')
    );
}