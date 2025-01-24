"use client"
import React, { FC, useState } from 'react'
import { Header, Landing } from './components'
import Profile from './profile/page';
import Heading from './utils/Heading';

interface Props {

}
const Page: FC<Props> = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [open, setOpen] = useState(false)
  const [route, setRoute] = useState("Login")

  return (
    <div>
       <Heading
        title="StudyHub"
        description="StudyHub is a platform that allows you to learn and share your knowledge with others"
        keywords="Programming, Business, Machine Learnig" />
      <Header
        activeItem={activeItem}
        open={open}
        setOpen={setOpen}
        setRoute={setRoute}
        route={route}
      />
      <Landing />
    </div>
  )
}

export default Page
