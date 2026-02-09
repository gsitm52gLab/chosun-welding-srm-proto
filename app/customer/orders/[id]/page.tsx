"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { CUSTOMER_ORDERS, ORDER_HISTORY } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const steps = [
  { label: "요청", key: "요청" },
  { label: "검토중", key: "검토중" },
  { label: "승인/반려", key: "승인" },
];

function getStepIndex(status: string) {
  if (status === "요청" || status === "처리대기") return 0;
  if (status === "검토중") return 1;
  return 2;
}

export default function CustomerOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const order = CUSTOMER_ORDERS.find((o) => o.id === id);

  if (!order) {
    return (
      <>
        <AppHeader title="주문 상세" userName="김철수" companyName="한국중공업(주)" />
        <main className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">주문을 찾을 수 없습니다.</p>
        </main>
      </>
    );
  }

  const currentStep = getStepIndex(order.status);

  return (
    <>
      <AppHeader
        title={`주문 상세 - ${order.orderNumber}`}
        userName="김철수"
        companyName="한국중공업(주)"
      />
      <main className="flex-1 overflow-y-auto p-6">
        <Link
          href="/customer/orders"
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          목록으로
        </Link>

        {/* Status Progress */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.key} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full border-2",
                        index < currentStep
                          ? "border-green-500 bg-green-500 text-primary-foreground"
                          : index === currentStep
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-card text-muted-foreground"
                      )}
                    >
                      {index < currentStep ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : index === currentStep ? (
                        <Clock className="h-5 w-5" />
                      ) : (
                        <span className="text-sm">{index + 1}</span>
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-sm font-medium",
                        index <= currentStep
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {step.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {index === 0
                        ? order.requestDate
                        : index === 1 && currentStep >= 1
                          ? "2025-02-08"
                          : "-"}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "mx-4 h-0.5 flex-1",
                        index < currentStep ? "bg-green-500" : "bg-border"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Rejection Alert */}
        {order.status === "반려" && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>반려 사유</AlertTitle>
            <AlertDescription>
              {order.remark || "재고 부족으로 납기일 조정 필요"}
            </AlertDescription>
          </Alert>
        )}

        {/* Order Info */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">주문 기본 정보</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">주문번호:</span>
                <span className="text-sm font-medium">{order.orderNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">요청일:</span>
                <span className="text-sm font-medium">{order.requestDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">업체:</span>
                <span className="text-sm font-medium">{order.companyName}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">담당자:</span>
                <span className="text-sm font-medium">{order.contactPerson}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">연락처:</span>
                <span className="text-sm font-medium">{order.contactPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">이메일:</span>
                <span className="text-sm font-medium">{order.contactEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">상태:</span>
                <StatusBadge status={order.status} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Items Table */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">품목 상세</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>순번</TableHead>
                  <TableHead>제품명</TableHead>
                  <TableHead>카테고리</TableHead>
                  <TableHead>AWS</TableHead>
                  <TableHead>주문수량</TableHead>
                  <TableHead>단위</TableHead>
                  <TableHead>납기일</TableHead>
                  <TableHead>요청일자</TableHead>
                  <TableHead>발주요청일</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item.seq}>
                    <TableCell>{item.seq}</TableCell>
                    <TableCell className="font-medium">
                      {item.productName}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {item.categoryName}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {item.aws}
                    </TableCell>
                    <TableCell>{item.quantity.toLocaleString()}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{item.deliveryDate}</TableCell>
                    <TableCell>{item.requestDate}</TableCell>
                    <TableCell>{item.poRequestDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* History Timeline */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">처리 이력</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-col gap-4">
              {ORDER_HISTORY.map((entry, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    {index < ORDER_HISTORY.length - 1 && (
                      <div className="h-full w-px bg-border" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">
                        {entry.action}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {entry.date}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {entry.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions for rejected orders */}
        {order.status === "반려" && (
          <div className="flex justify-end">
            <Link href="/customer/orders/new">
              <Button>수정 후 재요청</Button>
            </Link>
          </div>
        )}
      </main>
    </>
  );
}
