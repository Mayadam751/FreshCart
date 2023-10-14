import React, { useContext } from 'react'
import '../Navbar/Navbar.module.css'
import { Link } from 'react-router-dom'
import logo from '../../Assets/freshcart-logo.svg'
import { Authcontext } from '../../contexts/AuthContext'
import { CartCountContext } from '../../contexts/CartCount'


function Navbar() {
  let {isUserLoggedIn,setIsUserLoggedIn} = useContext(Authcontext)


let {isCartCount} = useContext(CartCountContext)

  function logout(){
    localStorage.removeItem("token"); 
    setIsUserLoggedIn(false);
  }

  return (
    <>
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light ">
  <div className="container">
  <Link to={"/"} className="navbar-brand fs-2 fresh" href="#" ><img src={logo} alt="" /></Link>
  <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse " id="navbarSupportedContent">
    {isUserLoggedIn?  <ul className="navbar-nav m-auto mt-2 ">
      <li className="nav-item active">
        <Link className="nav-link" href="#">Home <span className="sr-only" to="/Home">(current)</span></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="#" to='/Products'>Products</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="#" to='/Categories'>Categories</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="#" to='Brands'>Brands</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="#" to='/Cart'>Cart</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="#" to='/Wishlist'>Wish List</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="#" to='/MyOrders'>My Orders</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="#"><i>{isCartCount}</i></Link>
      </li>
    </ul>: null}
   
    <ul className='d-flex list-unstyled mt-3 justify-content-around'>
      {!isUserLoggedIn ? <>
        <li className='mx-2'>
  <Link to="Register">Register</Link>
</li>
<li className='mx-2'>
  <Link to='Login'>Login</Link>
</li> </>:null }
{isUserLoggedIn ? <li className='mx-2'>
  <a onClick={logout} className='cursor-pointer'>Logout</a>
</li>: null}

    </ul>
    
  </div>
  </div>
</nav>
    </>
  )
}

export default Navbar


