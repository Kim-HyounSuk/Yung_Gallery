import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import './globals.css'

export const metadata: Metadata = {
  title: 'Yung Gallery - Business in Saudi',
  description: 'Business in Saudi 지원 페이지',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-body-md bg-[url(/images/wave.svg)] bg-cover bg-center bg-no-repeat">
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
