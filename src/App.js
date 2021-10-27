import { useEffect, useState } from "react";
import { Route } from "react-router-dom";


import Header from "./Header";
import Shadow from "./Shadow";
import axios from "axios";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";


function App() {

  const [sneakers, setSneakers] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);



  useEffect(() => {
    axios.get('https://6175581408834f0017c70bad.mockapi.io/items').then(res => {
      setSneakers(res.data);
    });
    axios.get('https://6175581408834f0017c70bad.mockapi.io/Cart').then(res => {
      setCartItems(res.data);
    });
    axios.get('https://6175581408834f0017c70bad.mockapi.io/Favorite').then(res => {
      setFavoriteItems(res.data);
    });
  }, []);

  const onAddToCart = (obj) => {

    setCartItems(prev => [...prev, obj]);

    axios.post('https://6175581408834f0017c70bad.mockapi.io/Cart', obj);

  }

  const onChangeSearchInput = (event) => {
    let value = event.target.value;
    setSearchValue(value);
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://6175581408834f0017c70bad.mockapi.io/Cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id));

  }

  const onAddToFavorite = async (obj) => {
    try {
      if(favoriteItems.find(prop=>prop.id===obj.id)){
      axios.delete(`https://6175581408834f0017c70bad.mockapi.io/Favorite/${obj.id}`);
      setFavoriteItems((prev)=> prev.filter((item)=> item.id !== obj.id))
    }
    else{
      const { data } = await axios.post('https://6175581408834f0017c70bad.mockapi.io/Favorite', obj);
      setFavoriteItems(prev => [...prev, data]);
      
    }
    } catch (error) {
      alert('WARNING cant add to Favorite');
    }
    
    
    
  }


  return (
    <div className="wrapper">
      

      {cartOpened ? <Shadow onRemove={onRemoveItem} items={cartItems} onClose={() => setCartOpened(false)} /> : null}
      <Header onClickCart={() => setCartOpened(true)} />
      <Route path="/" exact>
        <Home sneakers={sneakers} searchValue={searchValue} setSearchValue={setSearchValue} onChangeSearchInput={onChangeSearchInput} onAddToFavorite={onAddToFavorite} onAddToCart={onAddToCart} setCartOpened={setCartOpened}/>
      </Route>
      <Route path="/Favorites">
          <Favorites items={favoriteItems} onAddFavorite={onAddToFavorite} />
      </Route>

    </div>
  );
}

export default App;
