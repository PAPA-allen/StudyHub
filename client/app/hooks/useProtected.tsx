import React, { FC } from 'react'
import useAuth from './useAuth';
import { redirect } from 'next/navigation';


type Props = {
    children: React.ReactNode
}
const Protected:FC<Props> = ({ children }) => {
    const isAuthenticated = useAuth();
  return isAuthenticated ? children : redirect("/");
}

export default Protected;