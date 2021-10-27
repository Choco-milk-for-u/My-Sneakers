import Card from "../Card";

function Favorites(props){

  const handleThat = (obj)=>{
    console.log(props.onAddFavorite);
    props.onAddFavorite(obj);
  }

    return(
        <div className="content">
        <div className="content__header">
          <h1>Мои загладки</h1>
          
        </div>

        <div className="sneakers">
          
            {props.items.map((prop)=>{
              return <Card  key={prop.img} name={prop.name} price={prop.price} img={prop.img} id={prop.id} checked={true} onFavorite={handleThat}/>
            })}
           
          
          
          
        </div>
      </div>
    );
}

export default Favorites