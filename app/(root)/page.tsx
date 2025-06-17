import { Container, Filters, Title, TopBar } from "@/shared/components/shared";

import { ProductGroupList } from "@/shared/components/shared/products-group-list";
import { Stories } from "@/shared/components/shared/stories";
import { findPizzas, GerSearchParams } from "@/shared/lib/find-pizzas";

export default async function Home({ searchParams }: { searchParams: Promise<GerSearchParams> }) {
  const categories = await findPizzas(searchParams);

  return (
    <div>
      <Container>
        <Title text="Все пиццы" size="lg" className="font-extrabold"></Title>
      </Container>
      <TopBar categories={categories.filter((category) => category.products.length > 0)} />
      <Stories />

      <Container className="pb-14 mt-10">
        <div className="flex gap-[90px]">
          <div className="w-[250px]">
            <Filters />
          </div>

          <div className="flex flex-col gap-2">
            {categories.map(
              (category) =>
                category.products.length > 0 && (
                  <ProductGroupList
                    key={category.id}
                    categoryId={category.id}
                    title={category.name}
                    items={category.products}
                    
                  />
                )
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
