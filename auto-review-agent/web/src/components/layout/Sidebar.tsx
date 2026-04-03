import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  ListTodo, 
  History, 
  Activity, 
  BarChart3,
  LogOut,
  ShieldCheck
} from 'lucide-react';

const navLinks = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Submit Request', path: '/submit', icon: PlusCircle },
  { name: 'Approval Queue', path: '/queue', icon: ListTodo, adminOnly: true },
  { name: 'My Requests', path: '/my-requests', icon: History },
  { name: 'Activity Log', path: '/activity', icon: Activity },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-primary-dark text-white flex flex-col z-30">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-accent-blue rounded-lg flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-lg font-bold tracking-tight">Auto-Review</h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
              ${isActive 
                ? 'bg-accent-blue text-white' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'}
            `}
          >
            <link.icon className="w-5 h-5" />
            {link.name}
            {link.adminOnly && (
              <span className="ml-auto text-[10px] bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded uppercase font-bold">
                Admin
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-slate-500 truncate">Administrator</p>
          </div>
        </div>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
