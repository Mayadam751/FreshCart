import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'



function Products() {
  let [products, setProducts] = useState([])
  useEffect(() => {
    getAllproducts()
  }, [])

  async function getAllproducts() {
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    console.log(data.data);
    setProducts(data.data)

  
  }
  return (
    <>
    <Helmet>
                <title>Products</title>
            </Helmet>
    <div className="row gy-5 my-3">
      <div className="tit text-center text-success"><h1>Products</h1></div>
      {products.map((product) => {
        return <>
          <div className="col-md-4">
            <Link to={'/productDetails/' + product._id} className='text-decoration-none text-dark'>
              <div className="product p-4">

                <img src={product.imageCover} className='w-100 img-thumbnail' alt="" />
                <h3 className=' font-monospace text-start'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
                <h5 className='text-success text-start font-monospace'>{product.category.name}</h5>
                <p><span className='fs-5'>Price:</span> {product.price}EGP</p>
                <button className='btn bg-success text-white w-75 d-block '>Add To Cart</button>
              </div>
            </Link>

          </div>
        </>
      })}
    </div>
    </>
  )
}

export default Products