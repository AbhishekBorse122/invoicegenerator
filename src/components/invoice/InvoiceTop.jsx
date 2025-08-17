import React, { useContext, useState } from 'react'
import { Input } from '../ui/input';
import InvoiceContext from '../../store/InvoiceContext';


let date = new Date();
date = new Intl.DateTimeFormat('en-US').format(date);

const InvoiceTop = () => {

    const {invoiceInfo,updateInvoiceDetail} = useContext(InvoiceContext);

    return (
        <>
            <div className='grid grid-col-1 md:grid-cols-2 items-center gap-4'>
                <div className='col-span-1'><span className='font-semibold'>Current Date :</span><span className='ps-3'>{date}</span></div>
                <div className='col-span-1 flex flex-col md:flex-row gap-3 md:items-center'>
                    <label htmlFor="Due Date" className='font-semibold'>Invoice Id :</label>
                    <Input onChange={updateInvoiceDetail} name='invoiceId' value={invoiceInfo.invoiceId || 1} className='w-fit bg-[#f5f7f9]' type="number" min="1" required/>
                </div>
                <div className='col-span-1 flex flex-col md:flex-row gap-3 md:items-center'>
                    <label htmlFor="Due Date" className='font-semibold'>Due Date :</label>
                    <Input onChange={updateInvoiceDetail} name='invoiceDueDate' value={invoiceInfo.invoiceDate} className="w-fit" type="date" min="2021-01-01" required/>
                </div>
            </div>
            <hr className='my-4 md:my-8'/>
        </>
    )
}

export default InvoiceTop
