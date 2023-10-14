import axios from 'axios';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { CartCountContext } from '../../contexts/CartCount';

function Product({product}) {

let {setCartCount} = useContext(CartCountContext)


  async function addProductToCart(productId){
let {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {productId}, {
  headers: {
    token: localStorage.getItem("token")

  }


})

console.log(data?.data);
if(data.status == 'success'){
  toast.success(data.message)
};
setCartCount(data?.numOfCartItems)
console.log(data?.numOfCartItems);

console.log(data);
  }
  return (
    <>
     <Helmet>
                <title>{product.title.split(" ").slice(0,2).join(" ")}</title>
            </Helmet>
    <div className="product">
    <Link to={'/productDetails/'+ product._id} className='text-decoration-none text-dark '>
    <img src={product.imageCover} className='w-100 img-thumbnail' alt="" />
    <h3 className='text-center py-2 fs-3 text-decoration-none'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
    <h5 className='text-center'>{product.category.name}</h5>
    
    </Link>
    <button onClick={()=>addProductToCart(product._id)} className='btn bg-success text-white w-75 mx-auto d-block mb-2'>Add To Cart</button>
    
  </div></>
  )
}


export default Product