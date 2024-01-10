import React from 'react'
import { Outlet } from 'react-router-dom'
import Post from '../Post'
import PostPage from './PostPage'
import IndexPage from './IndexPage'

const PublicBlog = () => {
  return (
    <div>
        <IndexPage/>
    </div>
  )
}

export default PublicBlog