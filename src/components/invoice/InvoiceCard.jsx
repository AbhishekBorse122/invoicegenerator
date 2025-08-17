import React from 'react'
import InvoiceTop from './InvoiceTop'
import InvoiceAddress from './InvoiceAddress'
import InvoiceItemList from './InvoiceItemList'
import InvoiceTotal from './InvoiceTotal'


const InvoiceCard = () => {
  return (
    <div className='md:w-[75%] bg-[#fff] p-4 md:p-8 border border-[#00000020] rounded-[10px]'>
      <InvoiceTop/>
      <InvoiceAddress/>
      <InvoiceItemList/>
      <InvoiceTotal/>
    </div>
  )
}

export default InvoiceCard
