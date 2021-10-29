import React from "react";
import Card from "../Card";
import {StageContext} from "../App";

function Favorites(props){
  const {onAddToFavorite, favoriteItems} = React.useContext(StageContext);

  



    return(
        <div className="content">
        <div className="content__header">
          <h1>Мои загладки</h1>
          
        </div>

        <div className="sneakers">
          
            {favoriteItems.map((prop)=>{
              return <Card  key={prop.img} name={prop.name} price={prop.price} img={prop.img} id={prop.id} checked={favoriteItems.some(obj=>Number(obj.id)===Number(prop.id))} onFavorite={onAddToFavorite}/>
            })}
           
          
          
          
        </div>
      </div>
    );
}

export default Favorites