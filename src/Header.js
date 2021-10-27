import { Link } from "react-router-dom";

function Header(props){ 

    
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

            <span>1205 руб.</span>
          </li>
          <li>

            <Link to="/Favorites"><img width={18} height={18} src="img/panel_fav.svg" alt="heart"></img></Link>
            
          </li>
          <li>
            <img width={18} height={18} src="img/profile.svg" alt="profile"></img>
          </li>
        </ul>
      </header>
        );
    
}

export default Header; 