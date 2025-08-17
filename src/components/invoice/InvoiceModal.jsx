import React, { useContext, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import InvoiceContext from '@/store/InvoiceContext'
import { toast } from 'sonner'
import jsPDF from 'jspdf'
import domtoimage from 'dom-to-image';
import { Download, Share2 } from 'lucide-react'
import { validateInvoiceData } from '@/utils/calculateInvoice'


const InvoiceModal = () => {
    
    const {invoiceInfo,invoiceItems,recipientAddress,issuerAddress,invoiceTaxDiscount,invoiceTotal} = useContext(InvoiceContext);
    const {invoiceDiscount,invoiceTax} = invoiceTaxDiscount;
    const {subtotal,discount,tax,total} = invoiceTotal;

    const [isOpen,setIsOpen] = useState(false);


    const submitHandler = (e)=>{
        e.preventDefault();
        let flag = validateInvoiceData({invoiceInfo,issuerAddress,recipientAddress,invoiceItems});
        if(!flag.error){
            setIsOpen(prev=>!prev);
        }else (
            toast.error(flag.message)
        )
    }

   
    const GenerateInvoice = () => {
        const node = document.getElementById('invoiceCapture');
        if (!node) return;

        domtoimage.toPng(node).then((dataUrl) => {
            const img = new Image();
            img.src = dataUrl;

            img.onload = () => {
                // Get image dimensions in pixels
                const imgWidth = img.width;
                const imgHeight = img.height;

                // Convert image dimensions to PDF units (pt)
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'pt',
                    format: 'a4' // [595.28, 841.89] pt
                });

                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();

                // Fit image within PDF page while preserving aspect ratio
                const aspectRatio = imgWidth / imgHeight;
                let renderWidth = pageWidth;
                let renderHeight = renderWidth / aspectRatio;

                if (renderHeight > pageHeight) {
                    renderHeight = pageHeight;
                    renderWidth = renderHeight * aspectRatio;
                }

                const x = (pageWidth - renderWidth) / 2;
                const y = (pageHeight - renderHeight) / 2;

                pdf.addImage(dataUrl, 'PNG', x, y, renderWidth, renderHeight);
                pdf.save('invoice-001.pdf');
            };
        }).catch((error) => {
            console.error('dom-to-image error:', error);
        });
    };

    
    return (
        <>
            <Button onClick={submitHandler} type='submit' className='cursor-pointer'>Review Invoice</Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTitle className='hidden'>Invoice</DialogTitle>
                <DialogContent className='md:!max-w-3xl w-full p-0'>
                    <div id='invoiceCapture' className='px-6 pt-6 space-y-3'>
                        <div className=''>
                            <h1 className='text-xl font-bold'>{recipientAddress.recipientName}</h1>
                            <div className='text-sm font-semibold'>Invoice Id : <span className='font-medium'>#{invoiceInfo?.invoiceId}</span></div>
                            <h2 className='text-sm font-semibold'>Amount Due : <span className='font-medium'>₹ {total?.toFixed(2)}</span></h2>
                            <h2 className='text-sm font-semibold'>Due Date : <span className='font-medium'>{invoiceInfo?.invoiceDueDate}</span></h2>
                        </div>
                        <hr />
                        <div className='flex flex-wrap gap-5 xs:gap-10 text-sm'>
                            <div className=''>
                                <div className="font-bold">Invoice Issuer Address:</div>
                                <div>{issuerAddress.issuerName}</div>
                                <div>{issuerAddress.issuerEmail}</div>
                                <div>{issuerAddress.issuerAddress}</div>
                            </div>
                            <div>
                                <div className="font-bold">Invoice Recipient Address:</div>
                                <div>{recipientAddress.recipientName}</div>
                                <div>{recipientAddress.recipientEmail}</div>
                                <div>{recipientAddress.recipientAddress}</div>
                            </div>
                        </div>
                        <hr />
                        {
                            invoiceItems.length > 0 &&  
                            <div>
                                <table className='w-full'>
                                    <thead>
                                        <tr className='border-b text-left'>
                                            <th className='w-[55%] py-2'>Item</th>
                                            <th className='w-[10%] py-2'>Qty</th>
                                            <th className='w-[15%] py-2'>Price</th>
                                            <th className='w-[20%] py-2'>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            invoiceItems.map(item=>(
                                                <tr key={item.id} className='border-b'>
                                                    <td className='w-[55%] py-1'>{item.name}</td>
                                                    <td className='w-[10%] py-1'>{item.quantity}</td>
                                                    <td className='w-[15%] py-1'>₹{item.price}</td>
                                                    <td className='w-[20%] py-1'>₹{item.quantity*item.price}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                <div className='mt-5 md:w-1/2'>
                                    <div className='flex justify-between'>
                                        <span className='text-[14px] font-medium'>Subtotal: </span>
                                        <span>₹ {subtotal?.toFixed(2)}</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-[14px] font-medium'>Discount: ({invoiceDiscount}%)</span>
                                        <span>- ₹ {discount?.toFixed(2)}</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-[14px] font-medium'>Tax: ({invoiceTax}%)</span>
                                        <span>+ ₹ {tax?.toFixed(2)}</span>
                                    </div>
                                    <div className='flex justify-between border-t py-2'>
                                        <span className='text-xl font-bold'>Total: </span>
                                        <span className='text-xl font-bold'>₹ {total?.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        }
                        {/* <div className='text-sm font-normal border border-[#ececec] p-2 rounded-md'>
                        Thank You for Purchase
                        </div> */}
                    </div>    
                    <div className='flex flex-col md:flex-row justify-between gap-4 px-6 pb-6'>
                        <Button className='flex-1/2 cursor-pointer'>Share on Email<Share2 /></Button>
                        <Button onClick={GenerateInvoice} className='flex-1/2 cursor-pointer'>Download Invoice<Download /></Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default InvoiceModal
