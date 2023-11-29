import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '../components/bars/sideBar'
import { ReactNode } from 'react'
import Topbar from '../components/bars/topBar'

export const metadata: Metadata = {
  title: 'Manager',
  description: 'Manager'
}


export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    
    <html lang="en">
      <body className='bg-indigo-700'>        
        <main className='relative'>
          <div className='flex'>
            <div className='flex-initial pt-16'><Sidebar/></div>
            <div className='flex-auto min-h-screen overflow-auto bg-slate-100 pt-14 relative'>
              <Topbar/>
              <div className='p-5'>{children}</div>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
