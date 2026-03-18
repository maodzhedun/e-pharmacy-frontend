/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-bg">
      {/* Logo */}
      <div className="absolute left-5 top-5 z-10 md:left-8 md:top-8 lg:left-[100px] lg:top-10">
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/logo.svg" alt="E-Pharmacy" width={44} height={44} />
          <span className="text-base font-semibold text-text sm:text-lg">E-Pharmacy</span>
        </Link>
      </div>

      {/* Content */}
      <div className="flex min-h-dvh flex-col justify-center px-5 pt-24 pb-10 md:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-[100px]">

        {/* Left — Text block with constrained width + pill overlay */}
        <div className="relative mb-12 md:mb-16 lg:mb-0">

          <div className="relative w-fit max-w-full md:max-w-[550px] lg:max-w-[614px]">

            <img
              src="/images/pill.svg"
              alt=""
              className="pointer-events-none absolute -right-2 -top4 z-[1] h-[93px] w-[95px] md:-right-4 md:-top-8 md:h-[175px] md:w-[179px]"
            />

            
            <h1 className="relative text-[28px] font-bold leading-[1.15] text-text md:text-[40px] lg:text-[54px]">
              Your medication, delivered Say goodbye to all{' '}
              <span className="text-primary">your healthcare</span>{' '}
              worries with us
            </h1>
          </div>
        </div>

        {/* Right — Form */}
        <div className="w-full md:max-w-[300px] lg:w-[323px] lg:shrink-0">
          {children}
        </div>
      </div>

      {/* Decorative pills — bottom right */}
      <img
        src="/images/pills-decor.svg"
        alt=""
        width={279}
        height={257}
        className="pointer-events-none absolute -bottom-2 -right-2 z-0 md:bottom-0 md:right-0"
      />
    </main>
  );
}
