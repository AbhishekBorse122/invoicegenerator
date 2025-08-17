import React, { createContext, useState } from 'react'
import { toast } from 'sonner'


const invoiceInitialInfo = {
    invoiceId: 1,
    invoiceDueDate: null,
}
const initialIssuerAddress = {
    issuerName: '',
    issuerEmail: '',
    issuerAddress: '',
}
const initialRecipientAddress = {
    recipientName: '',
    recipientEmail: '',
    recipientAddress: '',
}
const initalInvoiceItem = {
    id: Date.now() + Math.random(),
    name: '',
    quantity: '',
    price: '',
}
const initialInvoiceItems = [
    {
        ...initalInvoiceItem
    }
]
const initialInvoiceTotal = {
    subtotal: 0,
    discount: 0,
    tax:0,
    total: 0,
}
const initialTaxDiscount = {
    invoiceDiscount: 0,
    invoiceTax: 0,
}


const InvoiceContext = createContext({
    invoiceInfo: null,
    issuerAddress: {},
    recipientAddress: {},
    invoiceItems: [],
    invoiceTotal: {},
    invoiceTaxDiscount: {},
    updateInvoiceDetail: ()=>{},
    updateIssuerAddress: ()=>{},
    updateRecipientAddress: ()=>{},
    updateItemHandler: ()=>{},
    addItemHandler: ()=>{},
    deleteItemHandler: ()=>{},
    updateInvoiceTotal: ()=>{},
    updateInvoiceTaxDiscount: ()=>{},
})

export const InvoiceContextProvider = ({children}) => {

    const [invoiceInfo,setInvoiceInfo] = useState(invoiceInitialInfo);
    const [issuerAddress,setIssuerAddress] = useState(initialIssuerAddress);
    const [recipientAddress,setRecipientAddress] = useState(initialRecipientAddress);
    const [invoiceItems,setInvoiceItems] = useState(initialInvoiceItems);
    const [invoiceTotal,setInvoiceTotal] = useState(initialInvoiceTotal);
    const [invoiceTaxDiscount,setInvoiceTaxDiscount] = useState(initialTaxDiscount);

    const updateInvoiceDetail = (e)=>{
        setInvoiceInfo((prev)=>({
            ...prev,
            [e.target.name]: e.target.value, 
        }))
    }
    const updateIssuerAddress = (e)=>{
        setIssuerAddress(prev=>({
            ...prev,
            ['issuer'+e.target.name]: e.target.value,
        }))
    }
    const updateRecipientAddress = (e)=>{
        setRecipientAddress(prev=>({
            ...prev,
            ['recipient'+e.target.name]: e.target.value,
        }))
    }
    const updateItemHandler = (e,id)=>{

        const itemIndex = invoiceItems.findIndex(item=> item.id === id);
        if (itemIndex === -1) return;

        const itemsArr = [...invoiceItems];
        const updatedItem  = {
            ...itemsArr[itemIndex],
            [e.target.name]: e.target.value, 
        }
        itemsArr[itemIndex] = updatedItem; 
        setInvoiceItems(itemsArr);
    }
    const addItemHandler = ()=>{
        setInvoiceItems(prev=>([
            ...prev,
            {
                ...initalInvoiceItem,
                id: Date.now(),
            }
        ]))
    }
    const deleteItemHandler = (id)=>{
        if(invoiceItems.length <= 1){
            toast.error('You cannot remove all items.')
            return;
        }    
        setInvoiceItems(prev=> prev.filter(item=> item.id !== id));
    }

    const updateInvoiceTotal = ({subtotal,discount,tax,total})=>{
        setInvoiceTotal(prev=>({
            ...prev,
            subtotal,
            discount,
            tax,
            total,
        }))
    }

    const updateInvoiceTaxDiscount = (e)=>{        
        setInvoiceTaxDiscount(prev=>({
            ...prev,
            [e.target.name]:e.target.value,
        }))
    }

    const ctxValue = {
        invoiceInfo,
        issuerAddress,
        recipientAddress,
        invoiceItems,
        invoiceTotal,
        invoiceTaxDiscount,
        updateInvoiceDetail,
        updateIssuerAddress,
        updateRecipientAddress,
        updateItemHandler,
        addItemHandler,
        deleteItemHandler,
        updateInvoiceTotal,
        updateInvoiceTaxDiscount,
    }

    return (
        <InvoiceContext.Provider value={ctxValue}>
            {children}
        </InvoiceContext.Provider>
    )
}

export default InvoiceContext
