import React from 'react'
import {useParams } from 'react-router-dom'



const PrivateBlog = () => {
    const param = useParams()
    console.log("param",param)
  return (
    <div>PrivateBlog</div>
  )
}

export default PrivateBlog