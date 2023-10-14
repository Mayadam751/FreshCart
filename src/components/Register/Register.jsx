import axios from 'axios';
import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

function Register() {
  let navigate = useNavigate()
let [isLoading, setIsLoading ] = useState(false)
let [errorMessage, setErrorMessage ] = useState("")

  async function register(values) {
    
    console.log(values);
    setIsLoading(true)
    setErrorMessage("")

    let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values).catch((err)=>{
console.log(err.response.data.message);
setErrorMessage(err.response.data.message)
setIsLoading(false)
    })
    console.log(data);
    setIsLoading(false);
    navigate('/login')
  }



  let validationSchema = Yup.object({
    name: Yup.string().min(3, 'Min length should be more than 3 characters').max(20, 'Max length should be less than 20 characters').required('Name is Required'),
    email: Yup.string().required('Email is Required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,'email is required'),
    password: Yup.string().required('Password is Required').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,'Passsword must have one letter, special character, number and min length is 8'),
    rePassword: Yup.string().required("Repassword is Required").oneOf([Yup.ref('password')], "repassword doesn't match the password"),
    phone: Yup.string().required('Phone is Required').matches(/^01[0125][0-9]{8}$/),
  })


  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema,
    onSubmit: register
  })

  return (
    <>
    <Helmet>
                <title>Register</title>
            </Helmet>
      <div className="my-5">
        <div className="w-75 m-auto">
          <h1 className='my-3 texmuted'>Register Now</h1>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name" className='mb-2'>Name:</label>
            <input onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange} className='form-control mb-3' type="text" name="name" id='name' />
            {formik.errors.name && formik.touched.name ? <div className="alert alert-danger">
              <p>{formik.errors.name}</p>
            </div> : null}

            <label htmlFor="email" className='mb-2'>E-mail</label>
            <input onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} className='form-control mb-3' type="email" name="email" id='email' />
            {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">
              <p>{formik.errors.email}</p>
            </div> : null}

            <label htmlFor="password" className='mb-2'>Password:</label>
            <input onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} className='form-control mb-3' type="password" name="password" id='password' />
            {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">
              <p>{formik.errors.password}</p>
            </div> : null}

            <label htmlFor="rePassword" className='mb-2'>Re-Password:</label>
            <input onBlur={formik.handleBlur} value={formik.values.rePassword} onChange={formik.handleChange} className='form-control mb-3' type="password" name="rePassword" id='rePassword' />
            {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger">
              <p>{formik.errors.rePassword}</p>
            </div> : null}

            <label htmlFor="phone" className='mb-2'>Phone:</label>
            <input onBlur={formik.handleBlur} value={formik.values.phone} onChange={formik.handleChange} className='form-control mb-4' type="tel" name="phone" id='phone' />
            {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger">
              <p>{formik.errors.phone}</p>
            </div> : null}

{errorMessage ? <div className="alert alert-danger">
  {errorMessage}
</div>: null}

{isLoading ? <button disabled type="button" className='btn btn-light text-muted border-1 fs-5 px-3 d-block ms-auto py-2 border-black'><i className="fas fa-spinner fa-spin"></i></button>
:<button disabled={isLoading} className='btn btn-light text-muted border-1 fs-5 px-3 d-block ms-auto py-2 border-black'>Register Now</button>

}

            
          </form>
        </div>
      </div>
    </>
  )
}

export default Register