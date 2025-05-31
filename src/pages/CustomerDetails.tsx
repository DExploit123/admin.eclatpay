
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, Calendar, DollarSign, User, Activity, Download } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CustomerDetails = () => {
  const { id } = useParams();

  // Mock customer data
  const customer = {
    id: 'CUST002',
    name: 'Olivia Carter',
    phone: '+1 (555) 987-6543',
    email: 'olivia.carter@example.com',
    balance: '$750',
    agent: 'Ava Thompson',
    joinDate: '2023-08-15',
    lastActivity: '2023-11-14',
    status: 'Active',
    address: '123 Main Street, Springfield, IL 62701'
  };

  const transactions = [
    { date: '2023-11-14', amount: '$250', type: 'Deposit', agent: 'Ava Thompson' },
    { date: '2023-11-07', amount: '$150', type: 'Deposit', agent: 'Ava Thompson' },
    { date: '2023-10-30', amount: '$100', type: 'Deposit', agent: 'Ava Thompson' },
    { date: '2023-10-23', amount: '$150', type: 'Deposit', agent: 'Ava Thompson' },
    { date: '2023-10-16', amount: '$50', type: 'Deposit', agent: 'Ava Thompson' }
  ];

  const activities = [
    { date: '2023-11-14', action: 'Deposit Made', description: 'Customer made a deposit of $250', agent: 'Ava Thompson' },
    { date: '2023-11-10', action: 'Profile Updated', description: 'Contact information updated', agent: 'System' },
    { date: '2023-11-07', action: 'Deposit Made', description: 'Customer made a deposit of $150', agent: 'Ava Thompson' },
    { date: '2023-11-05', action: 'Account Review', description: 'Regular account review completed', agent: 'Ava Thompson' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="lg:ml-64">
        <Header />
        
        <main className="p-4 lg:p-6">
          {/* Header */}
          <div className="mb-6 lg:mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link to="/customers">
                <Button variant="ghost" size="sm" className="flex items-center gap-2 text-sm">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Back to Customers</span>
                  <span className="sm:hidden">Back</span>
                </Button>
              </Link>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Customer Details</h1>
            <p className="text-gray-600 text-sm lg:text-base">Complete customer information and transaction history</p>
          </div>

          {/* Customer Info Card */}
          <Card className="mb-6 lg:mb-8">
            <CardContent className="p-4 lg:p-6">
              <div className="flex flex-col gap-4 lg:gap-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Avatar className="w-16 h-16 lg:w-20 lg:h-20 self-center sm:self-start">
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-xl lg:text-2xl font-bold">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center sm:text-left">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{customer.name}</h2>
                    <p className="text-gray-600 text-sm lg:text-base">{customer.id}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                      customer.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {customer.status}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium text-sm lg:text-base truncate">{customer.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-sm lg:text-base truncate">{customer.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <DollarSign className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm text-gray-600">Balance</p>
                      <p className="font-medium text-lg">{customer.balance}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <User className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm text-gray-600">Agent</p>
                      <p className="font-medium text-sm lg:text-base truncate">{customer.agent}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm text-gray-600">Join Date</p>
                      <p className="font-medium text-sm lg:text-base">{customer.joinDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Activity className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm text-gray-600">Last Activity</p>
                      <p className="font-medium text-sm lg:text-base">{customer.lastActivity}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="transactions" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="transactions" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">Transaction History</span>
                <span className="sm:hidden">Transactions</span>
              </TabsTrigger>
              <TabsTrigger value="activity" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">Activity Log</span>
                <span className="sm:hidden">Activity</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="transactions">
              <Card>
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 pb-4">
                  <CardTitle className="text-base sm:text-lg">Transaction History</CardTitle>
                  <Button variant="outline" size="sm" className="self-start sm:self-auto">
                    <Download className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Export</span>
                    <span className="sm:hidden">Export</span>
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="text-xs sm:text-sm">Date</TableHead>
                          <TableHead className="text-xs sm:text-sm">Amount</TableHead>
                          <TableHead className="text-xs sm:text-sm">Type</TableHead>
                          <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Agent</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {transactions.map((transaction, index) => (
                          <TableRow key={index}>
                            <TableCell className="text-xs sm:text-sm">{transaction.date}</TableCell>
                            <TableCell className="font-medium text-green-600 text-xs sm:text-sm">{transaction.amount}</TableCell>
                            <TableCell>
                              <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {transaction.type}
                              </span>
                            </TableCell>
                            <TableCell className="text-xs sm:text-sm hidden sm:table-cell">{transaction.agent}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">Activity Log</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.map((activity, index) => (
                      <div key={index} className="flex gap-3 p-3 sm:p-4 border border-gray-200 rounded-lg">
                        <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col gap-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                              <h4 className="font-medium text-gray-900 text-sm sm:text-base">{activity.action}</h4>
                              <span className="text-xs sm:text-sm text-gray-500">{activity.date}</span>
                            </div>
                            <p className="text-gray-600 text-xs sm:text-sm break-words">{activity.description}</p>
                            <p className="text-gray-500 text-xs mt-1">By: {activity.agent}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default CustomerDetails;
