import { prisma } from "@/prisma/prisma-cient";
import { ProfileForm } from "@/shared/components";
import { getUserSession } from "@/shared/lib/get-user-session";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getUserSession();

  if (!session) {
    return redirect("/not-auth");
  }

  const data = await prisma.user.findFirst({
    where: {
      email: String(session.email),
    },
  });

  if (!data) {
    return redirect("/not-auth");
  }

  return (
    <div>
      <ProfileForm data={data} />
    </div>
  );
}
