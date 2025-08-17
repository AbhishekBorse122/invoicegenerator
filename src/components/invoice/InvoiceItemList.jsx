import React, { useContext } from 'react'
import InvoiceItem from './InvoiceItem'
import { Button } from '../ui/button'
import InvoiceContext from '@/store/InvoiceContext'
import { Plus } from 'lucide-react'

const InvoiceItemList = () => {

    const {invoiceItems,addItemHandler} = useContext(InvoiceContext);

    return (
        <div className='w-'>
            <table className='w-full'>
                <thead>
                    <tr className='flex gap-4 text-left border-t border-b py-1'>
                        <th className='w-[60%]'>Item</th>
                        <th className='w-[10%]'>Qty</th>
                        <th className='w-[25%]'>Price</th>
                        <th className='w-[5%]'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {invoiceItems?.map((item)=>
                        <InvoiceItem key={item.id} item={item}/>
                    )}
                </tbody>
            </table>
            <Button onClick={addItemHandler} className='mt-4' type='button'>Add Item<Plus /></Button>
        </div>
    )
}

export default InvoiceItemList
