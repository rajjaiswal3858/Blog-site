import React, { useContext } from "react";
import Spinner from "./Spinner";
import { AppContext } from "../Context/AppContext";
import { NavLink } from "react-router-dom";
import BlogDetails from "./BlogDetails";
const Blogs = (post) => {
    // Consume
    const { posts, loading } = useContext(AppContext);
    console.log(posts);
    
    return (
        <div className="max-w-[620px] w-11/12 py-3 flex flex-col gap-y-7 my-[100px] items-center justify-center mx-auto">
            {loading ? (
                <Spinner />
            ) : (
                posts.length === 0 ? (
                    <div className="">
                        <p className="">No Post Found</p>
                    </div>
                ) : (
                    posts.map((post) => (
                        <BlogDetails key={post.id} post={post}></BlogDetails>
                    ))
                )
            )}
        </div>
    );
};

export default Blogs;
