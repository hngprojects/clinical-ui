import overviewMock from '@/mocks/doctor/overview.json';

export async function getOverview() {
  return new Promise((resolve) => setTimeout(() => resolve(overviewMock), 10));
}
