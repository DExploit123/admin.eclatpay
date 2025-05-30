
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Download } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  location: string;
  lastActivity: string;
  status: 'Active' | 'Inactive';
}

const AgentActivityTable = () => {
  const agents: Agent[] = [
    { id: '1', name: 'Agent 1', location: 'City A', lastActivity: '2 hours ago', status: 'Active' },
    { id: '2', name: 'Agent 2', location: 'City B', lastActivity: '1 day ago', status: 'Inactive' },
    { id: '3', name: 'Agent 3', location: 'City C', lastActivity: '3 hours ago', status: 'Active' },
    { id: '4', name: 'Agent 4', location: 'City D', lastActivity: '2 days ago', status: 'Inactive' },
    { id: '5', name: 'Agent 5', location: 'City E', lastActivity: '5 hours ago', status: 'Active' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Agent Activity</h2>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="Search agents..." className="pl-10" />
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-500">Agent</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Location</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Last Activity</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4 font-medium text-gray-900">{agent.name}</td>
                <td className="py-4 px-4 text-gray-600">{agent.location}</td>
                <td className="py-4 px-4 text-gray-600">{agent.lastActivity}</td>
                <td className="py-4 px-4">
                  <Badge 
                    variant={agent.status === 'Active' ? 'default' : 'secondary'}
                    className={agent.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                  >
                    {agent.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentActivityTable;
