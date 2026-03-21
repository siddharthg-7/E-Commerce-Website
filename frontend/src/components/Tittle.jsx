import React from 'react'

const Tittle = ({ text1, text2 }) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
      <p className='text-gray-500'>{text1}</p>
      <p className='text-gray-700'>{text2}</p>
      <hr className='w-8 h-[1.5px] bg-gray-700' />
    </div>
  )
}

export default Tittle
