import { Summary } from '@/components/doctor/overview';
import { getOverview } from '@/services/doctor/service';

export default async function OverviewPage() {
  const overview = await getOverview();

  console.log('overview (mock):', overview);

  return (
    <div className="flex flex-col gap-5 pt-5 pb-10 px-2.5">
      <Summary />
    </div>
  );
}
