import DashboardLayout from '@/layout/layout';
import { AuthGuard } from '@/components/auth/AuthGuard';

export default function DoctorsDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={['doctor']}>
      <DashboardLayout user="Doctor">{children}</DashboardLayout>
    </AuthGuard>
  );
}
