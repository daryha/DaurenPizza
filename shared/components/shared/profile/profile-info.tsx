"use client";

import React, { useEffect } from "react";
import { OrderCard } from "./order-card";
import { ProfileForm } from "../profile-form";
import { User } from "@prisma/client";
import { Container } from "../container";
import { Favorite } from "./favorite";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  data: User;
}

export const ProfileInfo: React.FC<Props> = ({ data }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTab = searchParams.has("favorites")
    ? "favorites"
    : searchParams.has("orders")
      ? "orders"
      : "profile";
  const [activeTab, setActiveTab] = React.useState<string>(initialTab);

  useEffect(() => {
    const newTab = searchParams.has("favorites")
      ? "favorites"
      : searchParams.has("orders")
        ? "orders"
        : "profile";

    setActiveTab(newTab);
  }, [searchParams]);

  const switchTab = (tab: "profile" | "favorites" | "orders") => {
    setActiveTab(tab);

    let newQuery;
    if (tab === "profile") {
      newQuery = "?profile";
    }
    if (tab === "favorites") {
      newQuery = "?favorites";
    }
    if (tab === "orders") {
      newQuery = "?orders";
    }

    router.replace(`/profile${newQuery}`);
  };

  return (
    <Container>
      <div className="mx-auto max-w-6xl px-4 pt-4 mb-11">
        <div className="flex rounded-2xl bg-white p-1.5 shadow-md">
          <button
            className={`relative flex-1 rounded-xl py-3 text-center text-sm font-medium transition-all duration-300 ${activeTab === "profile" ? "bg-orange-500 text-white shadow-md" : "text-gray-600 hover:bg-orange-50"}`}
            onClick={() => switchTab("profile")}
          >
            <span className="relative z-10">Профиль</span>
            {activeTab === "profile" && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600"></div>
            )}
          </button>
          <button
            className={`relative mx-2 flex-1 rounded-xl py-3 text-center text-sm font-medium transition-all duration-300 ${activeTab === "favorites" ? "bg-orange-500 text-white shadow-md" : "text-gray-600 hover:bg-orange-50"}`}
            onClick={() => switchTab("favorites")}
          >
            <span className="relative z-10">Любимые товары</span>
            {activeTab === "favorites" && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600"></div>
            )}
          </button>
          <button
            className={`relative flex-1 rounded-xl py-3 text-center text-sm font-medium transition-all duration-300 ${activeTab === "orders" ? "bg-orange-500 text-white shadow-md" : "text-gray-600 hover:bg-orange-50"}`}
            onClick={() => switchTab("orders")}
          >
            <span className="relative z-10">История заказов</span>
            {activeTab === "orders" && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600"></div>
            )}
          </button>
        </div>
      </div>
      {activeTab === "profile" && <ProfileForm data={data} />}
      {activeTab === "favorites" && <Favorite />}
      {activeTab === "orders" && <OrderCard />}
    </Container>
  );
};
