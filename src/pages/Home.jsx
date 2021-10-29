import React from "react";
import Card from "../Card";



function Home({sneakers, searchValue, setSearchValue, onChangeSearchInput,onAddToFavorite,onAddToCart,setCartOpened, isLoading}){
  


  const renderItems = ()=>{
    const filter = sneakers.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()));


    
    return (isLoading ? [...Array(10)] : filter).map((prop)=>(
      <Card loading={isLoading} onFavorite={onAddToFavorite} key={prop && prop.img} onAdded={onAddToCart} active={()=>setCartOpened(true)} {... prop}/>
    ))
  }

    return(
        <div className="content">
        <div className="content__header">
          <h1>{searchValue ? `Поиск по запросу: ${searchValue}`  : "Все кроссовки"}</h1>
          <div className="search__block">
            <img src="/img/search.svg" alt="search"></img>
            <input placeholder="Поиск..." onChange={onChangeSearchInput} value={searchValue}></input>

            
          </div>
        </div>

        <div className="sneakers">
          {renderItems()}
          
          
        </div>
      </div>
    );
}

export default Home