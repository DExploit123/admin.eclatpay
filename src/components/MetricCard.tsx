
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative';
  icon: LucideIcon;
  gradient: string;
  href?: string;
}

const MetricCard = ({ title, value, change, changeType, icon: Icon, gradient, href }: MetricCardProps) => {
  const CardContent = (
    <div className={cn(
      "relative overflow-hidden rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105",
      gradient,
      href ? "cursor-pointer" : ""
    )}>
      <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-20 -translate-y-4 translate-x-4">
        <Icon className="w-full h-full" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Icon className="w-6 h-6" />
          </div>
          <span className={cn(
            "text-sm font-medium px-2 py-1 rounded-full",
            changeType === 'positive' 
              ? "bg-green-500/20 text-green-100" 
              : "bg-red-500/20 text-red-100"
          )}>
            {change}
          </span>
        </div>
        
        <div>
          <h3 className="text-sm font-medium opacity-90 mb-1">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
    </div>
  );

  if (href) {
    return (
      <Link to={href} className="block">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
};

export default MetricCard;
