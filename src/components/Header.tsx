
import { Search, Bell, Settings, User, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from '@/components/ui/drawer';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  CreditCard, 
  FileText, 
  Home,
  UserCheck,
  Activity,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', icon: Home, href: '/dashboard' },
    { name: 'Agents', icon: UserCheck, href: '/agents' },
    { name: 'Customers', icon: Users, href: '/customers' },
    { name: 'Transactions', icon: CreditCard, href: '/transactions' },
    { name: 'Reports', icon: FileText, href: '/reports' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 lg:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 lg:gap-0">
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[90vh]">
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <img 
                        src="/lovable-uploads/3b0bd8fb-948b-41b7-aab2-f5d699ddf613.png" 
                        alt="EclatPay" 
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-gray-900">EclatPay</h1>
                      <p className="text-gray-500 text-sm">Business Dashboard</p>
                    </div>
                  </div>
                  <DrawerClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="w-5 h-5" />
                    </Button>
                  </DrawerClose>
                </div>
                
                <nav className="space-y-2">
                  {menuItems.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsDrawerOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                          isActive
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg" 
                            : "hover:bg-gray-100 text-gray-700"
                        )}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>
                
                <div className="mt-8 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Activity className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">System Status</p>
                      <p className="text-xs text-green-600">All systems operational</p>
                    </div>
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
          
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 text-xs lg:text-sm hidden sm:block">Welcome back! Here's what's happening with your business today.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 lg:gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Search anything..." 
              className="pl-10 w-60 lg:w-80 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 lg:w-3 lg:h-3 bg-red-500 rounded-full"></span>
          </Button>
          
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Settings className="w-4 h-4 lg:w-5 lg:h-5" />
          </Button>
          
          <div className="flex items-center gap-2 lg:gap-3 pl-2 lg:pl-4 border-l border-gray-200">
            <Avatar className="w-8 h-8 lg:w-10 lg:h-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-blue-500 text-white text-xs lg:text-sm">JD</AvatarFallback>
            </Avatar>
            <div className="text-xs lg:text-sm hidden sm:block">
              <p className="font-medium text-gray-900">John Doe</p>
              <p className="text-gray-500">Business Owner</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
