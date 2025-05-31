
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
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Customers
                </Button>
              </Link>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Customer Details</h1>
            <p className="text-gray-600 text-sm lg:text-base">Complete customer information and transaction history</p>
          </div>

          {/* Customer Info Card */}
          <Card className="mb-6 lg:mb-8">
            <CardContent className="p-4 lg:p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16 lg:w-20 lg:h-20">
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-xl lg:text-2xl font-bold">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-900">{customer.name}</h2>
                    <p className="text-gray-600">{customer.id}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                      customer.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {customer.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">{customer.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{customer.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Balance</p>
                      <p className="font-medium text-lg">{customer.balance}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Agent</p>
                      <p className="font-medium">{customer.agent}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Join Date</p>
                      <p className="font-medium">{customer.joinDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Last Activity</p>
                      <p className="font-medium">{customer.lastActivity}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="transactions" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="transactions">Transaction History</TabsTrigger>
              <TabsTrigger value="activity">Activity Log</TabsTrigger>
            </TabsList>
            
            <TabsContent value="transactions">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Transaction History</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead>Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Agent</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {transactions.map((transaction, index) => (
                          <TableRow key={index}>
                            <TableCell>{transaction.date}</TableCell>
                            <TableCell className="font-medium text-green-600">{transaction.amount}</TableCell>
                            <TableCell>
                              <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {transaction.type}
                              </span>
                            </TableCell>
                            <TableCell>{transaction.agent}</TableCell>
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
                  <CardTitle>Activity Log</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.map((activity, index) => (
                      <div key={index} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                        <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                            <h4 className="font-medium text-gray-900">{activity.action}</h4>
                            <span className="text-sm text-gray-500">{activity.date}</span>
                          </div>
                          <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
                          <p className="text-gray-500 text-xs mt-2">By: {activity.agent}</p>
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
