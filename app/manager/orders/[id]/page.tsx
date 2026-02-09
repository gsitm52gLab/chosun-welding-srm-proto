"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AppHeader } from "@/components/app-header";
import { StatusBadge } from "@/components/status-badge";
import { CUSTOMER_ORDERS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function ManagerOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const order = CUSTOMER_ORDERS.find((o) => o.id === id);

  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  if (!order) {
    return (
      <>
        <AppHeader title="주문요청 상세" userName="박영희" />
        <main className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">주문을 찾을 수 없습니다.</p>
        </main>
      </>
    );
  }

  const totalAmount = order.items.reduce((sum, item) => {
    const price = item.unitPrice || 0;
    return sum + price * item.quantity;
  }, 0);

  const stockShortItems = order.items.filter(
    (item) => item.sapStock !== undefined && item.quantity > item.sapStock
  );

  const handleApprove = () => {
    setApproveDialogOpen(false);
    router.push("/manager/orders");
  };

  const handleReject = () => {
    if (!rejectReason.trim()) return;
    setRejectDialogOpen(false);
    router.push("/manager/orders");
  };

  return (
    <>
      <AppHeader
        title={`주문요청 상세 - ${order.orderNumber}`}
        userName="박영희"
      />
      <main className="flex-1 overflow-y-auto p-6 pb-24">
        <Link
          href="/manager/orders"
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          목록으로
        </Link>

        {/* Order Info */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">요청 기본 정보</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">주문번호:</span>
                <span className="text-sm font-medium">{order.orderNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">업체:</span>
                <span className="text-sm font-medium">{order.companyName}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">담당자:</span>
                <span className="text-sm font-medium">
                  {order.contactPerson}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">연락처:</span>
                <span className="text-sm font-medium">
                  {order.contactPhone}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">이메일:</span>
                <span className="text-sm font-medium">
                  {order.contactEmail}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">요청일:</span>
                <span className="text-sm font-medium">
                  {order.requestDate}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">상태:</span>
                <StatusBadge status={order.status} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Item Cards - SAP Comparison */}
        <div className="mb-6 flex flex-col gap-4">
          {order.items.map((item) => {
            const sapStock = item.sapStock ?? 0;
            const unitPrice = item.unitPrice ?? 0;
            const estimatedAmount = unitPrice * item.quantity;
            const isShort = item.quantity > sapStock;
            const stockRatio =
              sapStock > 0
                ? ((item.quantity / sapStock) * 100).toFixed(1)
                : "N/A";

            return (
              <Card
                key={item.seq}
                className={cn(
                  "overflow-hidden",
                  isShort && "border-yellow-300"
                )}
              >
                <CardHeader className="flex-row items-center justify-between pb-3">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base">
                      [{`품목 ${item.seq}`}] {item.productName} (
                      {item.categoryName})
                    </CardTitle>
                    {isShort ? (
                      <Badge
                        variant="secondary"
                        className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                      >
                        재고 부족
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700 hover:bg-green-100"
                      >
                        재고 충분
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Left: Customer Request */}
                    <div>
                      <p className="mb-3 text-sm font-medium text-muted-foreground">
                        고객 요청 정보
                      </p>
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            제품명
                          </span>
                          <span className="text-sm font-medium">
                            {item.productName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            AWS
                          </span>
                          <span className="font-mono text-sm">
                            {item.aws}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            주문수량
                          </span>
                          <span className="text-sm font-medium">
                            {item.quantity.toLocaleString()} {item.unit}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            납기요청일
                          </span>
                          <span className="text-sm">
                            {item.deliveryDate}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            요청일자
                          </span>
                          <span className="text-sm">
                            {item.requestDate}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            발주요청일
                          </span>
                          <span className="text-sm">
                            {item.poRequestDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: SAP Data */}
                    <div>
                      <p className="mb-3 text-sm font-medium text-muted-foreground">
                        SAP 조회
                      </p>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            SAP 재고
                          </span>
                          <span
                            className={cn(
                              "flex items-center gap-1 text-sm font-medium",
                              isShort ? "text-yellow-600" : "text-green-600"
                            )}
                          >
                            {sapStock.toLocaleString()}kg
                            {isShort ? (
                              <AlertTriangle className="h-3.5 w-3.5" />
                            ) : (
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            SAP 단가
                          </span>
                          <span className="text-sm font-medium">
                            {"\u20A9"}
                            {unitPrice.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            예상금액
                          </span>
                          <span className="text-sm font-semibold">
                            {"\u20A9"}
                            {estimatedAmount.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            입고일
                          </span>
                          <span className="text-sm">2025-01-20</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stock comparison bar */}
                  <div className="mt-4 border-t pt-4">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        재고비교:
                      </span>
                      <span
                        className={cn(
                          "text-sm font-medium",
                          isShort ? "text-yellow-600" : "text-green-600"
                        )}
                      >
                        {item.quantity.toLocaleString()}
                        {item.unit}/{sapStock.toLocaleString()}
                        {item.unit}{" "}
                        {isShort ? `부족 (${stockRatio}%)` : `충분 (${stockRatio}%)`}
                      </span>
                    </div>
                    {isShort && (
                      <Alert className="mt-3 border-yellow-200 bg-yellow-50">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <AlertTitle className="text-yellow-800">
                          재고 부족
                        </AlertTitle>
                        <AlertDescription className="text-yellow-700">
                          요청 수량이 현재 재고를 초과합니다. (요청:{" "}
                          {item.quantity.toLocaleString()}
                          {item.unit} / 재고:{" "}
                          {sapStock.toLocaleString()}
                          {item.unit})
                        </AlertDescription>
                      </Alert>
                    )}
                    {!isShort && (
                      <div className="mt-3 grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            승인일(to SAP):
                          </span>
                          <Input type="date" className="h-8 w-40" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            납기일(확정):
                          </span>
                          <Input type="date" className="h-8 w-40" />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Order Summary */}
        <Card className="mb-6">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-sm text-muted-foreground">
                    총 품목:{" "}
                  </span>
                  <span className="text-sm font-semibold">
                    {order.items.length}건
                  </span>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    총 예상 금액:{" "}
                  </span>
                  <span className="text-lg font-bold text-foreground">
                    {"\u20A9"}
                    {totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
              {stockShortItems.length > 0 && (
                <Alert className="w-auto border-red-200 bg-red-50 p-3">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-sm text-red-700">
                    재고 부족: {stockShortItems.length}건 (
                    {stockShortItems.map((i) => i.productName).join(", ")})
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Sticky Footer Actions */}
      <div className="sticky bottom-0 flex items-center justify-between border-t bg-card px-6 py-4">
        <Button
          variant="outline"
          className="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive bg-transparent"
          onClick={() => setRejectDialogOpen(true)}
        >
          반려
        </Button>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            메모 추가
          </Button>
          <Button size="lg" onClick={() => setApproveDialogOpen(true)}>
            승인 (SAP 전송)
          </Button>
        </div>
      </div>

      {/* Approve Dialog */}
      <Dialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>주문 승인 확인</DialogTitle>
            <DialogDescription>
              총 {order.items.length}품목, {"\u20A9"}
              {totalAmount.toLocaleString()} 승인하시겠습니까?
              {stockShortItems.length > 0 &&
                ` (재고 부족 ${stockShortItems.length}건 포함)`}
            </DialogDescription>
          </DialogHeader>
          {stockShortItems.length > 0 && (
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-sm text-yellow-700">
                재고 부족 품목이 포함되어 있습니다:{" "}
                {stockShortItems.map((i) => i.productName).join(", ")}
              </AlertDescription>
            </Alert>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setApproveDialogOpen(false)}
            >
              취소
            </Button>
            <Button onClick={handleApprove}>승인</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>주문 반려</DialogTitle>
            <DialogDescription>반려 사유를 입력해주세요.</DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="반려 사유를 입력하세요 (필수)"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            className="min-h-24"
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRejectDialogOpen(false)}
            >
              취소
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={!rejectReason.trim()}
            >
              반려
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
