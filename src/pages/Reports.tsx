
import { Calendar, ChevronDown, Download, FileText } from 'lucide-react';
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
      
      <div className="lg:ml-64">
        <Header />
        
        <main className="p-4 lg:p-6">
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Reports</h1>
            <p className="text-gray-600 text-sm lg:text-base">Generate custom reports based on your needs</p>
          </div>

          <Card className="mb-6 lg:mb-8">
            <CardHeader>
              <CardTitle className="text-lg lg:text-xl font-semibold">Report Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Report Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Report Type</label>
                <Tabs value={reportType} onValueChange={setReportType}>
                  <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-0 h-auto sm:h-10">
                    {reportTypes.map((type) => (
                      <TabsTrigger 
                        key={type} 
                        value={type} 
                        className="text-xs sm:text-sm py-2 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
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
                        "w-full justify-between text-left font-normal h-10 px-3",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">
                          {selectedDate ? format(selectedDate, "PPP") : "Select date range"}
                        </span>
                      </div>
                      <ChevronDown className="w-4 h-4 flex-shrink-0" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      className="p-3"
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
                    className="w-full justify-between text-left font-normal text-muted-foreground h-10 px-3"
                  >
                    <span className="truncate">Select filters</span>
                    <ChevronDown className="w-4 h-4 flex-shrink-0" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-between text-left font-normal text-muted-foreground h-10 px-3"
                  >
                    <span className="truncate">Additional filters</span>
                    <ChevronDown className="w-4 h-4 flex-shrink-0" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 h-10">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex gap-2 flex-1">
                    <Button variant="outline" size="sm" className="flex-1 text-xs sm:text-sm">
                      CSV
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 text-xs sm:text-sm">
                      PDF
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 text-xs sm:text-sm">
                      Print
                    </Button>
                  </div>
                  
                  <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Reports;
