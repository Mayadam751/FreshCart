import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
function CategorySlider() {

    let [category, setCategory] = useState([])
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 3,
        arrows: false
    };

    useEffect(() => {
        getCategoriesImg()
    }, [])

    async function getCategoriesImg() {
        let res = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        console.log(res.data.data);
        setCategory(res.data.data)
    }

    return (
        <div className="row">
            <div className="col-md-2">
                <Slider {...settings}>

                    {category.data.map(function (category, idx) {
                        return <div key={idx} >
                            <img src={category.image} alt="" style={{ width: '100%', height: '200px' }} />
                            <h6>{category.name}</h6>
                        </div>
                    })}

                </Slider>
            </div>
        </div>
    )
}

export default CategorySlider