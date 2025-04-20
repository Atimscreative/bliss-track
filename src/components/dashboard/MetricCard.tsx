import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  iconClassName?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  className,
  iconClassName,
}) => {
  return (
    <Card
      className={cn(
        "overflow-hidden shadow-[0_0_10px_rgba(0,0,0,.02)] bg-white border border-bliss-200/80",
        className
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-neutral-500">{title}</p>
            <p className="text-2xl font-semibold text-neutral-800">{value}</p>

            {trend && (
              <div className="flex items-center text-sm mt-1">
                <span
                  className={cn(
                    "font-medium",
                    trend.isPositive ? "text-green-600" : "text-red-600"
                  )}
                >
                  {trend.isPositive ? "+" : ""}
                  {trend.value}%
                </span>
                <span
                  className={cn(
                    "ml-1",
                    trend.isPositive ? "text-green-600" : "text-red-600"
                  )}
                >
                  from last month
                </span>
              </div>
            )}
          </div>

          <div
            className={cn("p-3 rounded-full", iconClassName || "bg-bliss-600")}
          >
            <Icon
              className={cn(
                "h-6 w-6",
                iconClassName ? "text-white" : "text-primary"
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
