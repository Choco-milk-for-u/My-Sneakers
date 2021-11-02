import React from "react";
import { Link } from "react-router-dom";
import {StageContext} from "./App";


function Header(props){ 
const {cartItems} = React.useContext(StageContext);
const total = cartItems.reduce((sum, obj) => obj.price + sum,0);
    
        return(
        <header className="header">
        <div className="header__left">
          <Link to="/">
          <img width={40} height={40} src="img/logo.png" alt="logo" />
          </Link>
          
          <div className="header__info">
            <h3>My Sneakers</h3>
            <p>Магазин лучших кросовок</p>
          </div>
        </div>
        <ul className="header__right">
          <li onClick={props.onClickCart}>
            <img src="img/car.svg" alt="card"></img>

            <span>{total} руб.</span>
          </li>
          <li>

            <Link to="/Favorites"><img width={18} height={18} src="img/panel_fav.svg" alt="heart"></img></Link>
            
          </li>
          <li>
            <Link to="/Profile"><img width={18} height={18} src="img/profile.svg" alt="profile"></img></Link>
           
          </li>
        </ul>
      </header>
        );
    
}

export default Header; 