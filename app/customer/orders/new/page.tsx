"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AppHeader } from "@/components/app-header";
import { ProductSelectDialog } from "@/components/product-select-dialog";
import type { Product } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface OrderItemRow {
  id: string;
  productId: string;
  productName: string;
  aws: string;
  categoryName: string;
  quantity: string;
  unit: string;
  deliveryDate: string;
  requestDate: string;
  poRequestDate: string;
}

const today = new Date().toISOString().split("T")[0];

export default function NewOrderPage() {
  const router = useRouter();
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [items, setItems] = useState<OrderItemRow[]>([
    {
      id: "1",
      productId: "P006",
      productName: "CR-13",
      aws: "E6013",
      categoryName: "피복아크 용접봉",
      quantity: "500",
      unit: "kg",
      deliveryDate: "2025-03-01",
      requestDate: today,
      poRequestDate: "2025-02-15",
    },
    {
      id: "2",
      productId: "P007",
      productName: "CSF-71T",
      aws: "E71T-1C",
      categoryName: "플럭스 코어드 와이어",
      quantity: "200",
      unit: "kg",
      deliveryDate: "2025-03-15",
      requestDate: today,
      poRequestDate: "2025-02-20",
    },
  ]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleProductSelect = (products: Product[]) => {
    const newItems: OrderItemRow[] = products.map((p, index) => ({
      id: `${Date.now()}-${index}`,
      productId: p.id,
      productName: p.name,
      aws: p.aws,
      categoryName: p.categoryName,
      quantity: "",
      unit: "kg",
      deliveryDate: "",
      requestDate: today,
      poRequestDate: "",
    }));
    setItems((prev) => [...prev, ...newItems]);
  };

  const updateItem = (
    id: string,
    field: keyof OrderItemRow,
    value: string
  ) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
    // Clear error when user types
    setErrors((prev) => {
      const next = { ...prev };
      delete next[`${id}-${field}`];
      return next;
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (items.length === 0) {
      newErrors.global = "최소 1개 이상의 품목을 추가해야 합니다.";
    }

    items.forEach((item) => {
      const qty = Number(item.quantity);
      if (!item.quantity || qty <= 0) {
        newErrors[`${item.id}-quantity`] = "수량을 입력하세요";
      }
      if (!item.deliveryDate) {
        newErrors[`${item.id}-deliveryDate`] = "납기일을 선택하세요";
      }
      if (!item.poRequestDate) {
        newErrors[`${item.id}-poRequestDate`] = "발주요청일을 선택하세요";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setConfirmDialogOpen(true);
    }
  };

  const handleConfirmSubmit = () => {
    setConfirmDialogOpen(false);
    router.push("/customer/orders");
  };

  const excludeProductIds = items.map((item) => item.productId);

  return (
    <>
      <AppHeader
        title="새 주문요청 작성"
        userName="김철수"
        companyName="한국중공업(주)"
      />
      <main className="flex-1 overflow-y-auto p-6">
        {/* Section 1 - Order Basic Info */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">주문 기본 정보</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex items-center gap-2">
                <span className="w-20 shrink-0 text-sm text-muted-foreground">
                  요청 업체
                </span>
                <Input value="한국중공업(주)" disabled className="bg-muted" />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-20 shrink-0 text-sm text-muted-foreground">
                  담당자
                </span>
                <Input value="김철수" disabled className="bg-muted" />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-20 shrink-0 text-sm text-muted-foreground">
                  연락처
                </span>
                <Input value="02-1234-5678" disabled className="bg-muted" />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-20 shrink-0 text-sm text-muted-foreground">
                  이메일
                </span>
                <Input
                  value="cs.kim@hanhwa.co.kr"
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-20 shrink-0 text-sm text-muted-foreground">
                  요청일
                </span>
                <Input value={today} disabled className="bg-muted" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2 - Selected Items */}
        <Card className="mb-6">
          <CardHeader className="flex-row items-center justify-between pb-4">
            <CardTitle className="text-base">
              주문 품목{" "}
              <span className="text-sm font-normal text-muted-foreground">
                ({items.length}건)
              </span>
            </CardTitle>
            <Button onClick={() => setProductDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              품목 추가
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            {errors.global && (
              <p className="mb-4 text-sm text-destructive">{errors.global}</p>
            )}
            <div className="overflow-x-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-14">순번</TableHead>
                    <TableHead>제품명</TableHead>
                    <TableHead>AWS</TableHead>
                    <TableHead>카테고리</TableHead>
                    <TableHead className="w-28">주문수량</TableHead>
                    <TableHead className="w-24">단위</TableHead>
                    <TableHead className="w-36">납기일</TableHead>
                    <TableHead className="w-36">요청일자</TableHead>
                    <TableHead className="w-36">발주요청일</TableHead>
                    <TableHead className="w-14">삭제</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={10}
                        className="py-8 text-center text-muted-foreground"
                      >
                        품목을 추가해주세요
                      </TableCell>
                    </TableRow>
                  ) : (
                    items.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell className="text-center">
                          {index + 1}
                        </TableCell>
                        <TableCell className="font-medium">
                          {item.productName}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {item.aws}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {item.categoryName}
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={(e) =>
                              updateItem(item.id, "quantity", e.target.value)
                            }
                            className={cn(
                              "h-8",
                              errors[`${item.id}-quantity`] &&
                                "border-destructive"
                            )}
                            placeholder="수량"
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            value={item.unit}
                            onValueChange={(value) =>
                              updateItem(item.id, "unit", value)
                            }
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kg">kg</SelectItem>
                              <SelectItem value="EA">EA</SelectItem>
                              <SelectItem value="Box">Box</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="date"
                            value={item.deliveryDate}
                            onChange={(e) =>
                              updateItem(
                                item.id,
                                "deliveryDate",
                                e.target.value
                              )
                            }
                            className={cn(
                              "h-8",
                              errors[`${item.id}-deliveryDate`] &&
                                "border-destructive"
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="date"
                            value={item.requestDate}
                            onChange={(e) =>
                              updateItem(
                                item.id,
                                "requestDate",
                                e.target.value
                              )
                            }
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="date"
                            value={item.poRequestDate}
                            onChange={(e) =>
                              updateItem(
                                item.id,
                                "poRequestDate",
                                e.target.value
                              )
                            }
                            className={cn(
                              "h-8",
                              errors[`${item.id}-poRequestDate`] &&
                                "border-destructive"
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <Button variant="outline" size="lg">
            임시저장
          </Button>
          <Button size="lg" onClick={handleSubmit}>
            주문요청 제출
          </Button>
        </div>
      </main>

      {/* Product Select Dialog */}
      <ProductSelectDialog
        open={productDialogOpen}
        onOpenChange={setProductDialogOpen}
        onSelect={handleProductSelect}
        excludeIds={excludeProductIds}
      />

      {/* Confirm Submit Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>주문요청 제출</DialogTitle>
            <DialogDescription>
              총 {items.length}개 품목의 주문요청을 제출하시겠습니까?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmDialogOpen(false)}
            >
              취소
            </Button>
            <Button onClick={handleConfirmSubmit}>제출</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
