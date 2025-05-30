
import { ArrowLeft, Users, DollarSign, TrendingUp } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const AgentDetails = () => {
  const navigate = useNavigate();
  
  const agent = {
    id: '12345',
    name: 'Ethan Harper',
    location: 'New York',
    totalCustomers: 120,
    totalSavings: '$50,000',
    averageSavings: '$416.67',
    status: 'Active'
  };

  const recentTransactions = [
    {
      date: '2024-01-15',
      customer: 'Sophia Clark',
      amount: '$500',
      type: 'Deposit'
    },
    {
      date: '2024-01-10',
      customer: 'Daniel Evans',
      amount: '$200',
      type: 'Withdrawal'
    },
    {
      date: '2024-01-05',
      customer: 'Chloe Green',
      amount: '$300',
      type: 'Deposit'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeItem="Agents" />
      
      <div className="lg:ml-64">
        <Header />
        
        <main className="p-4 lg:p-6">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            className="mb-4 lg:mb-6 text-blue-600 hover:text-blue-700"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Agents
          </Button>

          {/* Agent Header */}
          <Card className="mb-6 lg:mb-8">
            <CardContent className="p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6">
                <Avatar className="w-16 h-16 lg:w-20 lg:h-20">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-blue-500 text-white text-lg lg:text-2xl">
                    {agent.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 lg:gap-3 mb-2">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{agent.name}</h1>
                    <Badge 
                      variant="default"
                      className="bg-green-100 text-green-800 w-fit"
                    >
                      {agent.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm lg:text-base">Agent ID: {agent.id}</p>
                  <p className="text-gray-600 text-sm lg:text-base">{agent.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-4 lg:mb-6 w-full sm:w-auto">
              <TabsTrigger value="overview" className="flex-1 sm:flex-none">Overview</TabsTrigger>
              <TabsTrigger value="transactions" className="flex-1 sm:flex-none">Transactions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4 lg:space-y-6">
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                <Card>
                  <CardHeader className="pb-2 lg:pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Customers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 lg:gap-3">
                      <Users className="w-6 h-6 lg:w-8 lg:h-8 text-blue-500" />
                      <span className="text-2xl lg:text-3xl font-bold text-gray-900">{agent.totalCustomers}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2 lg:pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Savings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 lg:gap-3">
                      <DollarSign className="w-6 h-6 lg:w-8 lg:h-8 text-green-500" />
                      <span className="text-2xl lg:text-3xl font-bold text-gray-900">{agent.totalSavings}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2 lg:pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600">Average Savings per Customer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 lg:gap-3">
                      <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 text-purple-500" />
                      <span className="text-2xl lg:text-3xl font-bold text-gray-900">{agent.averageSavings}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Transactions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg lg:text-xl">Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[480px]">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 lg:py-3 font-medium text-gray-600 text-sm lg:text-base">Date</th>
                          <th className="text-left py-2 lg:py-3 font-medium text-gray-600 text-sm lg:text-base">Customer</th>
                          <th className="text-left py-2 lg:py-3 font-medium text-gray-600 text-sm lg:text-base">Amount</th>
                          <th className="text-left py-2 lg:py-3 font-medium text-gray-600 text-sm lg:text-base">Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentTransactions.map((transaction, index) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="py-2 lg:py-3 text-gray-600 text-sm lg:text-base">{transaction.date}</td>
                            <td className="py-2 lg:py-3 text-blue-600 hover:underline cursor-pointer text-sm lg:text-base">
                              {transaction.customer}
                            </td>
                            <td className="py-2 lg:py-3 font-semibold text-gray-900 text-sm lg:text-base">{transaction.amount}</td>
                            <td className="py-2 lg:py-3">
                              <Badge 
                                variant={transaction.type === 'Deposit' ? 'default' : 'secondary'}
                                className={`${transaction.type === 'Deposit' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-orange-100 text-orange-800'
                                } text-xs lg:text-sm`}
                              >
                                {transaction.type}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="transactions">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg lg:text-xl">All Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm lg:text-base">Complete transaction history will be displayed here...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AgentDetails;
