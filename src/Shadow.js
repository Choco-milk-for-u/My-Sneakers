import axios from "axios";
import React from "react";
import { StageContext } from "./App";

function Shadow({onClose, onRemove, items = [],onAdd,opened}){
    const {cartItems,setCartItems} = React.useContext(StageContext);
    const total = items.reduce((sum, obj) => obj.price + sum,0);

    const onClickOver = ()=>{
        cartItems.map(prop=>{return axios.post('https://6175581408834f0017c70bad.mockapi.io/orders', prop)});

        
        setCartItems([]);
    }

    
        return (
           
            <div className={`shadow ${opened ? 'shadowVisible' : '' }`} >
                <div className={`right__side`}>
                    <div className="title_of_side">
                        <h2>Корзина</h2>
                        <img onClick={onClose} width="32px" height="32px" src="img/cancel.svg" alt="button_cancel"></img>
                    </div>

                    <div className="items">

                        {items.map((prop,index) =>{
                        return(
                        
                        <div key={index} className="cartItem">
                            <img id="f" width="70px" height="70px" src={prop.img} alt="snikers_one"></img>
                            <div className="cart_titles">
                                <p>{prop.name}</p>
                                <b>{prop.price} руб.</b>
                            </div>
                            <img onClick={() => onRemove(prop.id)} id="t" src="/img/cancel.svg" alt="button_cancel"></img>
                        </div>
                            )
                        })}

                        
                        
                    </div>




                    <div className="fotter">
                        <ul>
                            <li>
                                <span>Итого:</span>
                                <div></div>
                                <b>{total} руб.</b>
                            </li>
                            <li>
                                <span>Налог 5%:</span>
                                <div></div>
                                <b>{(total / 100)*5} руб.</b>
                            </li>
                        </ul>
                        <button onClick={onClickOver} className="greenButton">Оформить Заказ<img src="/img/right.svg" alt="arrow"></img></button>
                    </div>

                </div>
            </div>
        );
    
}

export default Shadow;