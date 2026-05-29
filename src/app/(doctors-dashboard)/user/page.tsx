import { Summary } from '@/components/doctor/overview';
import { getOverview, Overview } from '@/services/doctor';

export default async function OverviewPage() {
  const overview = await getOverview();

  console.log('overview (mock):', overview);

  return (
    <div className="flex flex-col gap-5 pt-2.5 pb-10 px-2.5">
      <Summary overview={overview as Overview} />
    </div>
  );
}
