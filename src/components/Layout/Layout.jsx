import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import AuthcontextProvider from '../../contexts/AuthContext'
import { Offline, Online } from "react-detect-offline"
import { Toaster } from 'react-hot-toast';
import {QueryClient , QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'

import CartCountContextProvider from '../../contexts/CartCount'





const Layout = () => {
  
  let queryclient = new QueryClient()
  return (
 <>
 <QueryClientProvider client={queryclient}>
  <CartCountContextProvider>
  <AuthcontextProvider>
    <div>
    <Navbar/>
    <div className="container">
    <Outlet/>
    </div>
    {/* <Footer/> */}
  </div>
  <div>
    <Offline>You are offline</Offline>
  </div>
  <Toaster/>
  </AuthcontextProvider>
  
  </CartCountContextProvider>

 </QueryClientProvider>
 {/* <ReactQueryDevtools position='bottom-right'/> */}
 </>
  )
}

export default Layout