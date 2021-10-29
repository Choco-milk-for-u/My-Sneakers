import { createContext, useEffect, useState } from "react";
import { Route } from "react-router-dom";


import Header from "./Header";
import Shadow from "./Shadow";
import axios from "axios";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

export const StageContext = createContext({})
 

function App() {

  const [sneakers, setSneakers] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);

  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    async function FetchData() {
    
     const cartsRer = await axios.get('https://6175581408834f0017c70bad.mockapi.io/Cart');
     const favorRer = await axios.get('https://6175581408834f0017c70bad.mockapi.io/Favorite');

     const itemsRer = await axios.get('https://6175581408834f0017c70bad.mockapi.io/items');
     
     setIsLoading(false);  
      setCartItems(cartsRer.data);
      setFavoriteItems(favorRer.data);
      setSneakers(itemsRer.data);
    }
    FetchData();
  }

  
  ,[]);

  const onAddToCart = (obj) => {

    try {
      if(cartItems.find(item =>Number(item.id) === Number(obj.id))){
        setCartItems(prev=>prev.filter(prop=>Number(prop.id) !== Number(obj.id)))
        axios.delete(`https://6175581408834f0017c70bad.mockapi.io/Cart/${obj.id}`);
      }
      else{
        setCartItems(prev => [...prev, obj]);

        axios.post('https://6175581408834f0017c70bad.mockapi.io/Cart', obj);
      }
    } catch (error) {
      alert("Error with Add to Cart")
    }

    

  }
const onAddToFavorite = async (obj) => {
  
    try {
      if(favoriteItems.find(prop=>Number(prop.id)===Number(obj.id))){
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
  const onChangeSearchInput = (event) => {
    let value = event.target.value;
    setSearchValue(value);
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://6175581408834f0017c70bad.mockapi.io/Cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id));

  }

  
const onLooking = (id) =>{
  return cartItems.some(obj=>Number(obj.id)===Number(id));
}


  return (
    <StageContext.Provider value={{sneakers,cartItems,favoriteItems, onLooking, onAddToFavorite }}>

    
    <div className="wrapper">
      

      {cartOpened ? <Shadow onRemove={onRemoveItem} items={cartItems} onClose={() => setCartOpened(false)} /> : null}
      <Header onClickCart={() => setCartOpened(true)} />
      <Route path="/" exact>
        <Home  isLoading={isLoading} cartItems={cartItems} sneakers={sneakers} searchValue={searchValue} setSearchValue={setSearchValue} onChangeSearchInput={onChangeSearchInput} onAddToFavorite={onAddToFavorite} onAddToCart={onAddToCart} setCartOpened={setCartOpened}/>
      </Route>
      <Route path="/Favorites">
          <Favorites />
      </Route>

    </div>
    </StageContext.Provider>
  );
}

export default App;
