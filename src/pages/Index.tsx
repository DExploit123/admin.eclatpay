
import { Users, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import MetricCard from '@/components/MetricCard';
import AgentActivityTable from '@/components/AgentActivityTable';
import RecentDepositsTable from '@/components/RecentDepositsTable';

const Index = () => {
  const metrics = [
    {
      title: 'Total Agents',
      value: '1,234',
      change: '+10%',
      changeType: 'positive' as const,
      icon: Users,
      gradient: 'bg-gradient-to-br from-blue-500 to-blue-600',
      href: '/agents'
    },
    {
      title: 'Total Customers',
      value: '5,678',
      change: '+5%',
      changeType: 'positive' as const,
      icon: Users,
      gradient: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
    {
      title: 'Total Savings',
      value: '$123,456',
      change: '+15%',
      changeType: 'positive' as const,
      icon: DollarSign,
      gradient: 'bg-gradient-to-br from-green-500 to-green-600'
    },
    {
      title: 'Flagged Transactions',
      value: '23',
      change: '-2%',
      changeType: 'negative' as const,
      icon: AlertTriangle,
      gradient: 'bg-gradient-to-br from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeItem="Dashboard" />
      
      <div className="lg:ml-64">
        <Header />
        
        <main className="p-4 lg:p-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
            {metrics.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>
          
          {/* Tables */}
          <div className="space-y-6 lg:space-y-8">
            <AgentActivityTable />
            <RecentDepositsTable />
          </div>
        </main>
      </div>
      
      {/* Mobile overlay for sidebar */}
      <div className="lg:hidden fixed inset-0 bg-black/20 z-30 hidden" id="sidebar-overlay"></div>
    </div>
  );
};

export default Index;
