import { cn } from "@/shared/lib/utils";
import { useFavoriteStore } from "@/shared/store";
import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
  imageUrl?: string;
  name?: string;
  disabled?: boolean;
  price?: number;
  id: number;
}

export const FavoriteItem: React.FC<Props> = ({ name, imageUrl, id, disabled }) => {
  const deleteFavoriteState = useFavoriteStore((state) => state.deleteFavorite);

  const deleteFavoriteItem = (favId: number) => {
    deleteFavoriteState(favId);
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl bg-white p-5 shadow-sm transition-all hover:shadow-md border-gray-100 border",
        { "opacity-50 pointer-events-none": disabled }
      )}
    >
      <div className="flex items-start">
        <div className="mr-5 flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-orange-50">
          <img src={imageUrl} alt={name} />
        </div>

        <div className="flex flex-1 flex-col">
          <div className="mb-1 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">{name}</h3>
          </div>

          <div className="mt-2 flex flex-wrap gap-2"></div>

          <div className="mt-3 items-center">
            <div className="flex justify-end items-center space-x-2">
              <button
                onClick={() => deleteFavoriteItem(id)}
                className="flex  h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:border-gray-300 hover:text-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>

              <Link href={`product/${id}`}>
                {" "}
                <button className="rounded-full bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600">
                  В корзину
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
