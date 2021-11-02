import React, { useState } from "react";
import ContentLoader from "react-content-loader"

import {StageContext} from "./App";
function Card({img, name,price,onAdded, id, active, onFavorite, checked=false, added=false,loading=false}) {



const [isFavorite, setIsFavorite] = useState(checked);
const {onLooking} = React.useContext(StageContext);
const obj = {img, name,price,id,parentId : id};


  const handleClick = ()=>{
    onAdded(obj);
    
    active();
  }
  
  const handleFavorite = ()=>{
    
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  }

  return (

    <section className="card">
      {
        loading ? <ContentLoader 
        speed={2}
        width={150}
        height={198}
        viewBox="0 0 150 198"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        
      >
        <rect x="137" y="53" rx="0" ry="0" width="1" height="1" /> 
        <rect x="0" y="0" rx="10" ry="10" width="150" height="90" /> 
        <rect x="0" y="105" rx="5" ry="5" width="150" height="15" /> 
        <rect x="0" y="128" rx="5" ry="5" width="100" height="15" /> 
        <rect x="0" y="165" rx="5" ry="5" width="80" height="24" /> 
        <rect x="114" y="165" rx="10" ry="10" width="32" height="32" />
      </ContentLoader>
      :
      <>
         <div className="favorite">
        {onFavorite && <img  onClick={handleFavorite} src={isFavorite ? "img/active.svg" : "/img/inactive_favorite.svg"} alt="heart"></img>}
      </div>
      <img width={133} height={122} src={img} alt="sneaker1"></img>
      <h5>{name}</h5>
      <div className="card__bottom">
        <div className="card__titles">
          <p>Цена:</p>
          <b>{price} руб.</b>
        </div>
        {onAdded && <img id="o" width="32px" height="32px" src={onLooking(id) ? "/img/accept.png" : "img/plus.svg"} alt="sneaker2" onClick={handleClick}></img>}

      </div>
      </>
      }
     
    </section>
  );

}

export default Card;