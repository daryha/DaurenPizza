import { PaymentData } from "@/types/yooukassa";
import axios from "axios";

interface Props {
  description: string;
  orderId: number;
  amount: number | null;
}

export async function createPayment(details: Props) {
  const { data } = await axios.post<PaymentData>(
    "https://api.yookassa.ru/v3/payments",
    {
      amount: {
        value: details.amount,
        currency: "RUB",
      },

      capture: true,
      description: details.description,
      metadata: {
        order_id: details.orderId,
      },
      confirmation: {
        type: "redirect",
        return_url: process.env.YOOUKASSA_CALLBACK_URL,
      },
    },
    {
      auth: {
        username: process.env.YOOUKASSA_STORE_ID as string,
        password: process.env.YOOUKASSA_API_KEY as string,
      },
      headers: {
        "Content-Type": "application/json",
        "Idempotence-Key": Math.random().toString(36).substring(7),
      },
    }
  );

  return data;
}
