import React, { useContext } from 'react'
import Address from '../ui/Address'
import InvoiceContext from '@/store/InvoiceContext'

const InvoiceAddress = () => {

    const {issuerAddress,recipientAddress,updateIssuerAddress,updateRecipientAddress} = useContext(InvoiceContext);

    return (
        <> 
            <div className='flex flex-col md:flex-row gap-4 mb-4 md:mb-8'>
                <Address changeHandler={updateIssuerAddress} address={issuerAddress} type="Invoice Issuer" name='Issuer of the Invoice'/>
                <Address changeHandler={updateRecipientAddress} address={recipientAddress} type="Invoice Recipient"  name='Recipient of the Invoice'/>
            </div>
        </>
    )
}

export default InvoiceAddress
