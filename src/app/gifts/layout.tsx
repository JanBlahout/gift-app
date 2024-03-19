export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="container mx-auto pt-12 min-h-screen">
      <div className="flex gap-8">
        <div className="w-full">{children}</div>
      </div>
    </main>
  );
}
