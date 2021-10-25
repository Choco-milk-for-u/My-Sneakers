import React from "react";

function Shadow({onClose, onRemove, items = []}){



    
        return (
            <div className="shadow">
                <div className="right__side">
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
                                <b>21 498 руб.</b>
                            </li>
                            <li>
                                <span>Налог 5%:</span>
                                <div></div>
                                <b>1074 руб.</b>
                            </li>
                        </ul>
                        <button className="greenButton">Оформить Заказ<img src="/img/right.svg" alt="arrow"></img></button>
                    </div>

                </div>
            </div>
        );
    
}

export default Shadow;