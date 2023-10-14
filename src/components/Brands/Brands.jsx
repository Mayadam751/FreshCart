import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

function Brands() {
  let [brands, setbrands] = useState([])
  useEffect(()=>{
    getAllBrands()
  },[])

  async function getAllBrands(){
    let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
    console.log(data.data);
    setbrands(data.data)
  }
  return (
    <>
    <Helmet>
                <title>Brands</title>
            </Helmet>
    <div className="row gy-5 my-3">
      <div className="tit text-center text-success"><h1>Brands</h1></div>
      {brands.map((brand)=>{
      return <div className="col-md-4 gy-2">
      <div class="card mb-4" style={{ width: '18rem'}}>
        <img src={brand.image} class="card-img-top overflow-hidden border-light shadow-sm" style={{height: '18rem', backgroundPosition: "center center" }}/>
        <div class="card-body">
          <h3 class="card-title text-success text-center border-1 border-light">{brand.name}</h3>
        </div>
      </div>
      </div>
      })}
    </div></>
  )
}

export default Brands