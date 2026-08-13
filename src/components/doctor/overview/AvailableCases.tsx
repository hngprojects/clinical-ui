'use client';

import Image from 'next/image';
import Link from 'next/link';

export interface PatientCase {
  id: string;
  patientName: string;
  avatar: string;
  timeSent?: string;
  timeAssigned?: string;
  priority?: string;
  condition: string;
}

function BlueFolderIcon({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 7C3 5.89543 3.89543 5 5 5H9.58579C10.1162 5 10.6249 5.21071 11 5.58579L12.4142 7H19C20.1046 7 21 7.89543 21 9V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7Z"
        fill="#2563EB"
      />
    </svg>
  );
}

function PriorityBadge({ priority, isMobile = false }: { priority?: string; isMobile?: boolean }) {
  const level = priority || 'Medium';

  let colorClasses = 'bg-[#FEF3C7] text-[#D97706]';
  if (level === 'High') {
    colorClasses = 'bg-[#FEE2E2] text-[#DC2626]';
  } else if (level === 'Low') {
    colorClasses = 'bg-[#DCFCE7] text-[#16A34A]';
  }

  const label = isMobile ? `${level} Priority` : level;

  return (
    <span className={`text-xs font-semibold px-3 py-1 rounded-full inline-block ${colorClasses}`}>
      {label}
    </span>
  );
}

export default function AvailableCases({
  cases = [],
  badgeCount,
}: {
  cases?: PatientCase[];
  badgeCount?: string | number;
}) {
  const hasCases = cases.length > 0;
  const countDisplay = badgeCount ?? (hasCases ? `${cases.length}+` : null);

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl md:rounded-[20px] p-5 md:p-6 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#F3F4F6]">
        <div className="flex items-center gap-2.5">
          <h3 className="text-base md:text-lg font-bold text-[#111827]">Available Cases</h3>
          {hasCases && countDisplay && (
            <span className="bg-[#2563EB] text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[24px] text-center inline-flex items-center justify-center">
              {countDisplay}
            </span>
          )}
        </div>
        <Link
          href="/user/case"
          className="text-[#2563EB] hover:text-[#1D4ED8] text-sm font-medium transition-colors"
        >
          View All
        </Link>
      </div>

      {!hasCases ? (
        /* Empty State */
        <div className="flex flex-col items-center text-center py-10 my-2">
          <div className="w-14 h-14 rounded-full bg-[#EBF3FF] flex items-center justify-center mb-3">
            <BlueFolderIcon className="w-7 h-7" />
          </div>
          <h4 className="font-bold text-base md:text-lg text-[#111827]">No Available Cases</h4>
          <p className="text-sm text-[#6B7280] max-w-sm mx-auto mt-1">
            There are no cases in the queue right now. New patient cases will appear here once
            you&apos;re verified.
          </p>
        </div>
      ) : (
        /* Content List */
        <div>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#F3F4F6] text-[11px] font-bold tracking-wider text-[#6B7280] uppercase">
                  <th className="py-3.5 px-3">PATIENTS</th>
                  <th className="py-3.5 px-3">TIME SENT</th>
                  <th className="py-3.5 px-3">PRIORITY</th>
                  <th className="py-3.5 px-3">CONDITION</th>
                  <th className="py-3.5 px-3 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6]">
                {cases.map((item) => (
                  <tr key={item.id} className="hover:bg-[#FAFAFA] transition-colors">
                    {/* Patient */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src={item.avatar || '/assets/dashboard/Chioma.png'}
                          alt={item.patientName}
                          width={38}
                          height={38}
                          className="w-9.5 h-9.5 rounded-full object-cover border border-gray-100 shrink-0"
                        />
                        <span className="font-semibold text-sm text-[#111827]">
                          {item.patientName}
                        </span>
                      </div>
                    </td>

                    {/* Time Sent */}
                    <td className="py-3.5 px-3 text-sm text-[#6B7280]">
                      {item.timeSent || item.timeAssigned || '10 mins ago'}
                    </td>

                    {/* Priority */}
                    <td className="py-3.5 px-3">
                      <PriorityBadge priority={item.priority} />
                    </td>

                    {/* Condition */}
                    <td className="py-3.5 px-3 text-sm font-semibold text-[#111827]">
                      {item.condition}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-3 text-right">
                      <Link
                        href={`/user/case/${item.id}`}
                        className="inline-flex items-center justify-center border border-[#DBEAFE] text-[#2563EB] hover:bg-[#F0F7FF] active:bg-[#E0EEFE] px-4 py-1.5 rounded-xl text-sm font-medium transition-colors"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List View */}
          <div className="block md:hidden flex flex-col gap-3 mt-4">
            {cases.map((item) => (
              <div
                key={item.id}
                className="border border-[#E5E7EB] rounded-2xl p-4 bg-white shadow-2xs flex flex-col gap-3"
              >
                {/* Top Section */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.avatar || '/assets/dashboard/Chioma.png'}
                      alt={item.patientName}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover border border-gray-100 shrink-0"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-[#111827]">{item.patientName}</h4>
                      <span className="text-xs text-[#6B7280]">
                        Sent {item.timeSent || item.timeAssigned || '10 mins ago'}
                      </span>
                    </div>
                  </div>

                  <PriorityBadge priority={item.priority} isMobile />
                </div>

                {/* Divider */}
                <div className="border-t border-[#F3F4F6]" />

                {/* Bottom Section */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#6B7280] block">Condition</span>
                    <span className="font-bold text-sm text-[#111827]">{item.condition}</span>
                  </div>

                  <Link
                    href={`/user/case/${item.id}`}
                    className="inline-flex items-center justify-center border border-[#DBEAFE] text-[#2563EB] hover:bg-[#F0F7FF] px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
                  >
                    View Case
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
