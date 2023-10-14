import logo from './logo.svg';
import './App.css';
import  'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Cart from './components/Cart/Cart';
import NotFound from './components/NotFound/NotFound';
import Layout from './components/Layout/Layout';
import Products from './components/Products/Products';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { Navigate, RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Wishlist from './components/Wishlist/wishlist';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import MyOrders from './components/My Orders/MyOrders';
import Checkout from './components/Checkout/Checkout';




function App() {
  let routers = createHashRouter([
    {path:'', element:<Layout/>, children:[
      {path:'', element: <Navigate to={'home'}/>},
      {path:'home', element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:'login', element:<Login/>},
      {path:'register', element:<Register/>},
      {path:'products', element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:'productDetails/:id', element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:'cart', element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'MyOrders', element:<ProtectedRoute><MyOrders/></ProtectedRoute>},
      {path:'Checkout/:id', element:<ProtectedRoute><Checkout/></ProtectedRoute>},
      {path:'categories', element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:'wishlist', element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
      {path:'brands', element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:'*', element:<NotFound/>},
      

    ]}
  ])
  
  return (
  <>
<RouterProvider router={routers}></RouterProvider>
</>
  );
}

export default App;
