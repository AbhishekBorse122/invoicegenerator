import InvoiceCard from '@/components/invoice/InvoiceCard'
import Sidebar from '@/components/sidebar/Sidebar'
import React from 'react'

const MainLayout = () => {
  return (
    <main className='max-w-7xl mx-auto mt-5 px-4'>
      <form>
        <div className='flex flex-col md:flex-row gap-4'>
            <InvoiceCard/>
            <Sidebar/>
        </div>
      </form>
    </main>
  )
}

export default MainLayout
