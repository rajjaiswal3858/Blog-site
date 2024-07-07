import React from 'react'

const Spinner = () => {
  return (
    <div className='flex flex-col items-center justify-center h-[100vh]'>
      <div className='loader'></div>
      <p>Loading...</p>
    </div>    
  )
}

export default Spinner