"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Badge } from "@/components/ui/badge";
import { PRODUCTS, PRODUCT_CATEGORIES, type Product } from "@/lib/mock-data";

interface ProductSelectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (products: Product[]) => void;
  excludeIds: string[];
}

export function ProductSelectDialog({
  open,
  onOpenChange,
  onSelect,
  excludeIds,
}: ProductSelectDialogProps) {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (excludeIds.includes(p.id)) return false;
      const catMatch = category === "all" || p.categoryCode === category;
      const searchMatch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.aws.toLowerCase().includes(search.toLowerCase()) ||
        p.ks.toLowerCase().includes(search.toLowerCase());
      return catMatch && searchMatch;
    });
  }, [category, search, excludeIds]);

  const toggleProduct = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleConfirm = () => {
    const selectedProducts = PRODUCTS.filter((p) => selected.has(p.id));
    onSelect(selectedProducts);
    setSelected(new Set());
    setSearch("");
    setCategory("all");
    onOpenChange(false);
  };

  const handleCancel = () => {
    setSelected(new Set());
    setSearch("");
    setCategory("all");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>품목 선택</DialogTitle>
          <DialogDescription>
            주문할 품목을 선택하세요. 복수 선택이 가능합니다.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-3">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-52">
              <SelectValue placeholder="카테고리 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 카테고리</SelectItem>
              {PRODUCT_CATEGORIES.map((cat) => (
                <SelectItem key={cat.code} value={cat.code}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="제품명 또는 규격으로 검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">선택</TableHead>
                <TableHead>제품명</TableHead>
                <TableHead>카테고리</TableHead>
                <TableHead>AWS</TableHead>
                <TableHead>KS</TableHead>
                <TableHead>JIS</TableHead>
                <TableHead>EN</TableHead>
                <TableHead>MSDS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground">
                    검색 결과가 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow
                    key={product.id}
                    className="cursor-pointer"
                    onClick={() => toggleProduct(product.id)}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selected.has(product.id)}
                        onCheckedChange={() => toggleProduct(product.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {product.categoryName}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {product.aws}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {product.ks}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {product.jis}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {product.en}
                    </TableCell>
                    <TableCell>
                      {product.msds ? (
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                          PDF
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {selected.size > 0 && (
          <p className="text-sm text-primary">
            {selected.size}개 품목 선택됨
          </p>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            취소
          </Button>
          <Button onClick={handleConfirm} disabled={selected.size === 0}>
            선택 완료
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
