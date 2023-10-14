import axios from "axios";
import { createContext ,useEffect,useState } from "react";


  

export const CartCountContext = createContext()

export default function CartCountContextProvider({children}){
    let [isCartCount, setCartCount] = useState(0)

useEffect(()=>{
    getUserCart()
},[])
    async function getUserCart() {
        let res = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
          headers: {
            token: localStorage.getItem("token")
          }
        }).catch((err) => {
          console.log(err);
        })
        
   
        setCartCount(res?.data.numOfCartItems)
   
    
      }
    
    return <CartCountContext.Provider value={{isCartCount,setCartCount}}>
{children}
    </CartCountContext.Provider>
}