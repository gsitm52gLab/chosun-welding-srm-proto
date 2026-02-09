"use client";

import Link from "next/link";
import {
  AlertCircle,
  Inbox,
  CheckCircle2,
  BarChart3,
  ArrowRight,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppHeader } from "@/components/app-header";
import { CUSTOMER_ORDERS, ACTIVITY_LOGS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

const summaryCards = [
  {
    label: "처리 대기",
    value: 12,
    icon: AlertCircle,
    iconColor: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    label: "오늘 접수",
    value: 3,
    icon: Inbox,
    iconColor: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "금주 처리 완료",
    value: 28,
    icon: CheckCircle2,
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    label: "이번 달 총 주문",
    value: 87,
    icon: BarChart3,
    iconColor: "text-gray-600",
    bgColor: "bg-gray-100",
  },
];

const companyStats = [
  { company: "한국중공업(주)", count: 8 },
  { company: "대우조선(주)", count: 6 },
  { company: "삼성중공업(주)", count: 5 },
  { company: "기타", count: 68 },
];

const weeklyStats = [
  { name: "승인", value: 25, color: "#16a34a" },
  { name: "반려", value: 3, color: "#dc2626" },
];

const urgentOrders = CUSTOMER_ORDERS.filter(
  (o) => o.status === "검토중" || o.status === "요청" || o.status === "처리대기"
).slice(0, 5);

function WaitDaysBadge({ days }: { days?: number }) {
  if (!days) return <span className="text-muted-foreground">-</span>;
  return (
    <span
      className={cn(
        "text-sm font-medium",
        days >= 7
          ? "text-red-600"
          : days >= 3
            ? "text-yellow-600"
            : "text-foreground"
      )}
    >
      {days}일
      {days >= 7 && (
        <Badge variant="destructive" className="ml-1 px-1 py-0 text-xs">
          긴급
        </Badge>
      )}
      {days >= 3 && days < 7 && (
        <Badge
          variant="secondary"
          className="ml-1 bg-yellow-100 px-1 py-0 text-xs text-yellow-700 hover:bg-yellow-100"
        >
          주의
        </Badge>
      )}
    </span>
  );
}

export default function ManagerHomePage() {
  return (
    <>
      <AppHeader title="관리자 대시보드" userName="박영희" />
      <main className="flex-1 overflow-y-auto p-6">
        {/* Summary Cards */}
        <div className="mb-6 grid grid-cols-4 gap-4">
          {summaryCards.map((card) => (
            <Card key={card.label}>
              <CardContent className="flex items-center gap-4 p-5">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg ${card.bgColor}`}
                >
                  <card.icon className={`h-6 w-6 ${card.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                  <p className="text-2xl font-bold text-foreground">
                    {card.value}
                    <span className="ml-0.5 text-sm font-normal text-muted-foreground">
                      건
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Urgent Orders + Stats */}
        <div className="mb-6 grid grid-cols-5 gap-4">
          <Card className="col-span-3">
            <CardHeader className="flex-row items-center justify-between pb-4">
              <CardTitle className="text-base">긴급 처리 대기</CardTitle>
              <Link href="/manager/orders">
                <Button variant="ghost" size="sm" className="text-primary">
                  전체 보기 <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>업체명</TableHead>
                    <TableHead>주문번호</TableHead>
                    <TableHead>요청일</TableHead>
                    <TableHead>품목 수</TableHead>
                    <TableHead>대기일수</TableHead>
                    <TableHead>액션</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {urgentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        {order.companyName}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {order.orderNumber}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {order.requestDate.slice(5)}
                      </TableCell>
                      <TableCell>{order.items.length}건</TableCell>
                      <TableCell>
                        <WaitDaysBadge days={order.waitDays} />
                      </TableCell>
                      <TableCell>
                        <Link href={`/manager/orders/${order.id}`}>
                          <Button variant="outline" size="sm">
                            처리하기
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="col-span-2 flex flex-col gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">업체별 주문 현황</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-col gap-2">
                  {companyStats.map((stat) => (
                    <div
                      key={stat.company}
                      className="flex items-center justify-between rounded-lg p-2"
                    >
                      <span className="text-sm text-foreground">
                        {stat.company}
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        {stat.count}건
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">이번 주 처리 통계</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ResponsiveContainer width="100%" height={120}>
                  <BarChart
                    data={weeklyStats}
                    layout="vertical"
                    margin={{ left: 0, right: 10, top: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" fontSize={12} />
                    <YAxis
                      dataKey="name"
                      type="category"
                      width={40}
                      fontSize={12}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                      {weeklyStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Activity Log */}
        <Card>
          <CardHeader className="flex-row items-center gap-2 pb-4">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">최근 활동 로그</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-col gap-3">
              {ACTIVITY_LOGS.map((log, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-accent"
                >
                  <span className="w-24 shrink-0 text-sm text-muted-foreground">
                    {log.time}
                  </span>
                  <span className="w-16 shrink-0 text-sm font-medium text-foreground">
                    {log.user}
                  </span>
                  <span className="flex-1 text-sm text-foreground">
                    {log.action}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {log.company}
                  </span>
                  {log.remark && (
                    <Badge
                      variant="secondary"
                      className="bg-red-50 text-red-700 hover:bg-red-50"
                    >
                      {log.remark}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
