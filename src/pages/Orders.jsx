import axios from "axios";
import React from "react";
import { StageContext } from "../App";
import Card from "../Card";


function Orders(props){
  const {onAddToFavorite,onAddToCart} = React.useContext(StageContext);
  const [orders,setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const count = 0;

  React.useEffect(()=>{
   (async()=>{
    try {
      const {data} = await axios.get("https://6175581408834f0017c70bad.mockapi.io/orders");
      
      console.log(data);
      setOrders(data.map(prop=>{return prop}));
      //setOrders(data.map(prop=>prop[count]).flat(2));
      setIsLoading(false);
      
      
    } catch (error) {
      alert("with orders")  
    }
   })();
    
  },[])
  



    return(
        <div className="content">
        <div className="content__header">
          <h1>Мои заказы</h1>
          
        </div>

        <div className="sneakers">
          
            {(isLoading ? [...Array(8)] : orders).map((prop)=>{
             return <Card loading={isLoading} key={prop && prop.img}  {... prop} />
            })}
           
          
          
          
        </div>
      </div>
    );
}

export default Orders