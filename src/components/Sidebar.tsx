
import { 
  BarChart3, 
  Users, 
  CreditCard, 
  FileText, 
  Home,
  UserCheck,
  Activity
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeItem?: string;
}

const Sidebar = ({ activeItem }: SidebarProps) => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', icon: Home, href: '/dashboard' },
    { name: 'Agents', icon: UserCheck, href: '/agents' },
    { name: 'Customers', icon: Users, href: '/customers' },
    { name: 'Transactions', icon: CreditCard, href: '/transactions' },
    { name: 'Reports', icon: FileText, href: '/reports' },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white h-screen fixed left-0 top-0 z-40 shadow-xl lg:block hidden">
      <div className="p-4 lg:p-6 border-b border-slate-700">
        <div className="flex items-center gap-2 lg:gap-3">
          <div className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center">
            <img 
              src="/lovable-uploads/3b0bd8fb-948b-41b7-aab2-f5d699ddf613.png" 
              alt="EclatPay" 
              className="w-8 h-8 lg:w-10 lg:h-10 object-contain"
            />
          </div>
          <div>
            <h1 className="text-lg lg:text-xl font-bold">EclatPay</h1>
            <p className="text-slate-400 text-xs lg:text-sm">Business Dashboard</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6 lg:mt-8 px-3 lg:px-4">
        <ul className="space-y-1 lg:space-y-2">
          {menuItems.map((item) => {
            const isActive = activeItem === item.name || location.pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-all duration-200 group",
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg" 
                      : "hover:bg-slate-700/50"
                  )}
                >
                  <item.icon className={cn(
                    "w-4 h-4 lg:w-5 lg:h-5 transition-transform group-hover:scale-110",
                    isActive ? "text-white" : "text-slate-300"
                  )} />
                  <span className={cn(
                    "font-medium text-sm lg:text-base",
                    isActive ? "text-white" : "text-slate-300"
                  )}>
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="absolute bottom-4 lg:bottom-6 left-3 lg:left-4 right-3 lg:right-4">
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg p-3 lg:p-4">
          <div className="flex items-center gap-2 lg:gap-3">
            <Activity className="w-6 h-6 lg:w-8 lg:h-8 text-blue-400" />
            <div>
              <p className="text-xs lg:text-sm font-medium">System Status</p>
              <p className="text-xs text-green-400">All systems operational</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
