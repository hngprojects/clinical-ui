import overviewMock from '@/mocks/doctor/overview.json';

interface CaseRequest {
  id: string;
  patientName: string;
  avatar: string;
  timeSent: string;
  priority: string;
  condition: string;
}

interface Case {
  id: string;
  patientName: string;
  avatar: string;
  timeAssigned: string;
  status: string;
  condition: string;
}

export interface Overview {
  summary: {
    newRequests: number;
    activeCases: number;
    completedCases: number;
    earnings: number;
    earningsChange: number;
  };
  caseRequests: CaseRequest[];
  cases: Case[];
}

export async function getOverview() {
  const {
    caseRequests = [],
    cases = [],
    summary: baseSummary = { earnings: 0, earningsChange: 0 },
  } = overviewMock as Overview;

  const newRequests = caseRequests.length;
  const activeCases = cases.filter((c: Case) => c.status === 'Pending').length;
  const completedCases = cases.filter((c: Case) => c.status === 'Completed').length;

  const computed = {
    ...overviewMock,
    summary: {
      newRequests,
      activeCases,
      completedCases,
      earnings: baseSummary.earnings,
      earningsChange: baseSummary.earningsChange,
    },
  };

  return new Promise((resolve) => setTimeout(() => resolve(computed), 10));
}

export function getActiveCases(): Promise<Case[]> {
  const { cases = [] } = overviewMock as Overview;
  const active = cases.filter((c: Case) => c.status === 'Pending');
  return new Promise((resolve) => setTimeout(() => resolve(active), 10));
}

export function getCompletedCases(): Promise<Case[]> {
  const { cases = [] } = overviewMock as Overview;
  const completed = cases.filter((c: Case) => c.status === 'Completed');
  return new Promise((resolve) => setTimeout(() => resolve(completed), 10));
}

export function getCaseRequests(): Promise<CaseRequest[]> {
  const { caseRequests = [] } = overviewMock as Overview;
  return new Promise((resolve) => setTimeout(() => resolve(caseRequests), 10));
}

export function getCaseById(id: string): Promise<Case | undefined> {
  const { cases = [] } = overviewMock as Overview;
  const found = cases.find((c: Case) => c.id === id);
  return new Promise((resolve) => setTimeout(() => resolve(found), 10));
}
