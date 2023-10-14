import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Product from '../Product/product'
import Mainslider from '../mainslider/mainslider'
import CategorySlider from '../CategorySlider/CategorySlider'
import toast from 'react-hot-toast';
import { useQuery } from 'react-query'
import { Helmet } from 'react-helmet'


function Home() {
 let {isLoading, isError, isFetched, data, refetch, isFetching} =  useQuery('products', getAllproducts , {
  cacheTime: 3000, staleTime: 10000, refetchInterval: 10000, enabled: false, refetchOnMount: false
 })
 console.log(isLoading, isFetching)

  function getAllproducts(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }
  let [products, setProducts] = useState([])
  


  // useEffect(() => {
  //   getAllproducts()
  // }, [])

  // async function getAllproducts() {
  //   let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
  //   console.log(data.data);
  //   setProducts(data.data)

   
  // }
  return (
    <>
     <Helmet>
                <title>Home</title>
            </Helmet>
     <Mainslider/>
     {/* <CategorySlider/> */}
      <div>
        <div key={Product._id} className="row gy-5 my-3">
          <button onClick={refetch} className='btn btn-success'>Get Products</button>
          {data?.data.data.map((product) => {
            return <div className="col-md-4">
              <Product product={product} />
            </div>
          })}
        </div>
      </div>
    </>

  )
}

export default Home