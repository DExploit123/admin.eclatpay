
import { ArrowLeft, Users, DollarSign, TrendingUp } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const AgentDetails = () => {
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
      
      <div className="ml-64">
        <Header />
        
        <main className="p-6">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            className="mb-6 text-blue-600 hover:text-blue-700"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Agents
          </Button>

          {/* Agent Header */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-blue-500 text-white text-2xl">
                    {agent.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{agent.name}</h1>
                    <Badge 
                      variant="default"
                      className="bg-green-100 text-green-800"
                    >
                      {agent.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600">Agent ID: {agent.id}</p>
                  <p className="text-gray-600">{agent.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Customers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <Users className="w-8 h-8 text-blue-500" />
                      <span className="text-3xl font-bold text-gray-900">{agent.totalCustomers}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Savings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-8 h-8 text-green-500" />
                      <span className="text-3xl font-bold text-gray-900">{agent.totalSavings}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600">Average Savings per Customer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-8 h-8 text-purple-500" />
                      <span className="text-3xl font-bold text-gray-900">{agent.averageSavings}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Transactions */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 font-medium text-gray-600">Date</th>
                          <th className="text-left py-3 font-medium text-gray-600">Customer</th>
                          <th className="text-left py-3 font-medium text-gray-600">Amount</th>
                          <th className="text-left py-3 font-medium text-gray-600">Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentTransactions.map((transaction, index) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="py-3 text-gray-600">{transaction.date}</td>
                            <td className="py-3 text-blue-600 hover:underline cursor-pointer">
                              {transaction.customer}
                            </td>
                            <td className="py-3 font-semibold text-gray-900">{transaction.amount}</td>
                            <td className="py-3">
                              <Badge 
                                variant={transaction.type === 'Deposit' ? 'default' : 'secondary'}
                                className={transaction.type === 'Deposit' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-orange-100 text-orange-800'
                                }
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
                  <CardTitle>All Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Complete transaction history will be displayed here...</p>
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
