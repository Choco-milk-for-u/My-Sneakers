import Card from "../Card";

function Home({sneakers, searchValue, setSearchValue, onChangeSearchInput,onAddToFavorite,onAddToCart,setCartOpened}){
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
          {sneakers.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase())).map((prop)=>(
            <Card onFavorite={onAddToFavorite} key={prop.img} onAdded={onAddToCart} active={()=>setCartOpened(true)} {... prop}/>
          ))}
          
          
        </div>
      </div>
    );
}

export default Home