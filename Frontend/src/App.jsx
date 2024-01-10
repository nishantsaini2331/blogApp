import { useState } from "react";
import "./App.css";
import Post from "./components/Post";
// import Header from "./components/Header";
import Layout from "./components/Layout"
import { Routes, Route } from "react-router-dom";
import IndexPage from "./components/Pages/IndexPage";
import LoginPage from "./components/Pages/LoginPage";
import RegisterPage from "./components/Pages/RegisterPage";


import {UserContextProvider} from "./context/UserContext";
import CreatePost from "./components/Pages/CreatePost";
import PostPage from "./components/Pages/PostPage";
import EditPost from "./components/Pages/EditPost";
import PublicBlog from "./components/Pages/PublicBlog";
import PrivateBlog from "./components/Pages/PrivateBlog";


function App() {
  const [count, setCount] = useState(0);

  return (
    <UserContextProvider>
      <Routes >
        <Route path='/' element ={ <Layout/> }>
            <Route index element={ <IndexPage/> } />
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/create" element={<CreatePost/>}/>
            <Route path="/post/:id" element={<PostPage/>}/>
            <Route path="/edit/:id" element={<EditPost/>}/>
            <Route path='/' element={<PublicBlog/>}/>
            <Route path='/private/:id' element={<PrivateBlog/>}/>
        </Route>

      </Routes>
     </UserContextProvider>
  );
}

export default App;
