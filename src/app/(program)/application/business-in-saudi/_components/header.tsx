export function Header() {
  return (
    <header className="bg-primary text-primary-foreground flex w-full flex-col gap-4 px-6 py-8 md:rounded-t-lg md:p-[50px]">
      <div className="flex w-full items-center justify-center gap-4 md:gap-8">
        <div className="h-[75px] w-[75px] bg-[url(/images/logo_g.png)] bg-contain bg-center bg-no-repeat md:h-[100px] md:w-[100px]" />
        <h1 className="text-title-sm md:text-title-lg font-bold">
          Program Application
          <br />
          Business in Saudi
        </h1>
      </div>
      <p className="text-body-sm md:text-body-md text-center break-keep">
        <span className="font-semibold">Business in Saudi</span> 프로그램은
        사우디아라비아 진출을 모색하는 한국 기업(브랜드)를 위한 프로그램 입니다.
        <br />
        <span className="font-semibold">Yung Gallery</span>가 시작과 끝을
        함께하며, 안정적이고 효과적인 현지 비즈니스 진출을 지원하고 있습니다.
      </p>
    </header>
  )
}
