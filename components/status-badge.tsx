import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/lib/mock-data";

const statusConfig: Record<
  string,
  { className: string }
> = {
  "요청": { className: "bg-blue-100 text-blue-700 hover:bg-blue-100" },
  "처리대기": { className: "bg-blue-100 text-blue-700 hover:bg-blue-100" },
  "검토중": { className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100" },
  "승인": { className: "bg-green-100 text-green-700 hover:bg-green-100" },
  "반려": { className: "bg-red-100 text-red-700 hover:bg-red-100" },
  "활성": { className: "bg-green-100 text-green-700 hover:bg-green-100" },
  "비활성": { className: "bg-gray-100 text-gray-500 hover:bg-gray-100" },
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || { className: "bg-gray-100 text-gray-700" };
  return (
    <Badge variant="secondary" className={cn("font-medium", config.className, className)}>
      {status}
    </Badge>
  );
}
