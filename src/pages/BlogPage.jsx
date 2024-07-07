import React, { useEffect } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'
import { useState,useContext } from 'react'
import { baseUrl } from '../baseUrl'
import BlogDetails from '../Components/BlogDetails'

import Header from '../Components/Header'


const BlogPage = () => {
    const [relatedBlogs,setRelatedBlogs]=useState([]);
    const [blog,setBlog]=useState(null);
    const location=useLocation();
    const navigation=useNavigate();
    const {setLoading,loading}=useContext(AppContext);
    const blogId=location.pathname.split("/").at(-1);
    const newBaseUrl = "https://codehelp-apis.vercel.app/api/";
    async function fetchRelatedBlogs(){
        setLoading(true);
        let url=`${newBaseUrl}get-blog?blogId=${blogId}`
        try{
            const result=await fetch(url);
            const data=await result.json();
            setBlog(data.blog);
            setRelatedBlogs(data.relatedBlogs);
        }
        catch(error){
            console.log("Error")
            setBlog(null);
            setRelatedBlogs([]);
        }
        setLoading(false);
    }
    useEffect(() => {
        if(blogId){
            fetchRelatedBlogs();
        }
    },[location.pathname]);
  return (
    <div className="max-w-[620px] w-11/12 py-3 flex flex-col gap-y-7 my-[100px] items-center justify-center mx-auto"  > 
      <Header />
      <div>
        <button onClick={() => navigation(-1)}>Back</button>
      </div>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : blog ? (
          <div >
            <BlogDetails post={blog} />
            <hr className='h-2.5'></hr>
            <h2 className='text-2xl mt-5 mb-5 font-bold text-center'>Releated Blogs</h2>
            {relatedBlogs.map((post) => (
              <div key={post.id}>
                <BlogDetails post={post} />
              </div>
            ))}
          </div>
        ) : (
          <p>No Blog Found</p>
        )}
      </div>
    </div>
  )
}

export default BlogPage
