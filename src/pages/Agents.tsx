
import { Search, MapPin, Users, DollarSign, Activity } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface Agent {
  id: string;
  name: string;
  location: string;
  customerCount: number;
  savings: string;
  status: 'Active' | 'Inactive';
}

const Agents = () => {
  const agents: Agent[] = [
    {
      id: '12345',
      name: 'Ethan Harper',
      location: 'New York',
      customerCount: 120,
      savings: '$50,000',
      status: 'Active'
    },
    {
      id: '12346',
      name: 'Olivia Bennett',
      location: 'Los Angeles',
      customerCount: 150,
      savings: '$75,000',
      status: 'Active'
    },
    {
      id: '12347',
      name: 'Noah Carter',
      location: 'Chicago',
      customerCount: 80,
      savings: '$30,000',
      status: 'Inactive'
    },
    {
      id: '12348',
      name: 'Ava Mitchell',
      location: 'Houston',
      customerCount: 200,
      savings: '$100,000',
      status: 'Active'
    },
    {
      id: '12349',
      name: 'Liam Foster',
      location: 'Miami',
      customerCount: 100,
      savings: '$40,000',
      status: 'Active'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeItem="Agents" />
      
      <div className="ml-64">
        <Header />
        
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Agents</h1>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search agents..." 
                className="pl-10 bg-blue-50 border-blue-200 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Agents Table */}
          <Card className="mb-8">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-4 px-6 font-medium text-gray-600">Agent Name</th>
                      <th className="text-left py-4 px-6 font-medium text-gray-600">Location</th>
                      <th className="text-left py-4 px-6 font-medium text-gray-600">Customer Count</th>
                      <th className="text-left py-4 px-6 font-medium text-gray-600">Savings</th>
                      <th className="text-left py-4 px-6 font-medium text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agents.map((agent) => (
                      <tr 
                        key={agent.id} 
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => window.location.href = `/agents/${agent.id}`}
                      >
                        <td className="py-4 px-6 text-blue-600 hover:underline font-medium">
                          {agent.name}
                        </td>
                        <td className="py-4 px-6 text-blue-600 hover:underline">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {agent.location}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-900 font-medium">
                          {agent.customerCount}
                        </td>
                        <td className="py-4 px-6 text-gray-900 font-semibold">
                          {agent.savings}
                        </td>
                        <td className="py-4 px-6">
                          <Badge 
                            variant={agent.status === 'Active' ? 'default' : 'secondary'}
                            className={agent.status === 'Active' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }
                          >
                            {agent.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Agents;
