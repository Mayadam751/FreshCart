import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { CartCountContext } from '../../contexts/CartCount';

function Cart() {


  let [numOfCartItems, setNumOfCartItems] = useState(0)
  let [totalCartPrice, setTotalCartPrice] = useState(0)
  let [cartProducts, setCartProducts] = useState([])
  let [cartId, setCartId] = useState("")

let {setCartCount} = useContext (CartCountContext)

  useEffect(() => {
    getUserCart()
  }, [])

  async function getUserCart() {
    let res = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: {
        token: localStorage.getItem("token")
      }
    }).catch((err) => {
      console.log(err);
    })
    console.log(cartProducts);
    setCartId(res?.data.data._id)
    setNumOfCartItems(res?.data.numOfCartItems)
    setTotalCartPrice(res?.data.data.totalCartPrice)
    setCartProducts(res?.data.data.products)
    console.log(res?.data)

  }
  async function removeCartItem(productId) {
    let res = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart/' + productId, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    console.log(res);
    setNumOfCartItems(res?.data.numOfCartItems)
    setTotalCartPrice(res?.data.data.totalCartPrice)
    setCartProducts(res?.data.data.products)
  }
  async function clearCart() {
    setNumOfCartItems(0)
    setTotalCartPrice(0)
    setCartProducts([])
    let res = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart/', {
      headers: {
        token: localStorage.getItem("token")
      }
    })

  }

  async function updateProductCount(productId, count, index) {

    console.log(productId, count);

    let newCartProducts = [...cartProducts]
    cartProducts[index]['count'] = count
    setCartProducts(newCartProducts)

    let res = await axios.put('https://ecommerce.routemisr.com/api/v1/cart/' + productId, {
      count
    }, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    console.log(res);
    setNumOfCartItems(res?.numOfCartItems)
    setCartCount(res?.numOfCartItems)
    setTotalCartPrice(res?.data.totalCartPrice)
    setCartProducts(res?.data.products)
  }




  return (
    <div>
      <Helmet>
                <title>My Cart</title>
            </Helmet>
      <button onClick={clearCart} className='btn btn-outline-danger ms-auto d-block my-2 '>Clear Cart</button>
      {cartProducts.map((product, index) => {
        return <div className="row align-items-center p-2 shadow my-4">
          <div className="col-md-2">
            <img src={product?.product.imageCover} className='w-100' alt="" />
          </div>
          <div className="col-md-10">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h3>{product?.product.title}</h3>
                <h5>{product?.product.category.name}</h5>
                <p>{product?.price}</p>
                <p><i className='fas fa-star text-success pe-1'></i>{product.product.ratingsAverage}</p>
              </div>
              <div>
                <div>
                  <button onClick={() => removeCartItem(product.product._id)} className='btn btn-outline-danger ms-auto d-block my-2 '>Remove</button>
                </div>
                <div className='d-flex align-items-center py-2'>
                  <button onClick={() => updateProductCount(product.product._id, product.count - 1, index)} className='btn btn-success'>-</button>
                  <span className='px-1'> {product?.count} </span>
                  <button onClick={() => updateProductCount(product.product._id, product.count + 1, index)} className='btn btn-success'>+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      })}
      <div className='text-end d-flex justify-content-between mb-5'>
      <Link to={'/Checkout/' + cartId }>  <button className='btn btn-success'>Checkout</button></Link>
        <h5 >Total Cart Price: {totalCartPrice}EGB</h5>
      </div>
    </div>
  )
}

export default Cart