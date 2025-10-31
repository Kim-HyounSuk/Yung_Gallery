'use client'

import { Footer, Header, Watermark } from '../_components'
import BusinessInSaudiPreviewPage from './_components/business-in-saudi-preview-page'

export default function Page() {
  return (
    <div className="relative mx-auto flex w-full max-w-[850px] flex-1 flex-col gap-4 pb-4 shadow-xl md:my-8 md:rounded-lg">
      {/* 상단 타이틀 */}
      <div className="sticky top-0 z-20">
        <Header />
      </div>
      <BusinessInSaudiPreviewPage />
      <Watermark />
      <Footer />
    </div>
  )
}
