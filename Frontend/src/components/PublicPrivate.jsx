import React from 'react'
import { Link } from 'react-router-dom'
import PublicBlog from './Pages/PublicBlog'

const PublicPrivate = () => {
  return (
    <div>
        <Link to= '/public'>
            Public
        </Link>
        <Link to= '/private'>Private</Link>
    </div>
  )
}

export default PublicPrivate