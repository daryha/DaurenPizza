import * as React from "react";

interface Props {
  firstName?: string;
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
  amountInRub?: number;
}

export const PayOrderTemplate: React.FC<Props> = ({
  firstName,
  orderId,
  totalAmount,
  paymentUrl,
  amountInRub,
}) => (
  <div>
    ваш заказ №<b>{orderId}</b> на сумму {totalAmount} {amountInRub} тнг перейдите по ссылке для
    оплаты: {paymentUrl}

    
  </div>
);
