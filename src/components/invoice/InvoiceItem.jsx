import React, { useContext } from 'react'
import { Input } from '../ui/input'
import { Trash2Icon } from 'lucide-react'
import { Button } from '../ui/button'
import InvoiceContext from '@/store/InvoiceContext'

const InvoiceItem = ({item}) => {

    const {deleteItemHandler,updateItemHandler} = useContext(InvoiceContext);

    return (
        <tr className='flex gap-4 py-3 border-b'>
            <td className='w-[60%]'>
                <Input onChange={(e)=> updateItemHandler(e,item.id)} value={item.name} name="name" type='text' placeholder='Item name' required/>
            </td>
            <td className='w-[10%]'>
                <Input onChange={(e)=> updateItemHandler(e,item.id)} value={item.quantity} name="quantity" type='number' placeholder='1' min='1' required/>
            </td>
            <td className='w-[25%] flex flex-row items-center relative'>
                <span className='absolute left-2'>₹</span>
                <Input onChange={(e)=> updateItemHandler(e,item.id)} value={item.price} name="price" className="ps-5"type='number' placeholder='2.50' precision="2" min='0.01' required/>
            </td>
            <td className='w-[5%]'>
                <Button onClick={()=>deleteItemHandler(item.id)} className='hover:bg-black hover:text-white' variant='outline' type='button' ><Trash2Icon /></Button>
            </td>
        </tr>
    )
}

export default InvoiceItem
