"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
import { CUSTOMER_ORDERS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statusFilters = [
  { label: "전체", value: "all", count: 45 },
  { label: "처리대기", value: "처리대기", count: 12 },
  { label: "검토중", value: "검토중", count: 5 },
  { label: "승인", value: "승인", count: 25 },
  { label: "반려", value: "반려", count: 3 },
];

// Map some orders to "처리대기" for display
const managerOrders = CUSTOMER_ORDERS.map((order) => {
  if (order.status === "요청") return { ...order, status: "처리대기" as const };
  return order;
});

export default function ManagerOrderListPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filteredOrders = managerOrders.filter((order) => {
    const statusMatch =
      activeFilter === "all" || order.status === activeFilter;
    const searchMatch =
      !search ||
      order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      order.companyName.toLowerCase().includes(search.toLowerCase()) ||
      order.items.some((item) =>
        item.productName.toLowerCase().includes(search.toLowerCase())
      );
    return statusMatch && searchMatch;
  });

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const pendingSelected = filteredOrders.filter(
    (o) => selectedIds.has(o.id) && o.status === "처리대기"
  );

  return (
    <>
      <AppHeader title="주문요청 처리" userName="박영희" />
      <main className="flex-1 overflow-y-auto p-6">
        <Card>
          <CardContent className="p-6">
            {/* Filters */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-1">
                {statusFilters.map((filter) => (
                  <Button
                    key={filter.value}
                    variant={
                      activeFilter === filter.value ? "default" : "ghost"
                    }
                    size="sm"
                    onClick={() => setActiveFilter(filter.value)}
                    className="gap-1"
                  >
                    {filter.label}
                    <Badge
                      variant="secondary"
                      className={
                        activeFilter === filter.value
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {filter.count}
                    </Badge>
                  </Button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="업체명, 주문번호, 제품명 검색"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-72 pl-9"
                  />
                </div>
                {pendingSelected.length > 0 && (
                  <Button variant="default" size="sm">
                    일괄 승인 ({pendingSelected.length}건)
                  </Button>
                )}
              </div>
            </div>

            {/* Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox />
                  </TableHead>
                  <TableHead>주문번호</TableHead>
                  <TableHead>업체명</TableHead>
                  <TableHead>요청일</TableHead>
                  <TableHead>품목 수</TableHead>
                  <TableHead>대표 제품명</TableHead>
                  <TableHead>대기일수</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>담당자</TableHead>
                  <TableHead className="w-20">상세</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.has(order.id)}
                        onCheckedChange={() => toggleSelect(order.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/manager/orders/${order.id}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {order.orderNumber}
                      </Link>
                    </TableCell>
                    <TableCell className="font-medium">
                      {order.companyName}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {order.requestDate.slice(5)}
                    </TableCell>
                    <TableCell>{order.items.length}건</TableCell>
                    <TableCell>
                      {order.items[0].productName}
                      {order.items.length > 1 &&
                        ` 외 ${order.items.length - 1}건`}
                    </TableCell>
                    <TableCell>
                      {order.waitDays ? (
                        <span
                          className={cn(
                            "text-sm font-medium",
                            order.waitDays >= 7
                              ? "text-red-600"
                              : order.waitDays >= 3
                                ? "text-yellow-600"
                                : "text-foreground"
                          )}
                        >
                          {order.waitDays}일
                        </span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {order.assignee || "-"}
                    </TableCell>
                    <TableCell>
                      <Link href={`/manager/orders/${order.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                총 {filteredOrders.length}건
              </p>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" disabled>
                  이전
                </Button>
                <Button variant="default" size="sm">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  다음
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
