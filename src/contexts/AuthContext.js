import { createContext, useEffect, useState } from "react";


  

export const Authcontext = createContext()

export default function AuthcontextProvider({children}){
    let [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

    useEffect(()=>{
        if (localStorage.getItem("token")!=null){
          setIsUserLoggedIn(true)
        }else {
          setIsUserLoggedIn(false)
        }
          },[])
    return <Authcontext.Provider value={{isUserLoggedIn,setIsUserLoggedIn}}>
{children}
    </Authcontext.Provider>
}