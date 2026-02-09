"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
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

const statusFilters = [
  { label: "전체", value: "all", count: 32 },
  { label: "요청", value: "요청", count: 5 },
  { label: "검토중", value: "검토중", count: 8 },
  { label: "승인", value: "승인", count: 17 },
  { label: "반려", value: "반려", count: 2 },
];

export default function CustomerOrderListPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredOrders = CUSTOMER_ORDERS.filter((order) => {
    const statusMatch =
      activeFilter === "all" || order.status === activeFilter;
    const searchMatch =
      !search ||
      order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      order.items.some((item) =>
        item.productName.toLowerCase().includes(search.toLowerCase())
      );
    return statusMatch && searchMatch;
  });

  return (
    <>
      <AppHeader
        title="주문 목록"
        userName="김철수"
        companyName="한국중공업(주)"
      />
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
                    placeholder="주문번호 또는 제품명 검색"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-64 pl-9"
                  />
                </div>
                <Link href="/customer/orders/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />새 주문요청
                  </Button>
                </Link>
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
                  <TableHead>요청일</TableHead>
                  <TableHead>품목 수</TableHead>
                  <TableHead>대표 제품명</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>비고</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
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
                    <TableCell>{order.items.length}건</TableCell>
                    <TableCell>
                      {order.items[0].productName}
                      {order.items.length > 1 &&
                        ` 외 ${order.items.length - 1}건`}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {order.remark || "-"}
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
