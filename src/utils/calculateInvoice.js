export const calculateInvoice = (items,discount,tax)=>{

    let subTotal = items.reduce((acc,item)=>{
        return acc+(Number(item.quantity)*Number(item.price));
    },0)

    let totalDiscount = ((discount/100)*subTotal);
    let totalTax = ((subTotal-totalDiscount)*(tax/100));
    let total =  (subTotal - totalDiscount + totalTax);
    return {subTotal,totalDiscount,totalTax,total}
}

export const validateInvoiceData = ({invoiceInfo,issuerAddress,recipientAddress,invoiceItems})=>{

    if(!invoiceInfo.invoiceId || !invoiceInfo.invoiceDueDate){
        return { error: true, message: 'Invoice information cannot be empty.'};
    }

    if(!issuerAddress.issuerName || 
       !issuerAddress.issuerEmail ||
       !issuerAddress.issuerAddress || 
       !recipientAddress.recipientName || 
       !recipientAddress.recipientEmail ||
       !recipientAddress.recipientAddress 
    ){
        return { error: true, message: 'Invoice issuer & recipient information cannot be empty.'};
    }
    
    if(invoiceItems.length){
        for(const item of invoiceItems){
            console.log('inside');
            
            if(!item.name || !item.quantity || !item.price){
                console.log(item.name+'inside error');
                return { error: true, message: 'Invoice item information is empty.'};
            }
        };
    }

    return { error: false }
}