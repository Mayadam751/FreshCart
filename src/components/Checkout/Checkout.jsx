import React from 'react'
import {  useFormik } from 'formik'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Checkout() {

    let {id} = useParams()

    async function checkout(shippingAddress) {

        fetchCheckout(shippingAddress);
        console.log(shippingAddress);

    }


async function fetchCheckout(shippingAddress){
let res = await axios.post(` https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`, {
    shippingAddress
},{
    headers:{ token: localStorage.getItem("token")}
})
console.log(res?.data.session.url);}


    let formik = useFormik({
        initialValues: {
            details: '',
            Phone: '',
            city: '',
        },
        onSubmit: checkout
    })


    return (
        <div>
           <form onSubmit={formik.handleSubmit} className='w-75 mx-auto my-5'>

<label htmlFor="details" className='mb-2'>Details:</label>
<input onBlur={formik.handleBlur} value={formik.values.details} onChange={formik.handleChange} className='form-control mb-3' type="text" name="datails" id='datails' />


<label htmlFor="phone" className='mb-2'>Phone:</label>
<input onBlur={formik.handleBlur} value={formik.values.phone} onChange={formik.handleChange} className='form-control mb-3' type="tel" name="phone" id='phone' />

<label htmlFor="city" className='mb-2'>City:</label>
<input onBlur={formik.handleBlur} value={formik.values.city} onChange={formik.handleChange} className='form-control mb-3' type="text" name="city" id='city' />


<button className='btn btn-success px-3 d-block ms-auto py-2'>Order</button>

</form>
        </div>
    )
}

export default Checkout