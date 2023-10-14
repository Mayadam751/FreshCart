import axios from 'axios';
import { Formik, useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { Authcontext } from '../../contexts/AuthContext';

function Login() {
  let navigate = useNavigate()
  let {isUserLoggedIn,setIsUserLoggedIn} = useContext(Authcontext)
  let [isLoading, setIsLoading] = useState(false)
  let [errorMessage, setErrorMessage] = useState("")

  useEffect(()=>{
    if (isUserLoggedIn){
      navigate('/home')
    }
  })

  async function register(values) {

    console.log(values);
    setIsLoading(true)
    setErrorMessage("")

    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).catch((err) => {
      console.log(err.response.data.message);
      setErrorMessage(err.response.data.message)
      setIsLoading(false)
    })
    console.log(data);
    localStorage.setItem("token", data.token)
    setIsLoading(false);
    setIsUserLoggedIn(true);
    navigate('/home')
  }



  let validationSchema = Yup.object({

    email: Yup.string().required('Email is Required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'email is required'),
    password: Yup.string().required('Password is Required').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'Passsword must have one letter, special character, number and min length is 8'),
  })


  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',

    },
    validationSchema,
    onSubmit: register
  })

  return (
    <>
      <div className="my-5">
        <div className="w-75 m-auto">
          <h1 className='my-3 texmuted'>Login now</h1>
          
          <form onSubmit={formik.handleSubmit}>


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



            {errorMessage ? <div className="alert alert-danger">
              {errorMessage}
            </div> : null}

            {isLoading ? <button disabled type="button" className='btn btn-light text-muted border-1 fs-5 px-3 d-block ms-auto py-2 border-black'><i className="fas fa-spinner fa-spin"></i></button>
              : <button disabled={isLoading} className='btn btn-light text-muted border-1 fs-5 px-3 d-block ms-auto py-2 border-black'>Login</button>

            }


          </form>
        </div>
      </div>
    </>
  )
}

export default Login