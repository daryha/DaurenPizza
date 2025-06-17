import React from "react";

interface Props {
  className?: string;
}

export const OrderItemCardSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div className="flex items-center justify-between py-2 animate-pulse">
      <div className="flex items-center">
        <div className="mr-3 h-12 w-12 rounded-full bg-gray-200"></div>
        <div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
          <div className="h-3 w-20 bg-gray-200 rounded mt-2"></div>
        </div>
      </div>
      <div className="h-4 w-16 bg-gray-200 rounded"></div>
    </div>
  );
};
