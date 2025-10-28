import { BusinessInSaudiForm, Footer, Header, Watermark } from './_components'

export default function Page() {
  return (
    <BusinessInSaudiForm
      header={<Header />}
      footer={<Footer />}
      watermark={<Watermark />}
    />
  )
}
