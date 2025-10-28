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
