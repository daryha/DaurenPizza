"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formRegisterSchema, TformRegisterSchema } from "./modals/auth-modal/forms/schemas";
import { User } from "@prisma/client";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { Container } from "./container";
import { Title } from "./title";
import { Button } from "../ui";
import { FormInput } from "./form";
import { updateUserInfo } from "@/app/actions";

interface Props {
  className?: string;
  data: User;
}

export const ProfileForm: React.FC<Props> = ({ className, data }) => {
  const form = useForm({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: data.fullName,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TformRegisterSchema) => {
    try {
      await updateUserInfo({
        fullName: data.fullName,
        password: data.password,
      });

      toast.error("Данные обновлены 📝", {
        icon: "✅",
      });
    } catch (error) {
      return toast.error("Ошибка при обновлении данных", {
        icon: "❌",
      });
    }
  };

  const onClickSignOut = () => {
    const cartCookie = ["cartToken=", "path=/", "max-age=0"].join("; ");

    document.cookie = cartCookie;
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <Container className="my-10  flex justify-center">
      <div>
        <Title text={`Личные данные | #${data.id}`} size="md" className="font-bold" />
        <FormProvider {...form}>
          <form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput name="fullName" label="Полное имя" required />

            <FormInput type="password" name="password" label="Новый пароль" required />
            <FormInput type="password" name="confirmPassword" label="Повторите пароль" required />

            <Button
              disabled={form.formState.isSubmitting}
              className="text-base mt-10"
              type="submit"
            >
              Сохранить
            </Button>

            <Button
              onClick={onClickSignOut}
              variant="secondary"
              disabled={form.formState.isSubmitting}
              className="text-base"
              type="button"
            >
              Выйти
            </Button>
          </form>
        </FormProvider>
      </div>
    </Container>
  );
};
