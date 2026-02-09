// ==================== 제품 카테고리 ====================
export const PRODUCT_CATEGORIES = [
  { code: "01", name: "피복아크 용접봉" },
  { code: "02", name: "플럭스 코어드 와이어" },
  { code: "03", name: "서브머지드 플럭스 및 와이어" },
  { code: "04", name: "솔리드 와이어" },
  { code: "05", name: "미그 와이어" },
  { code: "06", name: "티그 와이어" },
  { code: "07", name: "산소아세틸렌 용접봉" },
] as const;

// ==================== 품목 데이터 ====================
export interface Product {
  id: string;
  name: string;
  categoryCode: string;
  categoryName: string;
  aws: string;
  ks: string;
  jis: string;
  en: string;
  certified: boolean;
  msds: boolean;
  unitPrice: number;
  stock: number;
}

export const PRODUCTS: Product[] = [
  {
    id: "P001",
    name: "CL-200",
    categoryCode: "01",
    categoryName: "피복아크 용접봉",
    aws: "E7010-A1",
    ks: "DT1216",
    jis: "E4910-1M3",
    en: "E Mo B 2 1",
    certified: false,
    msds: false,
    unitPrice: 15000,
    stock: 1800,
  },
  {
    id: "P002",
    name: "CM-98P",
    categoryCode: "01",
    categoryName: "피복아크 용접봉",
    aws: "E8018-B2",
    ks: "DT2318",
    jis: "E5518-1CM",
    en: "E CrMo1 B 3 2",
    certified: false,
    msds: false,
    unitPrice: 18500,
    stock: 920,
  },
  {
    id: "P003",
    name: "CR-24N",
    categoryCode: "01",
    categoryName: "피복아크 용접봉",
    aws: "E7024-1",
    ks: "E4324",
    jis: "E4924-1",
    en: "E 42 0 RR 5 3",
    certified: false,
    msds: false,
    unitPrice: 13000,
    stock: 2100,
  },
  {
    id: "P004",
    name: "NC-308LSi",
    categoryCode: "01",
    categoryName: "피복아크 용접봉",
    aws: "E308L-17",
    ks: "E308L-16",
    jis: "ES308L-17",
    en: "E 19 9 L R 1 2",
    certified: false,
    msds: true,
    unitPrice: 25000,
    stock: 650,
  },
  {
    id: "P005",
    name: "LC-318NH",
    categoryCode: "01",
    categoryName: "피복아크 용접봉",
    aws: "E7018-1 H4R",
    ks: "E5016",
    jis: "E4918-1 H5",
    en: "-",
    certified: false,
    msds: true,
    unitPrice: 14000,
    stock: 3500,
  },
  {
    id: "P006",
    name: "CR-13",
    categoryCode: "01",
    categoryName: "피복아크 용접봉",
    aws: "E6013",
    ks: "E4313",
    jis: "E4313",
    en: "E 43 0 R 11",
    certified: false,
    msds: true,
    unitPrice: 12500,
    stock: 3200,
  },
  {
    id: "P007",
    name: "CSF-71T",
    categoryCode: "02",
    categoryName: "플럭스 코어드 와이어",
    aws: "E71T-1C",
    ks: "-",
    jis: "-",
    en: "-",
    certified: false,
    msds: true,
    unitPrice: 18000,
    stock: 150,
  },
  {
    id: "P008",
    name: "MC-50T",
    categoryCode: "04",
    categoryName: "솔리드 와이어",
    aws: "ER70S-6",
    ks: "YGW12",
    jis: "YGW12",
    en: "G 42 2 M G3Si1",
    certified: true,
    msds: true,
    unitPrice: 22000,
    stock: 1200,
  },
  {
    id: "P009",
    name: "TGC-308",
    categoryCode: "06",
    categoryName: "티그 와이어",
    aws: "ER308L",
    ks: "YS308L",
    jis: "YS308L",
    en: "W 19 9 L",
    certified: true,
    msds: false,
    unitPrice: 35000,
    stock: 400,
  },
  {
    id: "P010",
    name: "CSF-690S",
    categoryCode: "02",
    categoryName: "플럭스 코어드 와이어",
    aws: "E81T1-Ni1C",
    ks: "-",
    jis: "-",
    en: "-",
    certified: false,
    msds: true,
    unitPrice: 28000,
    stock: 800,
  },
];

// ==================== 주문 상태 ====================
export type OrderStatus = "요청" | "검토중" | "승인" | "반려" | "처리대기";

export interface OrderItem {
  seq: number;
  productId: string;
  productName: string;
  categoryName: string;
  aws: string;
  quantity: number;
  unit: string;
  deliveryDate: string;
  requestDate: string;
  poRequestDate: string;
  unitPrice?: number;
  sapStock?: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  companyName: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  requestDate: string;
  status: OrderStatus;
  items: OrderItem[];
  remark?: string;
  assignee?: string;
  waitDays?: number;
}

export const CUSTOMER_ORDERS: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2025-0042",
    companyName: "한국중공업(주)",
    contactPerson: "김철수",
    contactPhone: "02-1234-5678",
    contactEmail: "cs.kim@hanhwa.co.kr",
    requestDate: "2025-02-07",
    status: "검토중",
    waitDays: 2,
    items: [
      { seq: 1, productId: "P006", productName: "CR-13", categoryName: "피복아크 용접봉", aws: "E6013", quantity: 500, unit: "kg", deliveryDate: "2025-03-01", requestDate: "2025-02-07", poRequestDate: "2025-02-15", unitPrice: 12500, sapStock: 3200 },
      { seq: 2, productId: "P007", productName: "CSF-71T", categoryName: "플럭스 코어드 와이어", aws: "E71T-1C", quantity: 200, unit: "kg", deliveryDate: "2025-03-15", requestDate: "2025-02-07", poRequestDate: "2025-02-20", unitPrice: 18000, sapStock: 150 },
      { seq: 3, productId: "P008", productName: "MC-50T", categoryName: "솔리드 와이어", aws: "ER70S-6", quantity: 100, unit: "kg", deliveryDate: "2025-03-10", requestDate: "2025-02-07", poRequestDate: "2025-02-18", unitPrice: 22000, sapStock: 1200 },
    ],
  },
  {
    id: "2",
    orderNumber: "ORD-2025-0041",
    companyName: "대우조선(주)",
    contactPerson: "이영미",
    contactPhone: "051-234-5678",
    contactEmail: "ym.lee@daewoo.co.kr",
    requestDate: "2025-02-05",
    status: "승인",
    waitDays: 4,
    assignee: "박영희",
    items: [
      { seq: 1, productId: "P005", productName: "LC-318NH", categoryName: "피복아크 용접봉", aws: "E7018-1 H4R", quantity: 300, unit: "kg", deliveryDate: "2025-03-01", requestDate: "2025-02-05", poRequestDate: "2025-02-12" },
      { seq: 2, productId: "P004", productName: "NC-308LSi", categoryName: "피복아크 용접봉", aws: "E308L-17", quantity: 150, unit: "kg", deliveryDate: "2025-03-10", requestDate: "2025-02-05", poRequestDate: "2025-02-15" },
    ],
  },
  {
    id: "3",
    orderNumber: "ORD-2025-0040",
    companyName: "삼성중공업(주)",
    contactPerson: "박지훈",
    contactPhone: "055-234-5678",
    contactEmail: "jh.park@shi.co.kr",
    requestDate: "2025-02-03",
    status: "반려",
    remark: "재고 부족",
    waitDays: 6,
    assignee: "박영희",
    items: [
      { seq: 1, productId: "P007", productName: "CSF-71T", categoryName: "플럭스 코어드 와이어", aws: "E71T-1C", quantity: 500, unit: "kg", deliveryDate: "2025-02-28", requestDate: "2025-02-03", poRequestDate: "2025-02-10" },
    ],
  },
  {
    id: "4",
    orderNumber: "ORD-2025-0039",
    companyName: "현대미포조선(주)",
    contactPerson: "최수진",
    contactPhone: "052-234-5678",
    contactEmail: "sj.choi@hmd.co.kr",
    requestDate: "2025-01-30",
    status: "승인",
    waitDays: 8,
    assignee: "이민수",
    items: [
      { seq: 1, productId: "P004", productName: "NC-308LSi", categoryName: "피복아크 용접봉", aws: "E308L-17", quantity: 200, unit: "kg", deliveryDate: "2025-02-28", requestDate: "2025-01-30", poRequestDate: "2025-02-05" },
      { seq: 2, productId: "P006", productName: "CR-13", categoryName: "피복아크 용접봉", aws: "E6013", quantity: 800, unit: "kg", deliveryDate: "2025-02-28", requestDate: "2025-01-30", poRequestDate: "2025-02-05" },
      { seq: 3, productId: "P008", productName: "MC-50T", categoryName: "솔리드 와이어", aws: "ER70S-6", quantity: 300, unit: "kg", deliveryDate: "2025-03-01", requestDate: "2025-01-30", poRequestDate: "2025-02-07" },
      { seq: 4, productId: "P009", productName: "TGC-308", categoryName: "티그 와이어", aws: "ER308L", quantity: 50, unit: "kg", deliveryDate: "2025-03-05", requestDate: "2025-01-30", poRequestDate: "2025-02-08" },
    ],
  },
  {
    id: "5",
    orderNumber: "ORD-2025-0038",
    companyName: "STX조선(주)",
    contactPerson: "정민호",
    contactPhone: "055-345-6789",
    contactEmail: "mh.jung@stx.co.kr",
    requestDate: "2025-01-28",
    status: "승인",
    waitDays: 10,
    assignee: "이민수",
    items: [
      { seq: 1, productId: "P008", productName: "MC-50T", categoryName: "솔리드 와이어", aws: "ER70S-6", quantity: 400, unit: "kg", deliveryDate: "2025-02-25", requestDate: "2025-01-28", poRequestDate: "2025-02-03" },
      { seq: 2, productId: "P001", productName: "CL-200", categoryName: "피복아크 용접봉", aws: "E7010-A1", quantity: 250, unit: "kg", deliveryDate: "2025-02-28", requestDate: "2025-01-28", poRequestDate: "2025-02-05" },
    ],
  },
  {
    id: "6",
    orderNumber: "ORD-2025-0037",
    companyName: "한진중공업(주)",
    contactPerson: "강서연",
    contactPhone: "051-456-7890",
    contactEmail: "sy.kang@hanjin.co.kr",
    requestDate: "2025-01-25",
    status: "요청",
    assignee: "박영희",
    items: [
      { seq: 1, productId: "P009", productName: "TGC-308", categoryName: "티그 와이어", aws: "ER308L", quantity: 100, unit: "kg", deliveryDate: "2025-02-20", requestDate: "2025-01-25", poRequestDate: "2025-01-30" },
    ],
  },
  {
    id: "7",
    orderNumber: "ORD-2025-0036",
    companyName: "한국중공업(주)",
    contactPerson: "김철수",
    contactPhone: "02-1234-5678",
    contactEmail: "cs.kim@hanhwa.co.kr",
    requestDate: "2025-01-22",
    status: "승인",
    assignee: "박영희",
    items: [
      { seq: 1, productId: "P002", productName: "CM-98P", categoryName: "피복아크 용접봉", aws: "E8018-B2", quantity: 600, unit: "kg", deliveryDate: "2025-02-15", requestDate: "2025-01-22", poRequestDate: "2025-01-28" },
      { seq: 2, productId: "P003", productName: "CR-24N", categoryName: "피복아크 용접봉", aws: "E7024-1", quantity: 200, unit: "kg", deliveryDate: "2025-02-20", requestDate: "2025-01-22", poRequestDate: "2025-01-30" },
      { seq: 3, productId: "P006", productName: "CR-13", categoryName: "피복아크 용접봉", aws: "E6013", quantity: 350, unit: "kg", deliveryDate: "2025-02-18", requestDate: "2025-01-22", poRequestDate: "2025-01-29" },
    ],
  },
  {
    id: "8",
    orderNumber: "ORD-2025-0035",
    companyName: "대우조선(주)",
    contactPerson: "이영미",
    contactPhone: "051-234-5678",
    contactEmail: "ym.lee@daewoo.co.kr",
    requestDate: "2025-01-20",
    status: "검토중",
    assignee: "이민수",
    items: [
      { seq: 1, productId: "P003", productName: "CR-24N", categoryName: "피복아크 용접봉", aws: "E7024-1", quantity: 450, unit: "kg", deliveryDate: "2025-02-10", requestDate: "2025-01-20", poRequestDate: "2025-01-25" },
      { seq: 2, productId: "P010", productName: "CSF-690S", categoryName: "플럭스 코어드 와이어", aws: "E81T1-Ni1C", quantity: 300, unit: "kg", deliveryDate: "2025-02-15", requestDate: "2025-01-20", poRequestDate: "2025-01-28" },
    ],
  },
];

// ==================== 사용자 데이터 ====================
export interface User {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  registeredDate: string;
  lastLogin: string;
  status: "활성" | "비활성";
}

export const USERS: User[] = [
  { id: "1", companyName: "한국중공업(주)", contactPerson: "김철수", phone: "02-1234-5678", email: "cs.kim@hanhwa.co.kr", registeredDate: "2024-03-15", lastLogin: "2025-02-09", status: "활성" },
  { id: "2", companyName: "대우조선(주)", contactPerson: "이영미", phone: "051-234-5678", email: "ym.lee@daewoo.co.kr", registeredDate: "2024-03-15", lastLogin: "2025-02-08", status: "활성" },
  { id: "3", companyName: "삼성중공업(주)", contactPerson: "박지훈", phone: "055-234-5678", email: "jh.park@shi.co.kr", registeredDate: "2024-04-01", lastLogin: "2025-02-07", status: "활성" },
  { id: "4", companyName: "현대미포조선(주)", contactPerson: "최수진", phone: "052-234-5678", email: "sj.choi@hmd.co.kr", registeredDate: "2024-04-01", lastLogin: "2025-02-05", status: "활성" },
  { id: "5", companyName: "STX조선(주)", contactPerson: "정민호", phone: "055-345-6789", email: "mh.jung@stx.co.kr", registeredDate: "2024-05-10", lastLogin: "2025-01-20", status: "활성" },
  { id: "6", companyName: "한진중공업(주)", contactPerson: "강서연", phone: "051-456-7890", email: "sy.kang@hanjin.co.kr", registeredDate: "2024-05-10", lastLogin: "2025-01-15", status: "활성" },
  { id: "7", companyName: "(주)세아제강", contactPerson: "윤태영", phone: "02-567-8901", email: "ty.yoon@seahsteel.co.kr", registeredDate: "2024-06-01", lastLogin: "2024-12-20", status: "비활성" },
  { id: "8", companyName: "동국제강(주)", contactPerson: "임수빈", phone: "02-678-9012", email: "sb.lim@dongkuk.co.kr", registeredDate: "2024-06-01", lastLogin: "2024-11-05", status: "비활성" },
];

// ==================== 공지사항 ====================
export const NOTICES = [
  { id: "1", title: "2025년 1분기 가격 변동 안내", date: "2025-02-01" },
  { id: "2", title: "설 연휴 배송 일정 안내", date: "2025-01-20" },
  { id: "3", title: "신제품 CSF-690S 출시 안내", date: "2025-01-10" },
];

// ==================== 활동 로그 ====================
export const ACTIVITY_LOGS = [
  { time: "14:30", user: "박영희", action: "ORD-2025-0041 승인", company: "대우조선(주)" },
  { time: "11:20", user: "박영희", action: "ORD-2025-0039 검토 시작", company: "현대미포조선(주)" },
  { time: "09:45", user: "이민수", action: "ORD-2025-0038 반려", company: "STX조선(주)", remark: "재고 부족" },
  { time: "어제 17:00", user: "박영희", action: "ORD-2025-0037 승인", company: "삼성중공업(주)" },
  { time: "어제 15:30", user: "이민수", action: "ORD-2025-0036 승인", company: "한국중공업(주)" },
];

// ==================== 처리 이력 ====================
export const ORDER_HISTORY = [
  { date: "2025-02-08 14:30", action: "담당자 검토 시작", description: "박영희님이 검토를 시작했습니다" },
  { date: "2025-02-07 09:15", action: "주문요청 접수", description: "정상적으로 접수되었습니다" },
];
