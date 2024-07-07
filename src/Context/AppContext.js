import { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";
import { useNavigate } from "react-router-dom";
// Step1
export const AppContext = createContext();

function AppContextProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null);
    const navigate = useNavigate();
    // Data Filling
    const  fetchBlogPosts=async (page = 1, tag=null ,category) => {
        setLoading(true)
        let url = `${baseUrl}?page=${page}`;
        if(tag){
            url+=`&tag=${tag}`;
        }
        if(category){
            url+=`&category=${category}`; 
        }

        try {
            const result = await fetch(url);
            const data = await result.json();
            if(!data.posts || data.posts.length === 0){
                throw new Error("No Post Found");
            }
            console.log("Api Response",data)
            setPage(data.page);
            setPosts(data.posts);
            setTotalPages(data.totalPages);
        }
        catch (e) {
            console.log("Error")
            setPage(1);
            setPosts([]);
            setTotalPages(null);
        }
        setLoading(false);
    }


    const handlerPageChange=(page)=> {
        navigate({search:`/page/${page}`})
        setPage(page); 

    } 

    const value = {
        posts,
        setPosts,
        page,
        setPage,
        totalPages,
        setTotalPages,
        loading,
        setLoading,
        handlerPageChange,
        fetchBlogPosts,
    };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export default AppContextProvider;