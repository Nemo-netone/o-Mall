import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "../types";

type ToastTone = "success" | "info" | "warn";

export interface ToastState {
  id: number;
  message: string;
  tone: ToastTone;
}

export type SheetType =
  | "ai"
  | "coupons"
  | "contact"
  | "address"
  | "orders"
  | "favorites"
  | "history"
  | "service"
  | "share"
  | "vip";

export interface SheetState {
  type: SheetType;
  title?: string;
  productId?: string;
  productName?: string;
  status?: string;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  line: string;
  tag: string;
}

interface ShopUiValue {
  toast: ToastState | null;
  sheet: SheetState | null;
  favorites: string[];
  claimedCoupons: string[];
  selectedAddress: Address;
  addresses: Address[];
  showToast: (message: string, tone?: ToastTone) => void;
  openSheet: (sheet: SheetState) => void;
  closeSheet: () => void;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (product: Product) => void;
  claimCoupon: (id: string) => void;
  selectAddress: (id: string) => void;
}

const STORAGE = {
  favorites: "o_mall_favorites_v1",
  coupons: "o_mall_coupons_v1",
  address: "o_mall_address_v1",
};

export const ADDRESSES: Address[] = [
  {
    id: "home",
    name: "张三",
    phone: "138****0000",
    line: "广东省深圳市南山区科技园 1 号楼 1808",
    tag: "默认",
  },
  {
    id: "office",
    name: "李女士",
    phone: "136****8899",
    line: "广东省广州市天河区珠江新城 88 号",
    tag: "公司",
  },
];

function readStringArray(key: string): string[] {
  try {
    const value = localStorage.getItem(key);
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function readAddressId(): string {
  try {
    return localStorage.getItem(STORAGE.address) || ADDRESSES[0]!.id;
  } catch {
    return ADDRESSES[0]!.id;
  }
}

const ShopUiContext = createContext<ShopUiValue | null>(null);

export function ShopUiProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null);
  const [sheet, setSheet] = useState<SheetState | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => readStringArray(STORAGE.favorites));
  const [claimedCoupons, setClaimedCoupons] = useState<string[]>(() => readStringArray(STORAGE.coupons));
  const [selectedAddressId, setSelectedAddressId] = useState(readAddressId);

  useEffect(() => {
    localStorage.setItem(STORAGE.favorites, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(STORAGE.coupons, JSON.stringify(claimedCoupons));
  }, [claimedCoupons]);

  useEffect(() => {
    localStorage.setItem(STORAGE.address, selectedAddressId);
  }, [selectedAddressId]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const showToast = useCallback((message: string, tone: ToastTone = "success") => {
    setToast({ id: Date.now(), message, tone });
  }, []);

  const openSheet = useCallback((next: SheetState) => {
    setSheet(next);
  }, []);

  const closeSheet = useCallback(() => {
    setSheet(null);
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const toggleFavorite = useCallback(
    (product: Product) => {
      setFavorites((prev) => {
        if (prev.includes(product.id)) {
          showToast("已取消收藏", "info");
          return prev.filter((id) => id !== product.id);
        }
        showToast("已加入收藏");
        return [...prev, product.id];
      });
    },
    [showToast],
  );

  const claimCoupon = useCallback(
    (id: string) => {
      setClaimedCoupons((prev) => {
        if (prev.includes(id)) {
          showToast("这张优惠券已领取", "info");
          return prev;
        }
        showToast("优惠券已放入账户");
        return [...prev, id];
      });
    },
    [showToast],
  );

  const selectAddress = useCallback(
    (id: string) => {
      setSelectedAddressId(id);
      showToast("收货地址已切换");
    },
    [showToast],
  );

  const selectedAddress = ADDRESSES.find((item) => item.id === selectedAddressId) ?? ADDRESSES[0]!;

  const value = useMemo<ShopUiValue>(
    () => ({
      toast,
      sheet,
      favorites,
      claimedCoupons,
      selectedAddress,
      addresses: ADDRESSES,
      showToast,
      openSheet,
      closeSheet,
      isFavorite,
      toggleFavorite,
      claimCoupon,
      selectAddress,
    }),
    [
      toast,
      sheet,
      favorites,
      claimedCoupons,
      selectedAddress,
      showToast,
      openSheet,
      closeSheet,
      isFavorite,
      toggleFavorite,
      claimCoupon,
      selectAddress,
    ],
  );

  return <ShopUiContext.Provider value={value}>{children}</ShopUiContext.Provider>;
}

export function useShopUi(): ShopUiValue {
  const ctx = useContext(ShopUiContext);
  if (!ctx) {
    throw new Error("useShopUi 必须在 ShopUiProvider 内使用");
  }
  return ctx;
}
