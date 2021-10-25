import React from "react";

function Header(props){ 

    
        return(
        <header className="header">
        <div className="header__left">
          <img width={40} height={40} src="/img/logo.png" alt="logo" />
          <div className="header__info">
            <h3>My Sneakers</h3>
            <p>Магазин лучших кросовок</p>
          </div>
        </div>
        <ul className="header__right">
          <li onClick={props.onClickCart}>
            <img src="img/car.svg" alt="card"></img>

            <span>1205 руб.</span>
          </li>
          <li>
            <img src="img/profile.svg" alt="profile"></img>
          </li>
        </ul>
      </header>
        );
    
}

export default Header; 