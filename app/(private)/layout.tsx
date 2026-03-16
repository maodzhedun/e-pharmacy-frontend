import Header from '@/components/Header/Header';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <main className="ml-[72px] p-5 md:ml-[80px] md:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
