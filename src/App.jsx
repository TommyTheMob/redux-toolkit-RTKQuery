import React from "react";
import CounterPage from "./featurs/counter/CounterPage.jsx";
import PostsPage from "./featurs/posts/PostsPage.jsx";
import SinglePostPage from "./featurs/posts/SinglePostPage.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditPost from "./featurs/posts/EditPost.jsx";

function App() {

    return (
        <Router>
            <Routes>
                <Route path='/counter' element={<CounterPage/>} />
                <Route path='/posts' element={<PostsPage/>} />
                <Route path='/posts/:postId' element={<SinglePostPage />} />
                <Route path='/editPost/:postId' element={<EditPost />} />
            </Routes>
        </Router>
    )
}

export default App
