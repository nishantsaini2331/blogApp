import React from 'react'
import Header from './Header'
import {Outlet} from 'react-router-dom'

const Layout = () => {
  return (
    <div className="max-w-[1200px] p-10 mx-auto  ">
        <Header/>
        <Outlet/>
    </div>
  )
}

export default Layout