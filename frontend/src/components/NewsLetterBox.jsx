import React from 'react'

const NewsLetterBox = () => {
    const onSubmitHandler = (event) => {
        event.preventDefault();
    }
  return (
    <div className='text-center '>
        <p className='text-2xl font-medium text-gray-800'>Subscribe Now and Get 20% Off!</p>
        <p className='text-gray-400 mt-3'>Sign up for our newsletter to receive updates and special offers.</p>
        <form className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3' onSubmit={onSubmitHandler}>
          <input id='newsletter-email' name='newsletterEmail' className='w-full sm:flex-1 outline-white' type='email' placeholder='Enter your email' autoComplete='email' required/>
            <button className='bg-black text-white text-xs px-10 py-4' type='submit'>SUBSCRIBE</button>
        </form>
       </div>
  )
}

export default NewsLetterBox