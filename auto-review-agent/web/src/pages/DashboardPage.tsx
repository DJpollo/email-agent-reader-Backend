import { useNavigate } from 'react-router-dom';
import { FileText, CheckCircle2, Clock, AlertTriangle, Plus, ListFilter, History, TrendingUp } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Table } from '../components/ui/Table';
import { useRequests, useDashboardStats } from '../hooks/useSupabase';
import { Request } from '../lib/supabase';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { requests, loading: reqLoading } = useRequests();
  const { stats, loading: statsLoading } = useDashboardStats();

  const statCards = [
    { title: 'Total Requests', value: stats.totalRequests, icon: FileText, color: 'bg-blue-500', accent: 'border-blue-500', trend: 'All time' },
    { title: 'Auto-Approved', value: stats.autoApproved, icon: CheckCircle2, color: 'bg-green-500', accent: 'border-green-500', trend: 'AI approved' },
    { title: 'Pending Review', value: stats.pendingReview, icon: Clock, color: 'bg-amber-500', accent: 'border-amber-500', trend: 'Awaiting action' },
    { title: 'Escalated', value: stats.escalated, icon: AlertTriangle, color: 'bg-red-500', accent: 'border-red-500', trend: 'Needs attention' },
  ];

  const columns = [
    { header: 'Request Title', accessor: (req: Request) => (<div className="flex flex-col"><span className="font-medium text-primary-dark">{req.title}</span><span className="text-xs text-muted">#{req.id}</span></div>) },
    { header: 'Requester', accessor: (req: Request) => req.requester_name || req.requester_email || '—' },
    { header: 'Category', accessor: 'category' },
    { header: 'Risk Score', accessor: (req: Request) => (<div className="flex items-center gap-3"><div className="flex-1 h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full rounded-full ${req.risk_level === 'low' ? 'bg-success' : req.risk_level === 'medium' ? 'bg-warning' : 'bg-danger'}`} style={{ width: `${req.risk_score ?? 0}%` }} /></div><span className={`text-xs font-bold ${req.risk_level === 'low' ? 'text-success' : req.risk_level === 'medium' ? 'text-warning' : 'text-danger'}`}>{req.risk_score ?? '—'}</span></div>) },
    { header: 'Status', accessor: (req: Request) => { const v: Record<string, any> = { pending: { label: 'Pending', variant: 'warning' }, auto_approved: { label: 'Auto-Approved', variant: 'success' }, approved: { label: 'Approved', variant: 'success' }, rejected: { label: 'Rejected', variant: 'danger' }, escalated: { label: 'Escalated', variant: 'danger' } }; const c = v[req.status] || { label: req.status, variant: 'neutral' }; return <Badge variant={c.variant}>{c.label}</Badge>; } },
    { header: 'Submitted', accessor: (req: Request) => new Date(req.submitted_at).toLocaleDateString() },
  ];

  const total = stats.riskDistribution.low + stats.riskDistribution.medium + stats.riskDistribution.high || 1;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <Card key={idx} className={`relative overflow-hidden border-l-4 ${stat.accent} hover:translate-y-[-2px] transition-transform cursor-default`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold text-primary-dark">{statsLoading ? '—' : stat.value}</h3>
              </div>
              <div className={`${stat.color} p-2 rounded-lg text-white`}><stat.icon className="w-5 h-5" /></div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs text-muted"><TrendingUp className="w-3 h-3 text-success" /><span>{stat.trend}</span></div>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card title="Recent Requests" subtitle="Latest approval submissions">
            {reqLoading ? <div className="py-12 text-center text-muted">Loading...</div> : requests.length === 0 ? <div className="py-12 text-center text-muted">No requests yet. They'll appear here once emails come in.</div> : (
              <div className="-mx-6 -mb-6">
                <Table columns={columns} data={requests.slice(0, 5)} onRowClick={(req) => navigate(`/request/${req.id}`)} />
                <div className="p-4 border-t border-border flex justify-center"><Button variant="ghost" size="sm" className="text-accent-blue" onClick={() => navigate('/queue')}>View all requests</Button></div>
              </div>
            )}
          </Card>
        </div>
        <div className="space-y-8">
          <Card title="Risk Distribution" subtitle="AI analysis breakdown">
            <div className="space-y-4 mt-2">
              {[{ label: 'Low Risk', count: stats.riskDistribution.low, color: 'bg-success' }, { label: 'Medium Risk', count: stats.riskDistribution.medium, color: 'bg-warning' }, { label: 'High Risk', count: stats.riskDistribution.high, color: 'bg-danger' }].map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-sm"><span className="font-medium text-primary-dark">{item.label}</span><span className="text-muted">{item.count}</span></div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden"><div className={`h-full rounded-full ${item.color}`} style={{ width: `${(item.count / total) * 100}%` }} /></div>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Quick Actions">
            <div className="grid grid-cols-1 gap-3">
              <Button onClick={() => navigate('/submit')} className="w-full justify-start gap-3" variant="outline"><Plus className="w-4 h-4 text-accent-blue" />Submit New Request</Button>
              <Button onClick={() => navigate('/queue')} className="w-full justify-start gap-3" variant="outline"><ListFilter className="w-4 h-4 text-amber-500" />Review Pending Queue</Button>
              <Button onClick={() => navigate('/activity')} className="w-full justify-start gap-3" variant="outline"><History className="w-4 h-4 text-slate-500" />View Activity Logs</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
