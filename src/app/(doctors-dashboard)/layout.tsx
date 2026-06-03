import DashboardLayout from '@/layout/layout';

export default function DoctorsDashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout user="Doctor">{children}</DashboardLayout>;
}
