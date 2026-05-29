function SummaryCard() {
  return (
    <div className="h-33 rounded-[20px] p-5 bg-[#FFFFFE] border border-[#F0F0F0]">SummaryCard</div>
  );
}

export default function Summary() {
  return (
    <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      <SummaryCard />
      <SummaryCard />
      <SummaryCard />
      <SummaryCard />
    </div>
  );
}
