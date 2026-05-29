import Header from './Header';
import Sidebar from './Sidebar';

export default function DashboardLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: 'Doctor';
}) {
  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar user={user} />

      <div className="flex flex-col flex-1 overflow-hidden bg-yellow-100">
        <Header user={user} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
