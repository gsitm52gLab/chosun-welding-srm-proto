"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState("customer");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!id || !password) return;
    if (tab === "customer") {
      router.push("/customer/home");
    } else {
      router.push("/manager/home");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="mb-8 text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">CS</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">조선선강</h1>
        </div>
        <p className="text-sm text-muted-foreground">SRM 주문관리 시스템</p>
      </div>

      <Card className="w-full max-w-md shadow-lg">
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <div className="px-6 pt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="customer">고객 로그인</TabsTrigger>
              <TabsTrigger value="manager">담당자 로그인</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="customer">
            <CardContent className="flex flex-col gap-4 pt-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="customer-id">아이디</Label>
                <Input
                  id="customer-id"
                  placeholder="아이디를 입력하세요"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="customer-pw">비밀번호</Label>
                <Input
                  id="customer-pw"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
              </div>
              <Button className="w-full" size="lg" onClick={handleLogin}>
                로그인
              </Button>
            </CardContent>
            <CardFooter>
              <p className="w-full text-center text-xs text-muted-foreground">
                구매업체 담당자 전용 계정입니다
              </p>
            </CardFooter>
          </TabsContent>

          <TabsContent value="manager">
            <CardContent className="flex flex-col gap-4 pt-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="manager-id">아이디</Label>
                <Input
                  id="manager-id"
                  placeholder="아이디를 입력하세요"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="manager-pw">비밀번호</Label>
                <Input
                  id="manager-pw"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
              </div>
              <Button className="w-full" size="lg" onClick={handleLogin}>
                로그인
              </Button>
            </CardContent>
            <CardFooter>
              <p className="w-full text-center text-xs text-muted-foreground">
                조선선강 내부 직원 전용입니다
              </p>
            </CardFooter>
          </TabsContent>
        </Tabs>
      </Card>

      <footer className="mt-8 text-xs text-muted-foreground">
        &copy; 2025 조선선강. All rights reserved.
      </footer>
    </div>
  );
}
