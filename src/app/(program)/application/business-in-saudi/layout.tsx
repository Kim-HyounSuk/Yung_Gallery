import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Yung Global | Business in Saudi 프로그램 지원',
  description: `Yung Global's Business in Saudi 프로그램 신청 페이지`,
}

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className="bg-background text-body-md flex min-h-svh flex-col bg-[url(/images/wave.svg)] bg-cover bg-center bg-no-repeat md:min-h-screen">
      {children}
    </div>
  )
}
