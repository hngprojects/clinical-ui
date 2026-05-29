import { Overview } from '@/services/doctor';
import Table from './Table';

export default function Cases({ overview }: { overview: Overview | null }) {
  const cases = overview?.cases ?? [];

  return (
    <div>
      <div className="flex items-center justify-between bg-white p-5 rounded-t-[20px] border border-[#F0F0F0]">
        <h3 className="text-lg md:text-xl font-medium">Cases</h3>
        <span className="text-sm text-[#1565C0] hover:underline cursor-pointer">View All</span>
      </div>

      <Table variant="cases" items={cases} />
    </div>
  );
}
