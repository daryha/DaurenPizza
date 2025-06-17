import { Heart } from "lucide-react";
import React, { useEffect } from "react";
import { FavoriteItem } from "./favorite-item";
import { useFavoriteStore } from "@/shared/store";

interface Props {}

export const Favorite: React.FC<Props> = ({}) => {
  const items = useFavoriteStore((state) => state.items);
  const loading = useFavoriteStore((state) => state.loading);
  const fetchFav = useFavoriteStore((state) => state.fetchFavorite);

  useEffect(() => {
    fetchFav();
  }, [fetchFav]);

  return (
    <div className="mb-[500px]">
      <div className="mb-14 overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 p-8 shadow-xl ">
        <div className="relative">
          <div className="absolute -right-20 -top-32 h-64 w-64 rounded-full bg-orange-400 opacity-20"></div>
          <div className="absolute -left-16 -bottom-16 h-40 w-40 rounded-full bg-white opacity-10"></div>

          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h1 className="text-3xl font-extrabold text-white">Любимые товары</h1>
              <p className="mt-2 max-w-lg text-orange-50">
                Здесь собраны ваши любимые блюда и напитки для быстрого заказа. Добавляйте новые
                товары, нажимая на значок сердечка в каталоге.
              </p>
            </div>

            <div className="flex h-16 items-center justify-center gap-2 rounded-2xl bg-white/20 px-6 backdrop-blur-sm">
              <Heart className="" color="white" width={23} />
              <span className="text-2xl font-bold text-white">{items.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          "Load"
        ) : (
          <>
            {items.map((item) => (
              <FavoriteItem
                key={item.id}
                id={item.product.id}
                name={item.product.name}
                imageUrl={item.product.imageUrl}
                disabled={item.disabled}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
