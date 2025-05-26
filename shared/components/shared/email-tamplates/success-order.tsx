import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import * as React from "react";

interface Props {
  firstName?: string;
  orderId: number;
  totalAmount: number;
  items: CartItemDTO[];
}

export const SuccessTemplate: React.FC<Props> = ({ firstName, orderId, items }) => (
  <div>
    <h1>Спасибо за покупку</h1>

    <hr />

    <p>Ваш заказ #{orderId} успешно оплачен. Список товаров: </p>

    <ul>
      {items.map((item) => (
        <li>
          {item.Variation.product.name} | {item.Variation.price} ₸ х {item.quantity} шт. =
          {item.Variation.price * item.quantity}
        </li>
      ))}
    </ul>
  </div>
);
