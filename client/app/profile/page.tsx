"use client";

import React, { FC, useState } from 'react'
import Protected from '../hooks/useProtected'
import { Header } from '../components'
import Profile from '../components/Profile/Profile';
import Heading from '../utils/Heading';
import { useSelector } from 'react-redux';



const Page = () => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(5);
    const [route, setRoute] = useState("login")
    const {user}=useSelector((state:any)=>state.auth)
  return (
      <div>
          <Protected>
          <Heading
        title={`${user?.name}'s Profile`}
        description="StudyHub is a platform that allows you to learn and share your knowledge with others"
        keywords="Programming, Business, Machine Learnig" />
          <Header
        activeItem={activeItem}
        open={open}
        setOpen={setOpen}
        setRoute={setRoute}
        route={route}
              />
              <Profile user={user} />
          </Protected>
    </div>
  )
}

export default Page;