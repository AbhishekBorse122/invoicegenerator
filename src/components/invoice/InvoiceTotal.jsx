import InvoiceContext from '@/store/InvoiceContext'
import { calculateInvoice } from '@/utils/calculateInvoice';
import React, { useContext, useEffect } from 'react'

const InvoiceTotal = () => {

    const {invoiceItems,invoiceTaxDiscount,updateInvoiceTotal} = useContext(InvoiceContext);
    const {invoiceDiscount,invoiceTax} = invoiceTaxDiscount; 

    const {subTotal,totalDiscount,totalTax,total} = calculateInvoice(invoiceItems,invoiceDiscount,invoiceTax);

    useEffect(()=>{
        updateInvoiceTotal({
            subtotal: subTotal,
            discount: totalDiscount,
            tax: totalTax,
            total,
        })
    },[subTotal,totalDiscount,totalTax,total])

    return (
        <>
            <div className='flex flex-col w-full sm:w-1/2 mt-4 space-y-1 ms-auto'>
                <div className='flex justify-between'>
                    <span className='text-[14px] font-medium'>Subtotal: </span>
                    <span>₹ {subTotal.toFixed(2)}</span>
                </div>
                <div className='flex justify-between'>
                    <span className='text-[14px] font-medium'>Discount: ({invoiceDiscount}%)</span>
                    <span>- ₹ {totalDiscount.toFixed(2)}</span>
                </div>
                <div className='flex justify-between'>
                    <span className='text-[14px] font-medium'>Tax: ({invoiceTax}%)</span>
                    <span>+ ₹ {totalTax.toFixed(2)}</span>
                </div>
                <div className='flex justify-between border-t py-2'>
                    <span className='text-xl font-bold'>Total: </span>
                    <span className='text-xl font-bold'>₹ {total.toFixed(2)}</span>
                </div>
            </div>
            <div className='flex flex-col border-t pt-5'>
                <label htmlFor="Notes" className='text-sm font-semibold'>Note:</label>
                <textarea className='bg-[#f5f7f9] border rounded-sm mt-2 p-2 h-fit' name="" id="" placeholder='Thanks for the business!'></textarea>
            </div>
        </>
    )
}

export default InvoiceTotal