import { useEffect, useState } from "react";
import Card from "./Card";
import Header from "./Header";
import Shadow from "./Shadow";
import axios from "axios";


  

function App() {
  const [cartOpened, setCartOpened] = useState(false);
  const [sneakers, setSneakers] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favoriteItems, setFavoriteItems] = useState([]);

  
  

  useEffect(()=>{
    axios.get('https://6175581408834f0017c70bad.mockapi.io/items').then(res =>{
      setSneakers(res.data);
    });
    axios.get('https://6175581408834f0017c70bad.mockapi.io/Cart').then(res =>{
      setCartItems(res.data);
    });
  }, []);

  const onAddToCart = (obj)=>{
    
    setCartItems(prev=>[...prev,obj]);
    
    axios.post('https://6175581408834f0017c70bad.mockapi.io/Cart', obj);

  }

  const onChangeSearchInput = (event)  =>{
    let value = event.target.value;
    setSearchValue(value);
  }
  
  const onRemoveItem = (id)=>{
    axios.delete(`https://6175581408834f0017c70bad.mockapi.io/Cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id));
    
  }

  const onAddToFavorite = (obj)=>{
    setFavoriteItems(prev=>[...prev,obj]);
    axios.post('https://6175581408834f0017c70bad.mockapi.io/Favorite', obj);
  }


  return (
    <div className="wrapper">

      { cartOpened ? <Shadow onRemove={onRemoveItem} items={cartItems}  onClose = {()=> setCartOpened(false)}/> : null}
      <Header onClickCart = {()=> setCartOpened(true)}/>
      <div className="content">
        <div className="content__header">
          <h1>{searchValue ? `Поиск по запросу: ${searchValue}`  : "Все кроссовки"}</h1>
          <div className="search__block">
            <img src="/img/search.svg" alt="search"></img>
            <input placeholder="Поиск..." onChange={onChangeSearchInput} value={searchValue}></input>

          </div>
        </div>

        <div className="sneakers">
          {sneakers.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase())).map((prop)=>(
            <Card onFavorite={onAddToFavorite} key={prop.img} name={prop.name} price={prop.price} img={prop.img} id={prop.id} onAdded={onAddToCart} active={()=>setCartOpened(true)}/>
          ))}
          
          
        </div>
      </div>
    </div>
  );
}

export default App;
