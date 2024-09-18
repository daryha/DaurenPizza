import {
  Categories,
  Container,
  Filters,
  SortPopap,
  Title,
  TopBar,
} from "@/components/shared";
import { ProductCard } from "@/components/shared/product-card";

export default function Home() {
  return (
    <>
      <Container>
        <Title text="Все пиццы" size="lg" className="font-extrabold"></Title>
      </Container>
      <TopBar />

      <Container className="pb-14 mt-10">
        <div className="flex gap-[60px]">
          {/* Фильтрация */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* Список товаров */}
          <div className="flex flex-col gap-16">
            <ProductCard />
          </div>
        </div>
      </Container>
    </>
  );
}
