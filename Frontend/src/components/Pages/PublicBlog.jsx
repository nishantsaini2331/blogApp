import React from 'react'
import { Outlet } from 'react-router-dom'
import Post from '../Post'
import PostPage from './PostPage'

const PublicBlog = () => {
  return (
    <div>
        <h1>heelo</h1>
        <Outlet/>
    </div>
  )
}

export default PublicBlog