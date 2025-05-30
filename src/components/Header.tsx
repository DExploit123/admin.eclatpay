
import { Search, Bell, Settings, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome back! Here's what's happening with your business today.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Search anything..." 
              className="pl-10 w-80 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </Button>
          
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-blue-500 text-white">JD</AvatarFallback>
            </Avatar>
            <div className="text-sm">
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
