import React, { useState } from "react";


function Card({img, name,price,onAdded, id, active, onFavorite, checked=false}) {


const [isAdded, setIsAdded] = useState(false);
const [isFavorite, setIsFavorite] = useState(checked);


  const handleClick = ()=>{
    onAdded({img, name,price,id});
    setIsAdded(!isAdded);
    active();
  }
  
  const handleFavorite = ()=>{
    
    onFavorite({img,name,price,id});
    setIsFavorite(!isFavorite);
  }

  return (

    <section className="card">
      <div className="favorite">
        <img  onClick={handleFavorite} src={isFavorite ? "img/active.svg" : "/img/inactive_favorite.svg"} alt="heart"></img>
      </div>
      <img width={133} height={122} src={img} alt="sneaker1"></img>
      <h5>{name}</h5>
      <div className="card__bottom">
        <div className="card__titles">
          <p>Цена:</p>
          <b>{price} руб.</b>
        </div>
        <img id="o" width="32px" height="32px" src={isAdded ? "/img/accept.png" : "img/plus.svg"} alt="sneaker2" onClick={handleClick}></img>

      </div>
    </section>
  );

}

export default Card;