"use client"
import React, { FC, useState } from 'react'
import { Header, Landing } from './components'

interface Props {

}
const Page: FC<Props> = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [open, setOpen] = useState(false)
  const [route, setRoute]=useState("Login")
  return (
    <div>
      <Header
        activeItem={activeItem}
        open={open}
        setOpen={setOpen}
        setRoute={setRoute}
        route={route}
      />
    <Landing/>
    </div>
  )
}

export default Page
