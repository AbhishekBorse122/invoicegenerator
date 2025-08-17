import React from 'react'
import { Input } from './input'

const Address = ({address,type,name,changeHandler}) => {



    return (
        <div className='w-full'>
            <div className='font-semibold mb-3'>{type}</div>        
            <div className='space-y-3'>
                <Input onChange={changeHandler} value={address.name} name='Name' type='text' placeholder={name} required/>
                <Input onChange={changeHandler} value={address.email} name='Email' type='email' placeholder="Email Address" required/>
                <Input onChange={changeHandler} value={address.address} name='Address' type='text' placeholder="Billing Address" required/>
            </div>
        </div>
    )
}

export default Address
