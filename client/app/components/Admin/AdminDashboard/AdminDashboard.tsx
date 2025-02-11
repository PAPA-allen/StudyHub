"use client";
import React, { FC, useState } from 'react'
import DashboardWidgets from '../../Widgets/DashboardWidgets'

type Props = {
    isDashboard:boolean
}

const AdminDashboard: FC<Props> = ({ isDashboard }) => {
    const [open, setOpen]=useState(false)
  return (
      <div>
          {
              isDashboard && (
                  <DashboardWidgets open={open} />
              )
          }
    </div>
  )
}

export default AdminDashboard