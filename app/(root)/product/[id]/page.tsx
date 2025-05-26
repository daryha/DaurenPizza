import { Container, ProductForm } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-cient";
import { notFound } from "next/navigation";

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingridient: true,
      Category: {
        include: {
          products: {
            include: {
              variation: true,
            },
          },
        },
      },
      variation: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <ProductForm product={product} />
    </Container>
  );
}
