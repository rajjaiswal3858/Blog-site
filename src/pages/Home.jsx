import React from 'react'
import Headers from '../Components/Header'
import Blogs from '../Components/Blogs'
import Pagination from '../Components/Pagination'
const Home = () => {
  return (
    <div>
      <Headers></Headers>
      <div className='mx-auto flex flex-col justify-center items-center'>
        <Blogs></Blogs>
        <Pagination></Pagination>
      </div>
      
    </div>
  )
}

export default Home
