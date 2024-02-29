import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import UserProvider from '@/contexts/UserProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Readme App',
    description: 'Inge SoftII'
}

export default function RootLayout({ children }) {
    return (
        <UserProvider>
            <html lang='en'>
                <body className={inter.className}>
                    <Toaster position='top-center' />
                    <div>{children}</div>
                </body>
            </html>
        </UserProvider>
    )
}
