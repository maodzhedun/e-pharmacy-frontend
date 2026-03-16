export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-dvh flex-col md:flex-row">
      {/* Left panel - green */}
      <div className="flex items-center bg-primary p-8 md:w-1/2 md:p-12 lg:p-16">
        <div>
          <h1 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
            Your medication, delivered. Say goodbye to all
            <span className="text-white/70"> your healthcare</span> worries with
            us
          </h1>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex flex-1 items-center justify-center bg-bg p-8">
        {children}
      </div>
    </main>
  );
}
