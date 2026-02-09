"use client";

import { useState } from "react";
import { Plus, Search, Pencil, Ban } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AppHeader } from "@/components/app-header";
import { StatusBadge } from "@/components/status-badge";
import { USERS, type User } from "@/lib/mock-data";

export default function ManagerUsersPage() {
  const [search, setSearch] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [autoPassword, setAutoPassword] = useState(true);

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    phone: "",
    email: "",
    password: "",
  });

  const filteredUsers = USERS.filter((user) => {
    if (!search) return true;
    return (
      user.companyName.toLowerCase().includes(search.toLowerCase()) ||
      user.contactPerson.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleNewUser = () => {
    setEditingUser(null);
    setFormData({
      companyName: "",
      contactPerson: "",
      phone: "",
      email: "",
      password: "",
    });
    setAutoPassword(true);
    setSheetOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({
      companyName: user.companyName,
      contactPerson: user.contactPerson,
      phone: user.phone,
      email: user.email,
      password: "",
    });
    setAutoPassword(false);
    setSheetOpen(true);
  };

  const handleSubmit = () => {
    setSheetOpen(false);
  };

  return (
    <>
      <AppHeader title="사용자 관리" userName="박영희" />
      <main className="flex-1 overflow-y-auto p-6">
        <Card>
          <CardContent className="p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                고객사 계정 관리
              </h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="업체명 또는 담당자명 검색"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-64 pl-9"
                  />
                </div>
                <Button onClick={handleNewUser}>
                  <Plus className="mr-2 h-4 w-4" />새 계정 등록
                </Button>
              </div>
            </div>

            {/* Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-14">번호</TableHead>
                  <TableHead>업체명</TableHead>
                  <TableHead>담당자명</TableHead>
                  <TableHead>연락처</TableHead>
                  <TableHead>이메일</TableHead>
                  <TableHead>등록일</TableHead>
                  <TableHead>최근 로그인</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead className="w-28">관리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell className="text-muted-foreground">
                      {index + 1}
                    </TableCell>
                    <TableCell className="font-medium">
                      {user.companyName}
                    </TableCell>
                    <TableCell>{user.contactPerson}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.phone}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.email}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.registeredDate}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.lastLogin}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={user.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditUser(user)}
                          className="h-8 w-8 p-0"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        >
                          <Ban className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                총 {filteredUsers.length}건
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* User Form Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              {editingUser ? "계정 수정" : "새 계정 등록"}
            </SheetTitle>
            <SheetDescription>
              {editingUser
                ? "고객사 계정 정보를 수정합니다."
                : "새로운 고객사 계정을 등록합니다."}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="companyName">
                업체명 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
                placeholder="업체명을 입력하세요"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="contactPerson">
                담당자명 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="contactPerson"
                value={formData.contactPerson}
                onChange={(e) =>
                  setFormData({ ...formData, contactPerson: e.target.value })
                }
                placeholder="담당자명을 입력하세요"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">
                연락처 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="02-000-0000"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">
                이메일 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="email@company.co.kr"
              />
            </div>
            {!editingUser && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="autoPassword"
                    checked={autoPassword}
                    onCheckedChange={(checked) =>
                      setAutoPassword(checked === true)
                    }
                  />
                  <Label htmlFor="autoPassword" className="text-sm">
                    초기 비밀번호 자동 생성
                  </Label>
                </div>
                {!autoPassword && (
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="password">초기 비밀번호</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      placeholder="비밀번호를 입력하세요"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          <SheetFooter className="mt-6">
            <Button variant="outline" onClick={() => setSheetOpen(false)}>
              취소
            </Button>
            <Button onClick={handleSubmit}>
              {editingUser ? "수정" : "등록"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
