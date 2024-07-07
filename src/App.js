import React, { useContext, useEffect } from 'react' 
import { AppContext } from './Context/AppContext';
import { Routes, Route, useSearchParams ,useLocation} from 'react-router-dom';   
import Home from './pages/Home'; 
import TagPage from './pages/TagPage';
import CategoryPage from './pages/CategoryPage';
import BlogPage from './pages/BlogPage';

export const App = () => {
  const {fetchBlogPosts} = useContext(AppContext);
  const [searchParams,setSearchParams] = useSearchParams();
  const  location=useLocation();
  useEffect(() => { 
    const page=searchParams.get("page")?? 1;
    if(location.pathname.includes("tags")){
      //iska matlab tag wala match krna hai
      const tag=location.pathname.split("/").at(-1).replaceAll("-"," "); 
      fetchBlogPosts(Number(page),tag);
    }
    else if(location.pathname.includes("categories")){
      const category=location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchBlogPosts(Number(page),null,category);
    }
    else{
      fetchBlogPosts(Number(page));
    } 
  }, [location.pathname, location.search]) ;
  return (
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/blog/:blogId" element={<BlogPage/>}></Route>
      <Route path="/tags/:tag" element={<TagPage/>}></Route>
      <Route path="/categories/:category" element={<CategoryPage/>}></Route>
    </Routes>
  )
}

export default App