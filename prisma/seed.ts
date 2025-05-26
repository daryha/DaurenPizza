import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "./prisma-cient";
import { hashSync } from "bcrypt";
import { categories, ingredients, products } from "./constansts";

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min) / 10;
};

function generateToken(length = 16) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";

  for (let i = 0; i < length; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return token;
}

const token = generateToken(32);

const generateProductItem = ({
  productId,
  pizzaType,
  size,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
}) => {
  return {
    productId,
    price: randomNumber(1800, 7500),
    pizzaType,
    size,
  } as Prisma.VariationUncheckedCreateInput;
};

const up = async () => {
  await prisma.user.createMany({
    data: [
      {
        fullName: "User",
        email: " example@text.com",
        password: hashSync("1111", 10),
        verified: new Date(),
        role: "USER",
      },

      {
        fullName: "Admin",
        email: "Admin@text.com",
        password: hashSync("1111", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingridient.createMany({
    data: ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: "Пепперони фреш",
      imageUrl: "https://media.dodostatic.net/image/r:292x292/11ee7d612fc7b7fca5be822752bee1e5.jpg",
      categoryId: 1,
      ingridient: {
        connect: ingredients.slice(0, 5),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: "Сырная",
      imageUrl: "https://media.dodostatic.net/image/r:292x292/11ee7d610d2925109ab2e1c92cc5383c.jpg",
      categoryId: 1,
      ingridient: {
        connect: ingredients.slice(5, 10),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: "Чоризо фреш",
      imageUrl: "https://media.dodostatic.net/image/r:292x292/11ee7d61706d472f9a5d71eb94149304.jpg",
      categoryId: 1,
      ingridient: {
        connect: ingredients.slice(10, 40),
      },
    },
  });

  const pizza4 = await prisma.product.create({
    data: {
      name: "Маргарита",
      imageUrl:
        "https://media.dodostatic.net/image/r:292x292/11ee7d5f7dfcc07695bbb44734525217.avif",
      categoryId: 1,
      ingridient: {
        connect: ingredients.slice(1, 6),
      },
    },
  });

  const pizza5 = await prisma.product.create({
    data: {
      name: "Четыре сыра",
      imageUrl:
        "https://media.dodostatic.net/image/r:292x292/11ee7d5fabaed8998cac0985bfb698fa.avif",
      categoryId: 1,
      ingridient: {
        connect: ingredients.slice(1, 4),
      },
    },
  });

  const pizza6 = await prisma.product.create({
    data: {
      name: "Мясная с аджикой",
      imageUrl:
        "https://media.dodostatic.net/image/r:292x292/01940234f31471ecaf81873fe8d16c7d.avif",
      categoryId: 1,
      ingridient: {
        connect: ingredients.slice(6, 12),
      },
    },
  });

  const pizza7 = await prisma.product.create({
    data: {
      name: "Гавайская",
      imageUrl:
        "https://media.dodostatic.net/image/r:292x292/11ee7d5fd087dfc0ad3589c12cb6d605.avif",
      categoryId: 1,
      ingridient: {
        connect: ingredients.slice(6, 14),
      },
    },
  });

  const pizza8 = await prisma.product.create({
    data: {
      name: "Диабло",
      imageUrl:
        "https://media.dodostatic.net/image/r:292x292/11ee7d5fb110d0f0971c366c3fc0080a.avif",
      categoryId: 1,
      ingridient: {
        connect: ingredients.slice(3, 10),
      },
    },
  });

  const pizza9 = await prisma.product.create({
    data: {
      name: "Барбекю",
      imageUrl:
        "https://media.dodostatic.net/image/r:292x292/11ee7d5f909b2fc398eecbb0442c3c8f.avif",
      categoryId: 1,
      ingridient: {
        connect: ingredients.slice(4, 12),
      },
    },
  });

  const pizza10 = await prisma.product.create({
    data: {
      name: "Карбонара",
      imageUrl:
        "https://media.dodostatic.net/image/r:292x292/0194023ae8cb7270914357a76712d2d1.avif",
      categoryId: 1,
      ingridient: {
        connect: ingredients.slice(1, 8),
      },
    },
  });

  const pizza11 = await prisma.product.create({
    data: {
      name: "Супермясная",
      imageUrl:
        "https://media.dodostatic.net/image/r:292x292/11ee7d5f9a6b363082d450891d7fa8ac.avif",
      categoryId: 1,
      ingridient: {
        connect: ingredients.slice(4, 14),
      },
    },
  });

  const pizza12 = await prisma.product.create({
    data: {
      name: "Овощи и грибы",
      imageUrl:
        "https://media.dodostatic.net/image/r:292x292/11ee7d5fd6097096b601585d57f44a6f.avif",
      categoryId: 1,
      ingridient: {
        connect: ingredients.slice(5, 16),
      },
    },
  });

  const pizza13 = await prisma.product.create({
    data: {
      name: "Додо Микс",
      imageUrl:
        "https://media.dodostatic.net/image/r:292x292/0195dc91fefd74acad2c7c561cb66d0b.avif",
      categoryId: 1,
      ingridient: {
        connect: ingredients.slice(0, 12),
      },
    },
  });

  const pizza14 = await prisma.product.create({
    data: {
      name: "Цыпленок ранч",
      imageUrl:
        "https://media.dodostatic.net/image/r:584x584/11ef8faad57aab47be656ed69c86d2c6.avif",
      categoryId: 1,
      ingridient: {
        connect: ingredients.slice(4, 13),
      },
    },
  });

  await prisma.variation.createMany({
    data: [
      // Пицца "Пепперони фреш"
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),

      // Пицца "Сырная"
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza4.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza7.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza7.id, pizzaType: 2, size: 40 }),
      generateProductItem({ productId: pizza7.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza7.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza8.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza8.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza8.id, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza9.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza9.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza9.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza9.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza9.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza9.id, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza10.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza10.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza10.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza10.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza10.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza10.id, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza11.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza11.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza11.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza11.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza11.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza11.id, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza12.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza12.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza12.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza12.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza12.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza12.id, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza13.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza13.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza13.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza13.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza13.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza13.id, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza14.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza14.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza14.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza14.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza14.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza14.id, pizzaType: 2, size: 40 }),

      // Пицца "Чоризо фреш"
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),

      // Остальные продукты
      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
      generateProductItem({ productId: 12 }),
      generateProductItem({ productId: 13 }),
      generateProductItem({ productId: 14 }),
      generateProductItem({ productId: 15 }),
      generateProductItem({ productId: 16 }),
      generateProductItem({ productId: 17 }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: token,
      },

      {
        userId: 2,
        totalAmount: 0,
        token: token,
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 2,
      ingridients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      },
    },
  });

  await prisma.story.createMany({
    data: [
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496",
      },
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640",
      },
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020",
      },
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958",
      },
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737",
      },
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284",
      },
    ],
  });

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE",
      },
    ],
  });
};

const down = async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingridient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Variation" RESTART IDENTITY CASCADE`;
};

const main = async () => {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
