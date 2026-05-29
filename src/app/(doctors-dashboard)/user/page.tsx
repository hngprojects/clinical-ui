import { getOverview } from '@/services/doctor/service';

export default async function OverviewPage() {
  const overview = await getOverview();
  
  console.log('overview (mock):', overview);

  return <div>Doctor&apos;s page</div>;
}
