import React from 'react'
import notfoundImg from "../../Assets/notfoundImg.jpg"
import { Helmet } from 'react-helmet'
function NotFound() {
  return (
    <>
     <Helmet>
                <title>OOPS</title>
            </Helmet>
   <div className="text-center">
    <img className="w-50" src={notfoundImg} alt=""/>
   </div></>
  )
}

export default NotFound