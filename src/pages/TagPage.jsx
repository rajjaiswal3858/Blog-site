import React from 'react'
import Header from '../Components/Header'
import Blogs from '../Components/Blogs'
import Pagination from '../Components/Pagination'
import { useNavigate,useLocation } from 'react-router-dom';
const TagPage = () => {
    const navigation=useNavigate();
    const location=useLocation();
    const tag=location.pathname.split("/").at(-1);

  return (
    <div>
            <Header />
            <div>
                <div>
                    <button onClick={() => navigation(-1)}>Back</button>
                </div>
                <h2>
                    Blog Tagged <span>#{tag}</span>
                </h2>
            </div>
            <Blogs />
            <Pagination />
        </div>
  )
}

export default TagPage
