export interface AuditEntry {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  notes?: string;
  requestId?: string;
  decision?: string;
}

export interface RequestData {
  id: string;
  title: string;
  requesterName: string;
  requesterEmail: string;
  category: string;
  department: string;
  urgency: 'low' | 'medium' | 'high';
  description: string;
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  status: 'pending' | 'auto_approved' | 'approved' | 'rejected' | 'escalated';
  submittedAt: string;
  aiSummary?: string;
  auditHistory?: AuditEntry[];
}

export const mockRequests: RequestData[] = [
  {
    id: 'REQ-1001',
    title: 'Room booking for meeting',
    requesterName: 'John Smith',
    requesterEmail: 'john.smith@engineering.com',
    category: 'Room Booking',
    department: 'Engineering',
    urgency: 'medium',
    description: 'Requesting room 201 for team planning meeting.',
    riskScore: 18,
    riskLevel: 'low',
    status: 'auto_approved',
    submittedAt: '2026-03-05T09:00:00Z',
    aiSummary: 'Standard room booking request. No conflicts detected.',
    auditHistory: [
      { id: 'a1', timestamp: '2026-03-05T09:00:00Z', action: 'request_submitted', actor: 'John Smith' },
      { id: 'a2', timestamp: '2026-03-05T09:00:05Z', action: 'risk_scored', actor: 'AI Agent', notes: 'Score: 18' },
      { id: 'a3', timestamp: '2026-03-05T09:00:06Z', action: 'auto_approved', actor: 'System' },
    ]
  },
  {
    id: 'REQ-1002',
    title: 'Production Database Access',
    requesterName: 'Alice Johnson',
    requesterEmail: 'alice@example.com',
    category: 'IT Access',
    department: 'Engineering',
    urgency: 'high',
    description: 'Urgent access to production DB for hotfix deployment.',
    riskScore: 82,
    riskLevel: 'high',
    status: 'escalated',
    submittedAt: '2026-03-05T10:30:00Z',
    aiSummary: 'High-risk access requested to critical infrastructure.',
    auditHistory: [
      { id: 'b1', timestamp: '2026-03-05T10:30:00Z', action: 'request_submitted', actor: 'Alice Johnson' },
      { id: 'b2', timestamp: '2026-03-05T10:30:10Z', action: 'risk_scored', actor: 'AI Agent', notes: 'Score: 82' },
      { id: 'b3', timestamp: '2026-03-05T10:30:11Z', action: 'escalated', actor: 'System' },
    ]
  },
  {
    id: 'REQ-1003',
    title: 'New Monitor Purchase',
    requesterName: 'Bob Wilson',
    requesterEmail: 'bob@example.com',
    category: 'Budget Approval',
    department: 'Design',
    urgency: 'low',
    description: 'Requesting budget for a 4K monitor for design work.',
    riskScore: 35,
    riskLevel: 'medium',
    status: 'pending',
    submittedAt: '2026-03-06T08:15:00Z',
    aiSummary: 'Moderate budget request. Requires departmental approval.',
    auditHistory: [
      { id: 'c1', timestamp: '2026-03-06T08:15:00Z', action: 'request_submitted', actor: 'Bob Wilson' },
      { id: 'c2', timestamp: '2026-03-06T08:15:12Z', action: 'risk_scored', actor: 'AI Agent', notes: 'Score: 35' },
    ]
  },
  {
    id: 'REQ-1004',
    title: 'Marketing Event Hall Booking',
    requesterName: 'Sarah Connor',
    requesterEmail: 'sarah@marketing.com',
    category: 'Event Approval',
    department: 'Marketing',
    urgency: 'medium',
    description: 'Booking main hall for Q2 product launch.',
    riskScore: 55,
    riskLevel: 'medium',
    status: 'approved',
    submittedAt: '2026-03-04T14:00:00Z',
    aiSummary: 'Large scale event. Risk is moderate due to resource allocation.',
    auditHistory: [
      { id: 'd1', timestamp: '2026-03-04T14:00:00Z', action: 'request_submitted', actor: 'Sarah Connor' },
      { id: 'd2', timestamp: '2026-03-04T14:00:15Z', action: 'risk_scored', actor: 'AI Agent' },
      { id: 'd3', timestamp: '2026-03-04T16:30:00Z', action: 'approved', actor: 'Admin Jane', notes: 'Approved after checking calendar.' },
    ]
  }
];

export const activityLogs: AuditEntry[] = [
  { id: 'l1', timestamp: '2026-03-06T08:15:12Z', action: 'risk_scored', actor: 'AI Agent', requestId: 'REQ-1003', decision: 'N/A', notes: 'Score: 35' },
  { id: 'l2', timestamp: '2026-03-06T08:15:00Z', action: 'request_submitted', actor: 'Bob Wilson', requestId: 'REQ-1003', decision: 'N/A' },
  { id: 'l3', timestamp: '2026-03-05T10:30:11Z', action: 'escalated', actor: 'System', requestId: 'REQ-1002', decision: 'Escalated' },
  { id: 'l4', timestamp: '2026-03-05T10:30:10Z', action: 'risk_scored', actor: 'AI Agent', requestId: 'REQ-1002', decision: 'N/A', notes: 'Score: 82' },
  { id: 'l5', timestamp: '2026-03-05T10:30:00Z', action: 'request_submitted', actor: 'Alice Johnson', requestId: 'REQ-1002', decision: 'N/A' },
  { id: 'l6', timestamp: '2026-03-05T09:00:06Z', action: 'auto_approved', actor: 'System', requestId: 'REQ-1001', decision: 'Approved' },
  { id: 'l7', timestamp: '2026-03-05T09:00:05Z', action: 'risk_scored', actor: 'AI Agent', requestId: 'REQ-1001', decision: 'N/A', notes: 'Score: 18' },
  { id: 'l8', timestamp: '2026-03-05T09:00:00Z', action: 'request_submitted', actor: 'John Smith', requestId: 'REQ-1001', decision: 'N/A' },
];

export const dashboardStats = {
  totalRequests: 124,
  autoApproved: 86,
  pendingReview: 24,
  escalated: 14,
  riskDistribution: {
    low: 70,
    medium: 40,
    high: 14,
  }
};
