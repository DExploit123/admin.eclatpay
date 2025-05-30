
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Download } from 'lucide-react';

interface Deposit {
  transactionId: string;
  customer: string;
  agent: string;
  amount: string;
  date: string;
}

const RecentDepositsTable = () => {
  const deposits: Deposit[] = [
    { transactionId: 'TXN12345', customer: 'Customer A', agent: 'Agent 1', amount: '$100', date: '2023-01-01' },
    { transactionId: 'TXN67890', customer: 'Customer B', agent: 'Agent 2', amount: '$200', date: '2023-01-02' },
    { transactionId: 'TXN11223', customer: 'Customer C', agent: 'Agent 3', amount: '$150', date: '2023-01-03' },
    { transactionId: 'TXN44556', customer: 'Customer D', agent: 'Agent 4', amount: '$250', date: '2023-01-04' },
    { transactionId: 'TXN77889', customer: 'Customer E', agent: 'Agent 5', amount: '$300', date: '2023-01-05' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Deposits</h2>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="Search transactions..." className="pl-10" />
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
              <th className="text-left py-3 px-4 font-medium text-gray-500">Transaction ID</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Customer</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Agent</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Amount</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
            </tr>
          </thead>
          <tbody>
            {deposits.map((deposit) => (
              <tr key={deposit.transactionId} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4 font-mono text-sm text-blue-600">{deposit.transactionId}</td>
                <td className="py-4 px-4 text-blue-600 hover:underline cursor-pointer">{deposit.customer}</td>
                <td className="py-4 px-4 text-blue-600 hover:underline cursor-pointer">{deposit.agent}</td>
                <td className="py-4 px-4 font-semibold text-gray-900">{deposit.amount}</td>
                <td className="py-4 px-4 text-gray-600">{deposit.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentDepositsTable;
