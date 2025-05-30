
import { 
  BarChart3, 
  Users, 
  CreditCard, 
  FileText, 
  Home,
  UserCheck,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeItem?: string;
}

const Sidebar = ({ activeItem = 'Dashboard' }: SidebarProps) => {
  const menuItems = [
    { name: 'Dashboard', icon: Home, href: '/' },
    { name: 'Agents', icon: UserCheck, href: '/agents' },
    { name: 'Customers', icon: Users, href: '/customers' },
    { name: 'Transactions', icon: CreditCard, href: '/transactions' },
    { name: 'Reports', icon: FileText, href: '/reports' },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white h-screen fixed left-0 top-0 z-40 shadow-xl">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <img 
              src="/lovable-uploads/3b0bd8fb-948b-41b7-aab2-f5d699ddf613.png" 
              alt="EclatPay" 
              className="w-10 h-10 object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold">EclatPay</h1>
            <p className="text-slate-400 text-sm">Business Dashboard</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                  activeItem === item.name 
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg" 
                    : "hover:bg-slate-700/50"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 transition-transform group-hover:scale-110",
                  activeItem === item.name ? "text-white" : "text-slate-300"
                )} />
                <span className={cn(
                  "font-medium",
                  activeItem === item.name ? "text-white" : "text-slate-300"
                )}>
                  {item.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-6 left-4 right-4">
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-sm font-medium">System Status</p>
              <p className="text-xs text-green-400">All systems operational</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
