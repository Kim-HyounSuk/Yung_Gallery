import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Yung Global',
  description: `Yung Global's 비즈니스 프로그램 신청 페이지`,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
