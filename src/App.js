import { createContext, useEffect, useState } from "react";
import { Route } from "react-router-dom";


import Header from "./Header";
import Shadow from "./Shadow";
import axios from "axios";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

export const StageContext = createContext({})
 

function App() {

  const [sneakers, setSneakers] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [orders,setOrders] = useState([]);

  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    async function FetchData() {
    
    try {
      const cartsRer = await axios.get('https://6175581408834f0017c70bad.mockapi.io/Cart');
     const favorRer = await axios.get('https://6175581408834f0017c70bad.mockapi.io/Favorite');

     const itemsRer = await axios.get('https://6175581408834f0017c70bad.mockapi.io/items');
     
     setIsLoading(false);  
      setCartItems(cartsRer.data);
      setFavoriteItems(favorRer.data);
      setSneakers(itemsRer.data);
    } catch (error) {
      alert(`with getting data`);
    }
     
    }
    FetchData();
  }

  
  ,[]);
  const onAddToCart = async (obj) => {
  const find = cartItems.find(item =>Number(item.parentId) === Number(obj.id));

    try {
      if(find){
        setCartItems(prev=>prev.filter(prop=>Number(prop.parentId) !== Number(obj.id)))
        await axios.delete(`https://6175581408834f0017c70bad.mockapi.io/Cart/${find.id}`);
      }
      else{
        setCartItems(prev => [...prev, obj]);
        const {data} = await axios.post('https://6175581408834f0017c70bad.mockapi.io/Cart', obj);
        setCartItems(prev => prev.map(prop =>{
          if(prop.parentId === data.parentId)
          {
            return {
              ...prop,
              id: data.id
            };
          }
          return prop;
        }));

        
      }
    } catch (error) {
      alert("Error with Add to Cart")
    }

    

  }
const onAddToFavorite = async (obj) => {
  
    try {
      if(favoriteItems.find(prop=>Number(prop.id)===Number(obj.id))){
      setFavoriteItems((prev)=> prev.filter((item)=> item.id !== obj.id)) 
      await axios.delete(`https://6175581408834f0017c70bad.mockapi.io/Favorite/${obj.id}`);
      
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
  const onRemoveItem = async (id) => {
    try {
      setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)));
      axios.delete(`https://6175581408834f0017c70bad.mockapi.io/Cart/${id}`);
    } catch (error) {
      alert('with delete item in cart')
    }
    
    

  }
const onLooking = (id) =>{
  return cartItems.some(obj=>Number(obj.parentId)===Number(id));
}


  return (
    <StageContext.Provider value={{sneakers,cartItems,favoriteItems, onLooking, onAddToFavorite,setCartItems }}>

    
    <div className="wrapper">
      

      <Shadow  onRemove={onRemoveItem} items={cartItems} onClose={() => setCartOpened(false)} opened={cartOpened} />
      <Header onClickCart={() => setCartOpened(true)} />
      <Route path="/" exact>
        <Home  isLoading={isLoading} cartItems={cartItems} sneakers={sneakers} searchValue={searchValue} setSearchValue={setSearchValue} onChangeSearchInput={onChangeSearchInput} onAddToFavorite={onAddToFavorite} onAddToCart={onAddToCart} setCartOpened={setCartOpened}/>
      </Route>
      <Route path="/Favorites">
          <Favorites />
      </Route>
      <Route path="/Profile">
          <Orders />
      </Route>

    </div>
    </StageContext.Provider>
  );
}

export default App;
