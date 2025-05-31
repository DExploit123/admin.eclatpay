
import { useState } from 'react';
import { Search, Eye, Phone, DollarSign, User } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const customers = [
    {
      id: 'CUST001',
      name: 'Liam Harper',
      phone: '+1 (555) 123-4567',
      balance: '$500',
      agent: 'Ethan Bennett',
      lastActivity: '2023-11-15',
      status: 'Active'
    },
    {
      id: 'CUST002',
      name: 'Olivia Carter',
      phone: '+1 (555) 987-6543',
      balance: '$750',
      agent: 'Ava Thompson',
      lastActivity: '2023-11-14',
      status: 'Active'
    },
    {
      id: 'CUST003',
      name: 'Noah Foster',
      phone: '+1 (555) 246-8013',
      balance: '$200',
      agent: 'Owen Hayes',
      lastActivity: '2023-11-13',
      status: 'Inactive'
    },
    {
      id: 'CUST004',
      name: 'Isabella Reed',
      phone: '+1 (555) 369-1215',
      balance: '$1000',
      agent: 'Sophia Turner',
      lastActivity: '2023-11-12',
      status: 'Active'
    },
    {
      id: 'CUST005',
      name: 'Jackson Cole',
      phone: '+1 (555) 482-3457',
      balance: '$300',
      agent: 'Lucas Parker',
      lastActivity: '2023-11-11',
      status: 'Active'
    },
    {
      id: 'CUST006',
      name: 'Aria Morgan',
      phone: '+1 (555) 505-5679',
      balance: '$600',
      agent: 'Mia Collins',
      lastActivity: '2023-11-10',
      status: 'Active'
    }
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.agent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'Active').length,
    totalBalance: customers.reduce((sum, c) => sum + parseFloat(c.balance.replace('$', '')), 0)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeItem="Customers" />
      
      <div className="lg:ml-64">
        <Header />
        
        <main className="p-4 lg:p-6">
          {/* Header */}
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Customers</h1>
            <p className="text-gray-600 text-sm lg:text-base">Manage and monitor customer accounts</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
            <Card>
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="p-2 lg:p-3 bg-blue-100 rounded-lg">
                    <User className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs lg:text-sm text-gray-600">Total Customers</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="p-2 lg:p-3 bg-green-100 rounded-lg">
                    <User className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs lg:text-sm text-gray-600">Active Customers</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">{stats.active}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="p-2 lg:p-3 bg-purple-100 rounded-lg">
                    <DollarSign className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs lg:text-sm text-gray-600">Total Balance</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">${stats.totalBalance}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6 lg:mb-8">
            <CardContent className="p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search customers by name, ID, or agent..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customers Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg lg:text-xl">Customer List</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold">Customer</TableHead>
                      <TableHead className="font-semibold hidden sm:table-cell">ID</TableHead>
                      <TableHead className="font-semibold hidden md:table-cell">Phone</TableHead>
                      <TableHead className="font-semibold">Balance</TableHead>
                      <TableHead className="font-semibold hidden lg:table-cell">Agent</TableHead>
                      <TableHead className="font-semibold hidden lg:table-cell">Last Activity</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow key={customer.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center gap-2 lg:gap-3">
                            <Avatar className="w-8 h-8 lg:w-10 lg:h-10">
                              <AvatarFallback className="bg-blue-100 text-blue-600 text-xs lg:text-sm">
                                {customer.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <Link 
                                to={`/customers/${customer.id}`}
                                className="font-medium text-blue-600 hover:underline text-sm lg:text-base truncate block"
                              >
                                {customer.name}
                              </Link>
                              <p className="text-xs lg:text-sm text-gray-500 sm:hidden">{customer.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-sm lg:text-base">{customer.id}</TableCell>
                        <TableCell className="hidden md:table-cell text-sm lg:text-base">{customer.phone}</TableCell>
                        <TableCell className="font-medium text-sm lg:text-base">{customer.balance}</TableCell>
                        <TableCell className="hidden lg:table-cell text-sm">{customer.agent}</TableCell>
                        <TableCell className="hidden lg:table-cell text-sm">{customer.lastActivity}</TableCell>
                        <TableCell>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            customer.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {customer.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center">
                            <Link to={`/customers/${customer.id}`}>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {filteredCustomers.length === 0 && searchTerm && (
                <div className="p-6 text-center text-gray-500">
                  No customers found matching "{searchTerm}"
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Customers;
