import {
  Categories,
  Container,
  Filters,
  SortPopap,
  Title,
  TopBar,
} from "@/components/shared";
import { ProductCard } from "@/components/shared/product-card";
import { ProductGroupList } from "@/components/shared/products-group-list";

export default function Home() {
  return (
    <>
      <Container>
        <Title text="Все пиццы" size="lg" className="font-extrabold"></Title>
      </Container>
      <TopBar />

      <Container className="pb-14 mt-10">
        <div className="flex gap-[150px]">
          {/* Фильтрация */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* Список товаров */}
          <div className="flex flex-col gap-16">
            <ProductGroupList
              title="Пиццы"
              items={[
                {
                  id: 1,
                  name: "Кебабная с аджикой",
                  price: 3500,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EF5622E6E8DBB7AD0C2EF8A641422A.avif",
                  items: [{ price: 3500 }],
                },

                {
                  id: 2,
                  name: "Пицца с копченым сыром",
                  price: 1200,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EF58EDF859B3EDBA0154776585517C.avif",
                  items: [{ price: 3500 }],
                },
                {
                  id: 3,
                  name: "Креветки со сладким чили",
                  price: 1000,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EF01FD3C2AC8E791770181C4A9C04D.avif",
                  items: [{ price: 3500 }],
                },
                {
                  id: 4,
                  name: "Чоризо фреш",
                  price: 2500,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EE7D5FBD0756A6AAA0BBEBA01B343A.avif",
                  items: [{ price: 3500 }],
                },
                {
                  id: 5,
                  name: "Ветчина и сыр",
                  price: 1500,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EE7D5F6DF65F019BF69E6D8B69551F.avif",
                  items: [{ price: 3500 }],
                },

                {
                  id: 6,
                  name: "Сырная пицца",
                  price: 1200,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EE7D5F6DF65F019BF69E6D8B69551F.avif",
                  items: [{ price: 3500 }],
                },
              ]}
              categoryId={1}
            ></ProductGroupList>

            <ProductGroupList
              title="Комбо"
              items={[
                {
                  id: 1,
                  name: "Кебабная с аджикой",
                  price: 3500,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EF5622E6E8DBB7AD0C2EF8A641422A.avif",
                  items: [{ price: 3500 }],
                },

                {
                  id: 2,
                  name: "Пицца с копченым сыром",
                  price: 1200,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EF58EDF859B3EDBA0154776585517C.avif",
                  items: [{ price: 3500 }],
                },
                {
                  id: 3,
                  name: "Креветки со сладким чили",
                  price: 1000,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EF01FD3C2AC8E791770181C4A9C04D.avif",
                  items: [{ price: 3500 }],
                },
                {
                  id: 4,
                  name: "Чоризо фреш",
                  price: 2500,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EE7D5FBD0756A6AAA0BBEBA01B343A.avif",
                  items: [{ price: 3500 }],
                },
                {
                  id: 5,
                  name: "Ветчина и сыр",
                  price: 1500,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EE7D5F6DF65F019BF69E6D8B69551F.avif",
                  items: [{ price: 3500 }],
                },

                {
                  id: 6,
                  name: "Сырная пицца",
                  price: 1200,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EE7D5F6DF65F019BF69E6D8B69551F.avif",
                  items: [{ price: 3500 }],
                },
              ]}
              categoryId={2}
            ></ProductGroupList>
          </div>
        </div>
      </Container>
    </>
  );
}
