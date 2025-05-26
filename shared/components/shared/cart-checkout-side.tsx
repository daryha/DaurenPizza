import React from "react";
import { WhiteBlock } from "./white-block";
import { CheckoutCount } from "./checkout-count";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button, Skeleton } from "../ui";

interface Props {
  totalAmount: number;
  loading: boolean;
}

const VAT = 15;
const DELIVERY_PRICE = 250;

export const CartCheckoutSide: React.FC<Props> = ({ totalAmount, loading }) => {
  const vatPrice = (totalAmount * VAT) / 100;
  const totalPrice = vatPrice + DELIVERY_PRICE + totalAmount;

  return (
    <div className="w-[450px]">
      <WhiteBlock className="p-6 sticky top-4">
        <div className=" flex flex-col gap-1">
          <span className="text-xl">Итого:</span>
          {loading ? (
            <Skeleton className="w-48 h-[51px]" />
          ) : (
            <span className="text-[34px] font-extrabold">{totalPrice} ₸</span>
          )}
        </div>

        <div>
          <CheckoutCount
            title={
              <>
                <div className="flex items-center">
                  <Package size={18} className="mr-2 text-gray-400" />
                  Стоимость корзины
                </div>
              </>
            }
            price={loading ? <Skeleton className="w-12 h-6" /> : totalAmount}
          />
          <CheckoutCount
            title={
              <>
                <div className="flex items-center">
                  <Percent size={18} className="mr-2 text-gray-400" /> Налоги
                </div>
              </>
            }
            price={loading ? <Skeleton className="w-12 h-6" /> : vatPrice}
          />
          <CheckoutCount
            title={
              <>
                <div className="flex items-center">
                  <Truck size={18} className="mr-2 text-gray-400" />
                  Доставка
                </div>
              </>
            }
            price={loading ? <Skeleton className="w-12 h-6" /> : DELIVERY_PRICE}
          />
        </div>

        <Button
          loading={loading}
          type="submit"
          className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
        >
          Перейти к оплате
          <ArrowRight className="w-5 ml-2" />
        </Button>
      </WhiteBlock>
    </div>
  );
};
