import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'




function Categories() {
    let [categories, setcategories] = useState([])
    useEffect(()=>{
      getAllCategories()
    },[])
  
    async function getAllCategories(){
      let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      console.log(data.data);
      setcategories(data.data)
    }
    return (
      <>
      <Helmet>
                <title>Categories</title>
            </Helmet>
      <div className="row gy-5 my-3">
        <div className="tit text-center text-success"><h1>Categories</h1></div>
        {categories.map((category)=>{
        return <div className="col-md-4 gy-2">
        <div class="card mb-4" style={{ width: '18rem'}}>
          <img src={category.image} class="card-img-top overflow-hidden border-light shadow-sm" style={{height: '18rem', backgroundPosition: "center center" }}/>
          <div class="card-body">
            <h3 class="card-title text-success text-center border-1 border-light">{category.name}</h3>
          </div>
        </div>
        </div>
        })}
      </div></>
    )
}


export default Categories