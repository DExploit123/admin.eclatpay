
import { useState } from 'react';
import { Search, MapPin, Users, DollarSign, Activity } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface Agent {
  id: string;
  name: string;
  location: string;
  customerCount: number;
  savings: string;
  status: 'Active' | 'Inactive';
}

const Agents = () => {
  const [searchTerm, setSearchTerm] = useState('');

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

  // Filter agents based on search term
  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeItem="Agents" />
      
      <div className="lg:ml-64">
        <Header />
        
        <main className="p-4 lg:p-6">
          <div className="mb-6 lg:mb-8">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Agents</h1>
          </div>

          {/* Enhanced Search Bar for Mobile */}
          <div className="mb-4 lg:mb-6">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search agents..." 
                className="pl-10 bg-blue-50 border-blue-200 focus:bg-white transition-colors text-sm sm:text-base h-10 sm:h-auto"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {searchTerm && (
              <p className="text-xs sm:text-sm text-gray-600 mt-2">
                {filteredAgents.length} agent{filteredAgents.length !== 1 ? 's' : ''} found
              </p>
            )}
          </div>

          {/* Agents Table */}
          <Card className="mb-6 lg:mb-8">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 lg:py-4 px-4 lg:px-6 font-medium text-gray-600 text-xs sm:text-sm lg:text-base">Agent Name</th>
                      <th className="text-left py-3 lg:py-4 px-4 lg:px-6 font-medium text-gray-600 text-xs sm:text-sm lg:text-base">Location</th>
                      <th className="text-left py-3 lg:py-4 px-4 lg:px-6 font-medium text-gray-600 text-xs sm:text-sm lg:text-base hidden sm:table-cell">Customer Count</th>
                      <th className="text-left py-3 lg:py-4 px-4 lg:px-6 font-medium text-gray-600 text-xs sm:text-sm lg:text-base">Savings</th>
                      <th className="text-left py-3 lg:py-4 px-4 lg:px-6 font-medium text-gray-600 text-xs sm:text-sm lg:text-base">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAgents.map((agent) => (
                      <tr 
                        key={agent.id} 
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 lg:py-4 px-4 lg:px-6">
                          <div>
                            <Link 
                              to={`/agents/${agent.id}`}
                              className="text-blue-600 hover:underline font-medium text-xs sm:text-sm lg:text-base block"
                            >
                              {agent.name}
                            </Link>
                            <p className="text-xs text-gray-500 sm:hidden mt-1">{agent.customerCount} customers</p>
                          </div>
                        </td>
                        <td className="py-3 lg:py-4 px-4 lg:px-6">
                          <Link 
                            to={`/agents/${agent.id}`}
                            className="text-blue-600 hover:underline flex items-center gap-1 text-xs sm:text-sm lg:text-base"
                          >
                            <MapPin className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                            <span className="truncate">{agent.location}</span>
                          </Link>
                        </td>
                        <td className="py-3 lg:py-4 px-4 lg:px-6 text-gray-900 font-medium text-xs sm:text-sm lg:text-base hidden sm:table-cell">
                          {agent.customerCount}
                        </td>
                        <td className="py-3 lg:py-4 px-4 lg:px-6 text-gray-900 font-semibold text-xs sm:text-sm lg:text-base">
                          {agent.savings}
                        </td>
                        <td className="py-3 lg:py-4 px-4 lg:px-6">
                          <Badge 
                            variant={agent.status === 'Active' ? 'default' : 'secondary'}
                            className={`${agent.status === 'Active' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            } text-xs`}
                          >
                            {agent.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredAgents.length === 0 && searchTerm && (
                <div className="p-6 text-center text-gray-500">
                  <p className="text-sm sm:text-base">No agents found matching "{searchTerm}"</p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">Try searching by name, location, or ID</p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Agents;
