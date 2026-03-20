import Header from '@/components/Header/Header';

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <main className="fluid-px p-4 sm:p-5 lg:ml-[72px] md:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
