import React from 'react'
import Quote from '../Components/Quote'
import Auth from '../Components/Auth'

const SignUp = () => {
  return (
    <div className='h-screen grid lg:grid-cols-2'>
        <div>
        <Auth type='signup'/>
        </div>
        <div className='invisible lg:visible'>
        <Quote/>
        </div>
    </div>
  )
}

export default SignUp