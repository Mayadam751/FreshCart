import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";

function ProductDetails() {
    let params = useParams()
    let [productDetails, setProductDetails] = useState()
    let [isLoading, setIsLoading] = useState()
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    useEffect(() => {
        getProductDetails(params.id)
    }, [])

    async function getProductDetails(productId) {
        setIsLoading(true)
        let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products/' + productId);
        setIsLoading(false)
        setProductDetails(data.data)
        console.log(productDetails);
    }

    return (
        <div>
            <Helmet>
                <title>{productDetails?.title}</title>
            </Helmet>
            {!isLoading ? <div className="row align-items-center my-5">
                <div className="col-md-3">

                    <Slider {...settings}>
                        {productDetails?.images.map((img) => {
                            return <img key={img} className='w-100 shadow-sm' src={img} alt='' />
                        })}
                    </Slider>
                </div>
                <div className="col-md-9">
                    <h2>{productDetails?.title}</h2>
                    <h5 className='font-sm text-main'>{productDetails?.category.name}</h5>
                    <p>{productDetails?.description}</p>
                    <p><span className='fs-5'>Price:</span>{productDetails?.price}EGP</p>
                    <p><i className='fas fa-star text-success'></i>{productDetails?.ratingsAverage}</p>
                    <button className='btn bg-success text-white w-25 mx-auto d-block mb-2'>Add To Cart</button>
                </div>
            </div> : <div className='py-5 my-5 text-center'>
                <i className='fas fa-spin fa-spinner text-success fa-2xl'></i>
            </div>}
        </div>
    )
}


export default ProductDetails