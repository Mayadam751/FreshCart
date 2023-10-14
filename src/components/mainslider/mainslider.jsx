import React from 'react'

import img1 from '../../Assets/images/1.jpg'
import img2 from '../../Assets/images/2.jpg'
import img3 from '../../Assets/images/3.jpg'
import img4 from '../../Assets/images/4.jpg'
import img5 from '../../Assets/images/5.jpg'
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";

function Mainslider() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
      };
  return (
    <div className="row mt-5">
        <div className="col-md-9">
          <Slider {...settings}>
            <img src={img3} height={400} className='w-50' alt="" />
            <img src={img4} height={400} className='w-50' alt="" />
            <img src={img5} height={400} className='w-50' alt="" />
          </Slider>
        </div>
        <div className="col-md-3">
          <img src={img1} className='w-100' alt="" />
          <img src={img2} className='w-100' alt="" />
        </div>
      </div>
  )
}

export default Mainslider