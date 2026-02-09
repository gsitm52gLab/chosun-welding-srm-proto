"use client";

import Link from "next/link";
import {
  ClipboardList,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  ArrowRight,
  Megaphone,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppHeader } from "@/components/app-header";
import { StatusBadge } from "@/components/status-badge";
import { CUSTOMER_ORDERS, NOTICES } from "@/lib/mock-data";

const summaryCards = [
  {
    label: "전체 주문",
    value: 24,
    icon: ClipboardList,
    iconColor: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "검토중",
    value: 5,
    icon: Clock,
    iconColor: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    label: "승인 완료",
    value: 17,
    icon: CheckCircle,
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    label: "반려",
    value: 2,
    icon: XCircle,
    iconColor: "text-red-600",
    bgColor: "bg-red-50",
  },
];

const recentProducts = [
  { name: "CR-13", category: "피복아크 용접봉" },
  { name: "CSF-71T", category: "플럭스 코어드 와이어" },
  { name: "MC-50T", category: "솔리드 와이어" },
];

export default function CustomerHomePage() {
  const recentOrders = CUSTOMER_ORDERS.slice(0, 5);

  return (
    <>
      <AppHeader
        title="대시보드"
        userName="김철수"
        companyName="한국중공업(주)"
      />
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

        {/* Recent Orders + Quick Actions */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          <Card className="col-span-2">
            <CardHeader className="flex-row items-center justify-between pb-4">
              <CardTitle className="text-base">최근 주문 현황</CardTitle>
              <Link href="/customer/orders">
                <Button variant="ghost" size="sm" className="text-primary">
                  전체 보기 <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>주문번호</TableHead>
                    <TableHead>요청일</TableHead>
                    <TableHead>대표 품목</TableHead>
                    <TableHead>상태</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <Link
                          href={`/customer/orders/${order.id}`}
                          className="font-medium text-primary hover:underline"
                        >
                          {order.orderNumber}
                        </Link>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {order.requestDate}
                      </TableCell>
                      <TableCell>
                        {order.items[0].productName}
                        {order.items.length > 1 &&
                          ` 외 ${order.items.length - 1}건`}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={order.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base">빠른 작업</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pt-0">
              <Link href="/customer/orders/new">
                <Button className="w-full" size="lg">
                  <Plus className="mr-2 h-5 w-5" />
                  새 주문요청
                </Button>
              </Link>
              <div className="border-t pt-4">
                <p className="mb-3 text-sm font-medium text-muted-foreground">
                  최근 주문한 품목
                </p>
                <div className="flex flex-col gap-2">
                  {recentProducts.map((product) => (
                    <Link
                      key={product.name}
                      href="/customer/orders/new"
                      className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-accent"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {product.category}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notices */}
        <Card>
          <CardHeader className="flex-row items-center gap-2 pb-4">
            <Megaphone className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">공지사항</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-col gap-2">
              {NOTICES.map((notice) => (
                <div
                  key={notice.id}
                  className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-accent"
                >
                  <p className="text-sm text-foreground">{notice.title}</p>
                  <p className="text-xs text-muted-foreground">{notice.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
