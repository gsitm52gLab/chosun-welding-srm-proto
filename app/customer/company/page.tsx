"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppHeader } from "@/components/app-header";

export default function CustomerCompanyPage() {
  return (
    <>
      <AppHeader
        title="업체정보"
        userName="김철수"
        companyName="한국중공업(주)"
      />
      <main className="flex-1 overflow-y-auto p-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">업체 기본 정보</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex items-center gap-2">
                <span className="w-24 shrink-0 text-sm text-muted-foreground">
                  업체명
                </span>
                <span className="text-sm font-medium">한국중공업(주)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-24 shrink-0 text-sm text-muted-foreground">
                  사업자번호
                </span>
                <span className="text-sm font-medium">123-45-67890</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-24 shrink-0 text-sm text-muted-foreground">
                  담당자
                </span>
                <span className="text-sm font-medium">김철수</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-24 shrink-0 text-sm text-muted-foreground">
                  연락처
                </span>
                <span className="text-sm font-medium">02-1234-5678</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-24 shrink-0 text-sm text-muted-foreground">
                  이메일
                </span>
                <span className="text-sm font-medium">
                  cs.kim@hanhwa.co.kr
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-24 shrink-0 text-sm text-muted-foreground">
                  주소
                </span>
                <span className="text-sm font-medium">
                  서울특별시 영등포구 여의대로 108
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-24 shrink-0 text-sm text-muted-foreground">
                  계약 시작일
                </span>
                <span className="text-sm font-medium">2024-03-15</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-24 shrink-0 text-sm text-muted-foreground">
                  계정 상태
                </span>
                <span className="text-sm font-medium text-green-600">
                  활성
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
