import type { Metadata } from 'next'
import './globals.css'
import Sidebar from "@/src/components/bars/sidebar"
import { ReactNode } from 'react'
import { Divider } from '@mui/material'
import Topbar from '../components/bars/topbar'


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
      <body>
        <main className='relative'>
          <div className='flex'>
            <div className='bg-[#6d758f] flex-initial w-72 pt-10'>
              <Sidebar />
            </div>
            <div className='flex-auto min-h-screen overflow-auto bg-slate-100 relative'>
              <div>
                {children}
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
