
import { Search, Bell, Settings, User, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 lg:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 lg:gap-0">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="w-5 h-5" />
          </Button>
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
