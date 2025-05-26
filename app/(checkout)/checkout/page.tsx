"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm,
  CartCheckoutSide,
  Container,
  Title,
} from "@/shared/components";
import { CheckoutFormSchema, CheckoutFormValues } from "@/shared/constants";
import { useCart } from "@/shared/hooks";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import React from "react";
import { useSession } from "next-auth/react";
import { Api } from "@/shared/services/api-client";

export default function CheckoutPage() {
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading } = useCart();
  const [submit, setSubmit] = React.useState(false);

  const { data: session } = useSession();

  const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(CheckoutFormSchema),
    defaultValues: {
      email: "daryha56@gmail.com",
      firstName: "DAUREN",
      lastName: "BALGABEKOV",
      phone: "87479716857",
      address: "пр-кт Мангилик Ел",
      comment: "",
    },
  });

  React.useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();
      const [firstName, lastName] = data.fullName.split("");

      form.setValue("firstName", firstName);
      form.setValue("lastName", lastName);
      form.setValue("email", data.email);
    }

    if (session) {
      fetchUserInfo();
    }
  }, []);

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmit(true);
      const url = await createOrder(data);
      toast.success("Заказ успешно оформлен! 💸 Переход на оплату... ");

      if (url) {
        location.href = url;
      }
    } catch (err) {
      setSubmit(false);
      console.log(err);
      toast.error("Не удалось создать заказ ", { icon: "❌" });
    }
  };

  return (
    <Container className="mt-10">
      <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px] "></Title>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            <div className="flex flex-col gap-5 flex-1 mb-20">
              <CheckoutCart
                items={items}
                removeCartItem={removeCartItem}
                onClickCountButton={onClickCountButton}
                loading={loading}
              />
              <CheckoutPersonalForm />
              <CheckoutAddressForm />
            </div>
            <CartCheckoutSide totalAmount={totalAmount} loading={loading || submit} />
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
