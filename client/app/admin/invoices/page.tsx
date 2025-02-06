import AllInvoices from '@/app/components/Admin/orders/AllInvoices'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <AllInvoices isDashboard={true}/>
  )
}

export default page