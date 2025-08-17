import React, { useContext } from 'react'
import { Input } from '../ui/input'
import InvoiceContext from '@/store/InvoiceContext'
import InvoiceModal from '../invoice/InvoiceModal'

const Sidebar = () => {

  const {invoiceTaxDiscount,updateInvoiceTaxDiscount} = useContext(InvoiceContext);


  return (
    <div className='md:w-[25%] space-y-4'>
      <InvoiceModal/>
      <hr />
      <div className=''>
        <label className='text-sm font-bold' htmlFor="Tax Rate">Discount (%)</label>
        <div className='flex mt-2'>
          <Input onChange={updateInvoiceTaxDiscount} name='invoiceDiscount' value={invoiceTaxDiscount.invoiceDiscount} type='number' className='bg-[#fff]' min='0'/>
          <span className='bg-[#f8f9fa] border py-1 px-3'>%</span>
        </div>
      </div>
      <div>
        <label className='text-sm font-bold' htmlFor="Tax Rate">Tax Rate (%)</label>
        <div className='flex mt-2'>
          <Input onChange={updateInvoiceTaxDiscount} name='invoiceTax' value={invoiceTaxDiscount.invoiceTax} type='number' className='bg-[#fff]' min='0'/>
          <span className='bg-[#f8f9fa] border py-1 px-3'>%</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
