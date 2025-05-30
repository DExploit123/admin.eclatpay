
import { Calendar, ChevronDown, Download, Filter, FileText } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const Reports = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [reportType, setReportType] = useState('Transaction History');

  const reportTypes = [
    'Transaction History',
    'User Activity',
    'Balance Summary'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeItem="Reports" />
      
      <div className="ml-64">
        <Header />
        
        <main className="p-6 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports</h1>
            <p className="text-gray-600">Generate custom reports based on your needs</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Report Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Report Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Report Type</label>
                <Tabs value={reportType} onValueChange={setReportType}>
                  <TabsList className="grid w-full grid-cols-3">
                    {reportTypes.map((type) => (
                      <TabsTrigger key={type} value={type} className="text-sm">
                        {type}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Date Range</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-between text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Select date range"}
                      </div>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Filters */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Filters</label>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-between text-left font-normal text-muted-foreground"
                  >
                    <span>Select filters</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-between text-left font-normal text-muted-foreground"
                  >
                    <span>Additional filters</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">CSV</Button>
                  <Button variant="outline" size="sm">PDF</Button>
                  <Button variant="outline" size="sm">Print</Button>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Reports;
