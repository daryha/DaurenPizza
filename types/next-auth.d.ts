// next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";
import type { UserRole } from "@prisma/client";

declare module "next-auth" {
  // Расширяем дефолтную сессию
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      role: UserRole;
      // если хотите fullName отдельно:
      fullName?: string;
    };
  }

  // Расширяем дефолтный User (из базы)
  interface User extends DefaultUser {
    id: number;
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  // Расширяем JWT, чтобы туда попадали ваши поля
  interface JWT extends DefaultJWT {
    id: string;
    role: UserRole;
    fullName?: string;
  }
}
